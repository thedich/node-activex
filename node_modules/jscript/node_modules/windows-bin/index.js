'use strict';

var env = require('windows-env')
  , path = require('path')
  , which = require('which')
  , existent = require('existent')
  , debug = require('debug')('windows-bin')
  , cache_ = Object.create(null)

// Find an executable. If we're on 64-bit Windows
// prefer the native "%SystemRoot%\Sysnative\*.exe",
// because if Node.js is 32-bit we would be redirected to
// "%SystemRoot%\SysWow64\*.exe".
module.exports = function winbin (name, opts, cb) {
  if (typeof opts === 'function') cb = opts, opts = {}
  else if (!opts) opts = {}

  if (path.extname(name) !== '.exe') name+= '.exe'

  var preferNative = opts.native !== false && process.arch !== 'x64'
    , cache = opts.cache !== false ? cache_ : Object.create(null)
    , id = preferNative ? '64;' + name : '32;' + name
    , search = cache[id] || (cache[id] = Object.create(null))

  // Search was completed earlier.
  if (search.result != null) return process.nextTick(emit.bind(null, cb))

  // Search has already started
  if (search.waiting != null) return search.waiting.push(cb)
  else search.waiting = [cb]

  // Usually "C:\Windows". Prefer SYSTEMROOT over WINDIR,
  // because SYSTEMROOT is a read-only built-in variable.
  var root = env.SYSTEMROOT
  var def  = path.join(root, 'system32', name)

  if (env.X64 && preferNative) {
    find(path.join(root, 'Sysnative', name), def)
  } else {
    find(def)
  }

  function find (bin, alt) {
    existent(bin, function (err) {
      if (!err) done(null, bin)
      else if (alt) find(alt)
      else which(path.basename(name, '.exe'), done)
    })
  }

  function done (err, bin) {
    debug(err || ('Found: ' + bin))
    search.result = [err, bin]
    search.waiting.forEach(emit)
    search.waiting = null
  }

  function emit (cb) {
    cb.apply(null, search.result)
  }
}

// For test purposes
module.exports.reset = function () {
  cache_ = Object.create(null)
}
