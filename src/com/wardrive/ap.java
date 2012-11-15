package com.wardrive;

import android.net.wifi.ScanResult;
import android.util.Log;

public class ap extends ScannerPlugin{
	public String TAG = "AP CLASS";
	
	public  String ssid;
	public  String mac;
	public  String encrypt;
	public  int freq;
	public  int signal;

	public ap(){
		ssid = "null";
		mac =  "null";
		encrypt = "null";
		freq = -999;
		signal = -999;

	}
	

	public void getfromWifi(ScanResult scanResult){
	
		ssid=scanResult.SSID;
		mac=scanResult.BSSID;
		switch (scanResult.frequency){
		case 2412: freq = 1; break;
		case 2417: freq = 2; break;
		case 2422: freq = 3; break;
		case 2427: freq = 4; break;
		case 2432: freq = 5; break;
		case 2437: freq = 6; break;
		case 2442: freq = 7; break;
		case 2447: freq = 8; break;
		case 2452: freq = 9; break;
		case 2457: freq = 10; break;
		case 2462: freq = 11; break;
		case 2467: freq = 12; break;
		case 2472: freq = 13; break;
		case 2484: freq = 10; break;
		default: freq = -1; break;
		}

		signal=scanResult.level;

		if(scanResult.capabilities.contains("WPA")) {
			encrypt = scanResult.capabilities;
		} else if (scanResult.capabilities.contains("WEP")) {
			encrypt = scanResult.capabilities;
		} else {
			encrypt = "[OPEN]";
		}
	}
	public  void initem()
	{
		ssid = "null";
		mac =  "null";
		encrypt = "null";
		freq = -999;
		signal = -999;
	}
}