var UDPEmitter = require('./UDPEmitter');
var dAISyReader = require('./dAISyReader');
var DemoModeReader = require('./DemoModeReader');
var config = require('./config.json');


console.log("[Starting dAISyFuruno]");

var udpEmitters = [];

// create the UDP Emitters
for (var output_config of config.UDPEmitters)
{
    if (output_config.enabled)
        udpEmitters.push(new UDPEmitter(output_config));
}

// create our reader and wire up the message event
var reader = config.DemoMode ? new DemoModeReader() : new dAISyReader();

reader.on("message", function(msg)
{
    console.log(`[RX] ${msg.trim()}`);

    // when we receive AIS sentences, send to the UDPEmitters to echo to the network
    for (var udp of udpEmitters)
        udp.broadcast(msg);

});

reader.start();



