//Plugin JS
var WifiPlugin = {
		callNativeFunction: function (success, fail, native_action, resultType) {
		return cordova.exec( success, fail, "com.example.wifigeolocator", native_action, [resultType]);
		}
	}; 
	APobj = new Object();
	APobj.ssid = "NULL";
	APobj.mac="NULL";
	APobj.security="NULL";
	APobj.frequency=-999;
	APobj.signal=-999;
	APobj.lat=0;
	APobj.lon=0;



	function startButtonPressed(scanType){
		//if(latitude!=-999 && longitude!=-999){
			inter=setInterval(function(){startScanning(scanType)}, 3000);
			//startScanning();
			stat.innerHTML="Scanning...";
		//}else{
		//	alert("You need to turn on your GPS");
		//}
	}
	function stopButtonPressed(){
		clearInterval(inter);
		stat.innerHTML="Idle"; 
	}
	function turnOnWifi(){
		WifiPlugin.callNativeFunction(wifiNativePluginSuccessHandler, nativePluginErrorHandler, "TurnOn", null);
	}
	function startScanning(scanType) {
		res.innerHTML=" ";
		WifiPlugin.callNativeFunction(scanType, nativePluginErrorHandler, "Scan", null);
	}

	function captureNativePluginSuccessHandler(result) {
		// This is for debugging only. This code will change to upload or save instead of display
		var key, i=0, str;
		var arr = [];
		for(key in result.AP){
			var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
			};

			arr.push(obj);
		}

		str="";
		for(i=0; i<arr.length; i++) {
			markerData[i]=arr[i];
			str+=arr[i].ssid + " " + arr[i].mac+arr[i].security + " " +arr[i].frequency + " " +arr[i].signal + " " +arr[i].lat+" "+arr[i].lon+"</br>";
		}
		res.innerHTML=str;	  
	}
	function analyzeNativePluginSuccessHandler(result){
		var key, i=0, str="";//"<div id=\"analyzeResultsDiv\" data-role=\"collapsible-set\" data-inset=\"false\" data-theme=\"b\" data-content-theme=\"d\">";
		var arr = [];
		var previous="";
		//$('#analyzeResults').listview();
		for(key in result.AP){
			var obj = {
			ssid: result.AP[key].SSID,
			mac: result.AP[key].MAC,
			security: result.AP[key].SECURITY,
			frequency: result.AP[key].FREQUENCY,
			signal: result.AP[key].SIGNAL,
			lat: latitude,
			lon: longitude,
			};

			arr.push(obj);
		}

		for(i=0; i<arr.length; i++) {
			if(previous!=arr[i].ssid) {
				if(i!=0)
					str+="</div>";
				str+="<div  data-role=\"collapsible\" data-inset=\"true\"><h3>"+arr[i].ssid+"</h3>";
				if(arr[i].ssid!=arr[i+1].ssid)
					str+="SSID: "+arr[i].ssid+" MAC: "+ arr[i].mac+" SIGNAL: "+arr[i].signal;
					previous=arr[i].ssid;
				
					
			}else{
				//"<button> SSID: "+arr[i].ssid+" MAC: "+ arr[i].mac+" SIGNAL: "+arr[i].signal;
				str+="<ul class =\"aps\" data-role=\"listview\" data-inset=\"true\"><h3>"+arr[i].ssid+" "+ arr[i].mac+" "+arr[i].signal+"</h3>This area displays more info</ul>";
				previous=arr[i].ssid;
			
			}
//			str+="<tr><td>"+ arr[i].ssid + "</td><td>"+ arr[i].mac+"</td><td>"+arr[i].signal+"</td></tr>";
		}
		//str+="</div>";
//		str='{"AP":[{"FREQUENCY":9,"SECURITY":"[WPA2-PSK-CCMP]","MAC":"00:26:f2:99:ea:e0","SSID":"ACM","SIGNAL":-45},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a9:a3","SSID":"CMU Visitor","SIGNAL":-90},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:99:03","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:23:73","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:19:13","SSID":"CMU Visitor","SIGNAL":-89},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:90:22:23","SSID":"CMU Visitor","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:90:86:03","SSID":"CMU Visitor","SIGNAL":-86},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a6:a3","SSID":"CMU Visitor","SIGNAL":-84},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:37:56:43","SSID":"CMU Visitor","SIGNAL":-83},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:94:67:53","SSID":"CMU Visitor","SIGNAL":-81},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:91:9e:13","SSID":"CMU Visitor","SIGNAL":-81},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:91:96:33","SSID":"CMU Visitor","SIGNAL":-71},{"FREQUENCY":6,"SECURITY":"[OPEN]","MAC":"00:25:84:93:a7:83","SSID":"CMU Visitor","SIGNAL":-60},{"FREQUENCY":1,"SECURITY":"[OPEN]","MAC":"00:25:84:90:a8:b3","SSID":"CMU Visitor","SIGNAL":-56},{"FREQUENCY":11,"SECURITY":"[OPEN]","MAC":"00:25:84:90:a4:b3","SSID":"CMU Visitor","SIGNAL":-56},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:23:71","SSID":"CMU WLAN","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:19:11","SSID":"CMU WLAN","SIGNAL":-89},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:99:01","SSID":"CMU WLAN","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:22:21","SSID":"CMU WLAN","SIGNAL":-88},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:86:01","SSID":"CMU WLAN","SIGNAL":-86},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:37:56:41","SSID":"CMU WLAN","SIGNAL":-84},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:93:a6:a1","SSID":"CMU WLAN","SIGNAL":-84},{"FREQUENCY":11,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:94:67:51","SSID":"CMU WLAN","SIGNAL":-81},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:91:9e:11","SSID":"CMU WLAN","SIGNAL":-81},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:91:96:31","SSID":"CMU WLAN","SIGNAL":-71},{"FREQUENCY":6,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:93:a7:81","SSID":"CMU WLAN","SIGNAL":-60},{"FREQUENCY":1,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:a8:b1","SSID":"CMU WLAN","SIGNAL":-56},{"FREQUENCY":11,"SECURITY":"[WPA-EAP-CCMP][WPA2-EAP-CCMP]","MAC":"00:25:84:90:a4:b1","SSID":"CMU WLAN","SIGNAL":-45}]})';
	//	analyzeResults.innerHTML=str;
		$(".aps").trigger("create");
		$('#analyzeResults').append(str);
		$("#analyzeResults").trigger("create");

		//$(".aps").listview("refresh");

		//$('#analyzeResults').trigger( 'updatelayout' );
	}
	function nativePluginErrorHandler(result) {
		alert("Error "+result);
	}
	function wifiNativePluginSuccessHandler(result){
		//alert("Wifi On: "+result);	
	}
