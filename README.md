# chromeserial
Front end for Chromium's javascript serial implementation

Include in your ```index.html```:
```
    <script src="chromeserial/chromeserial.js" type="text/javascript"></script>
```
## Usage

Log available ports in the console:
```Serial.logDevices();```

Open a connection: 
```let serial = new Serial("COM4",57600);```

Set the function to receive incomming data (in this case, the function is called serialReceive and is defined below): 
```serial.onReceive( serialReceive );```

Example function to receive incomming data:
```
function serialReceive(byte) {

    let char = String.fromCharCode( byte );
    console.log("Received: "+byte+" (as number) "+char+" (as character)");

}
```