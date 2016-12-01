Node-ActiveX
==================

Usage
---------------------
:star2: Good news, everyone! The usage of this sfuff is simple as a penny.

```js
var nodex = require('./node-activex.js');  // import
var firstDevice = "Host",                  // name for first device
    syncDevice  = "SyncServer";            // name for second device

nodex.setConsole(true);                                                    // default is true;
nodex.registerObject(   firstDevice, "Host.DeviceManager");                // ( Name, Guid )
nodex.registerCallBack( firstDevice, "OnMoney_Received( Value )");         // ( Name, Function Notation Event )
nodex.registerCallBack( firstDevice, "OnMoney_Received_FullSum( Value )"); // ( Name, Function Notation Event )
nodex.registerCallBack( firstDevice, "OnInternalSignal( SigNum, Data )");  // ( Name, Function Notation Event )
nodex.registerCallBack( firstDevice, "OnMoney_Dispensed()");               // ( Name, Function Notation Event )

nodex.registerObject(   syncDevice,  "Server.Application");                // ( Name, Guid )
nodex.registerCallBack( syncDevice,  "OnClose()");                         // ( Name, Function Notation Event )

// need, if you listen callbacks
nodex.endCallBackRegistration( function()
{ console.log( "CALLBACKS_IS_READY"); } );

// callbacks EventData & ReturnData
nodex.onMessage( function(data)
{ console.log( "---ANSWER-NODE-X---: " + JSON.stringify(data) ) };);
```

Sending Commands
---------------------

```js
var data = {};
data.deviceType = firstDevice;                      // name device
data.command    = "MethodInFirstDevice"             // function name
data.execdata   = { one:1, two:2, three:3 };        // up to 8 (max) exec values
nodex.send( data );                                 // exec command & data
```

Notes
---------------------

 - This stuff using two [cscript.exe](https://en.wikipedia.org/wiki/Windows_Script_Host), one for commands & second for callbacks.
 - No need [Win32ole](https://www.npmjs.com/package/win32ole) npm package to use [ActiveX](https://en.wikipedia.org/wiki/ActiveX).
 - Enjoy, pal.

License
----

MIT