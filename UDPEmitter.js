var dgram = require('dgram');
var config = require('./config.json');


class UDPEmitter {
 
  constructor(params) {
      
      this.server = null;

      this.port = params.broadcast_port
      this.broadcast_addr = params.broadcast_addr;
      this.furuno_mode = params.furuno_mode;
      this.msg_counter = 0;

      this.server = dgram.createSocket("udp4");
      this.server.bind( () => {
        this.server.setBroadcast(true);
      });
    }
  
    broadcast(payload) {
  
      var output = Buffer.from(payload);
      if (this.furuno_mode)
      {
        // Furuno pre-amble requires a sequence counter in byte #2 that wraps
        if (this.msg_counter++ > 0xFF)
          this.msg_counter = 0;
    
        // prepend the magic Furuno 8-byte sequence. Other than the counter in byte-2 I have no idea
        // what the other bytes represent, but they seem static and not a function of AIS sentence :)
        output = Buffer.concat([Buffer.from([0x01, this.msg_counter, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00]), output]);
      }

      this.server.send(output, 0, output.length, this.port, this.broadcast_addr, () => {
          console.log(`[TX-${this.broadcast_addr}-${this.port}] ${payload.toString().trim()} ${this.furuno_mode?` [fs=${this.msg_counter}]`:''}`);
      });

    }
}
  
module.exports = UDPEmitter;