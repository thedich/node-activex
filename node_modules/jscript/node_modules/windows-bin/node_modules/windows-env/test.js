var test = require('tape')

test('basic', function (t) {
  process.env.beep_boop = 'beep'
  var keys1 = Object.keys(process.env)

  t.is(process.env.BEEP_BOOP, 'beep', 'does not matter for getter')
  t.ok(keys1.indexOf('BEEP_BOOP') < 0, 'but for the keys')

  var env = require('./')
  var keys2 = Object.keys(env)

  t.is(env.BEEP_BOOP, 'beep', 'uppercased')
  t.ok(keys2.indexOf('BEEP_BOOP') >= 0, 'keys too')

  // Just to check, not a real test
  t.ok(true, 'profile: ' + env.USERPROFILE)
  t.ok(true, 'appdata: ' + env.LOCALAPPDATA)

  if (env.X64) {
    t.ok(true, 'x64')
    t.is(env.PROGRAMFILES_X86, 'C:\\Program Files (x86)', 'prog86 ok')
    t.is(env.PROGRAMFILES_X64, 'C:\\Program Files', 'prog64 ok')
  } else {
    t.is(env.PROGRAMFILES_X86, 'C:\\Program Files', 'prog86 ok')
    t.is(env.PROGRAMFILES_X64, undefined, 'no prog64')
  }

  t.is(process.env.PROGRAMFILES_X86, undefined, 'did not mutate process.env')
  t.end()
})
