var jscript=require("jscript"),callbacks=jscript(__dirname+"/callbacks.js",{json:!0});callbacks.write("START_CALLBACKS"),callbacks.on("data",function(a){process.send(a)});