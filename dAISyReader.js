var config = require('./config.json');
var SerialPort = require('serialport');
var ReadLine =  require('readline');
const { EventEmitter } = require('events');

/*
 * Reads AIS sentences from dAISy serial interface and fires off a 'message' event with the line 
 */
class dAISyReader extends EventEmitter {
 
  constructor(params) {
      
      super();
      this.params = params || config.dAISyInput;
    }
  
    start() {

        var port = new SerialPort(  this.params.device, {
                                        baudRate: this.params.baudRate, 
                                        dataBits: this.params.dataBits, 
                                        parity: this.params.parity, 
                                        stopBits: this.params.stopBits 
                                        });
        
        var lineReader = ReadLine.createInterface({input: port});

        port.on("error", function (error) {
            console.log(`Unable to connect to dAISy on ${config.dAISyInput.device}`);
        });

        port.on("open", function (error) {
            console.log(`[Connected to dAISy on ${config.dAISyInput.device}]`);
        });

        lineReader.on('line', (line) => {
            
            // when we receive a line from dAISy we test to make sure it smells like an AIS sentence and pass it on 
            // note we don't do any validatation the messages - we just echo what comes off the serial port of dAISy 
            if (!line.startsWith("!AIVDM"))
                return;

            // ensure lines end in linefeed
            if (!line.endsWith("\n"))
                line = line + "\r\n";

            this.emit('message', line);
        });

    }

}
  
module.exports = dAISyReader;