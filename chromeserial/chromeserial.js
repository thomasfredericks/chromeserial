
class Serial {
	constructor(path,baud) { // CONNECT TO A SERIAL PORT

            this.serialConnectionId;
            this.onReceiveCallback = null;

			
			let options = {};

			options.bitrate = baud;
			console.log("Serial> Trying to connect to: "+path+" @ "+baud);
			//chrome.serial.connect(path, options, this.connected.bind(this));
			chrome.serial.connect(path, options, (connectionInfo) => {
				console.log("Serial> Connected sucessfully");
			    //console.log(connectionInfo);
				this.serialConnectionId = connectionInfo.connectionId;
				// ADD EVENT NOTIFIER
	            chrome.serial.onReceive.addListener( (info) => {
	            		let dataView = new DataView(info.data);
	            		

	            		for ( let i =0; i < info.data.byteLength ; i++ ) {
	            			let byte = dataView.getUint8(i);
							if ( this.onReceiveCallback != null ) this.onReceiveCallback(byte);
						}

	            		
	            	}
	            );
			});

			   // CLOSE SERIAL WHEN WINDOW IS CLOSED OR RELOADED
			   window.addEventListener("beforeunload", () => { 
			   		console.log("Serial> Diconnecting");
					alert(this.serialConnectionId);
					chrome.serial.disconnect(this.serialConnectionId, function(e) {} );
			   } , false);
	}

	onReceive(c) {
		this.onReceiveCallback = c;
	}


	static log() {
    	this.portList = new Array();
		chrome.serial.getDevices(function(ports) {
			console.log("Serial> Available paths:");
		    for (let port of ports) {
		            console.log(port.path);      
		    }
		});
  	}
}