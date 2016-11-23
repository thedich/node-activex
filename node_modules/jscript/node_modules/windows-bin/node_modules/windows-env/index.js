'use strict';

// Clone env, dont mutate
var env = module.exports = {}

// Uppercase
Object.keys(process.env).forEach(function(name){
  env[name.toUpperCase()] = process.env[name]
})

env.PROGRAMFILES_X86 = env['PROGRAMFILES(X86)'] || env['PROGRAMFILES']
env.PROGRAMFILES_X64 = env.PROGRAMW6432 // "C:\Program Files" on x64

if (!env.USERPROFILE)
  env.USERPROFILE = env.HOMEDRIVE + env.HOMEPATH

// eg, "%USERPROFILE%\AppData\Local" or
//     "%USERPROFILE%\Local Settings\Application Data" (XP)
if (!env.LOCALAPPDATA)
  env.LOCALAPPDATA = env.USERPROFILE + '\\Local Settings\\Application Data'

env.X64 =
  process.arch == 'x64' ||
  'PROGRAMFILES(X86)' in env ||
  'PROCESSOR_ARCHITEW6432' in env // in 32-bit process
