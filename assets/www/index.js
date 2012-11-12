$(function(){
    wifi.startScan();
    console.log(blah);
    var myScan = new ScanResult();
    var ssid = myScan.ssid;
    var bssid = myScan.bssid;
    var freq = myScan.frequency;
    var lvl = myScan.level;
});

document.addEventListener("deviceready", onDeviceReady, false);

var watchID = null;
function onDeviceReady() {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' +
                        '<hr />'      + element.innerHTML;
}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}