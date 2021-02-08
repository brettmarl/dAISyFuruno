const { EventEmitter } = require('events');

// sample data of a tug boat moving across Rosario Strait. 
// in demo-mode look on your map in roughly this location to see it moving
// https://www.google.com/maps/@48.5911053,-122.7963341,12.43z 
var test_data = 
`!AIVDM,1,1,,B,15Mid9001Io>5IpKk?8Mbc>62@1w,0*2A
!AIVDM,1,1,,A,15Mid9001Jo>5B\`KkB0MV;?228Cg,0*37
!AIVDM,1,1,,B,15Mid9001Jo>5@RKkBpMWs?D2D3g,0*77
!AIVDM,1,1,,A,15Mid9001Lo>58pKkEruas:J20S2,0*69
!AIVDM,1,1,,B,15Mid9001Mo>560KkFreSc:f2@=j,0*7E
!AIVDM,1,1,,A,15Mid9001No>53lKkGsea@3224c8,0*13
!AIVDM,1,1,,B,15Mid9001Uo>4fvKkQEed02624c@,0*6D
!AIVDM,1,1,,A,15Mid9001To>4a>KkTM=eP102L3e,0*1C
!AIVDM,1,1,,B,15Mid9001To>4VjKkUQMas?D28IF,0*61
!AIVDM,1,1,,B,15Mid9001So>4RFKkWhecc>620Ru,0*1C
!AIVDM,1,1,,A,15Mid9001To>4OVKk\`luVs>J287v,0*01
!AIVDM,1,1,,B,15Mid9001To>4MbKkar=dP2f24cD,0*38
!AIVDM,1,1,,A,15Mid9001To>4KPKkbouah102HCL,0*65
!AIVDM,1,1,,B,35Mid90OiQo>4JbKkdi=vPCT20rh,0*69
!AIVDM,1,1,,A,15Mid9001Mo>5gVKl=0@j@fH2@7g,0*3E
!AIVDM,1,1,,B,15Mid9001Mo>5snKl?p0i@kD2<3K,0*75
!AIVDM,1,1,,A,15Mid9001Mo>608Kl@shg0gb2<3J,0*11
!AIVDM,1,1,,B,15Mid9001Mo>63hKlAk0fhj42D3K,0*7B
!AIVDM,1,1,,A,15Mid9001No>680KlBhhiPhH2<3L,0*46
!AIVDM,1,1,,B,15Mid9001No>6<HKlCm0ghhf20S1,0*6C
!AIVDM,1,1,,A,15Mid9001Mo>6@@KlDj0fPg22@Ci,0*42
!AIVDM,1,1,,B,15Mid9001Mo>6D>KlE\`PkhqD28IC,0*5D
!AIVDM,1,1,,A,15Mid9001Lo>6IpKlF\`Pt@sb28OO,0*06
!AIVDM,1,1,,B,15Mid9001Lo>6N:KlGMPr@l42@1\`,0*02
!AIVDM,1,1,,A,15Mid9001Mo>6S0KlHHhsPtH287g,0*29
!AIVDM,1,1,,B,15Mid9001Lo>6a:KlIGi3A0f2@=o,0*5D
!AIVDM,1,1,,A,15Mid9001Mo>6fnKlJ@i4hs22<3H,0*64
!AIVDM,1,1,,B,15Mid9001Mo>6k8KlK6hshmD24h4,0*4A
!AIVDM,1,1,,A,15Mid9001No>6pNKlL90rhsb24h4,0*4E
!AIVDM,1,1,,B,15Mid9001No>6u<KlLv@uht42<3B,0*76
!AIVDM,1,1,,A,15Mid9001No>72>KlMrPsPnH24h8,0*55
!AIVDM,1,1,,A,15Mid9001No>7GVKlQf0vPqb20SO,0*58
!AIVDM,1,1,,B,15Mid9001Oo>7L:KlRThtPp4281\`,0*44
!AIVDM,1,1,,A,15Mid9001Oo>7QRKlSPPw0tH20SA,0*5F
!AIVDM,1,1,,B,15Mid9001Oo>7W6KlTRhrhlf28=o,0*20
!AIVDM,1,1,,A,35Mid9001Oo>7d6KlUOPt@s225=3,0*02
!AIVDM,1,1,,B,15Mid9001Oo>7hvKlVE@w@qD2<3B,0*57
!AIVDM,1,1,,A,15Mid9001Oo>7n@KlWHhq0kb2L3C,0*7B
!AIVDM,1,1,,B,15Mid9001Oo>7r\`Kl\`@@pPt424h@,0*5B`;


class DemoModeReader extends EventEmitter {
 
    start() {

        console.log("[DemoMode - AIS data emitted every 5s]");
        const lines = test_data.split("\n");
        var line_index = 0;
        
        setInterval(()=>{

            this.emit('message', `${lines[line_index]}\r\n`);
            line_index++;

            if (line_index >= lines.length)
                line_index = 0;
            
        }, 5000);
    }

}
  
module.exports = DemoModeReader;