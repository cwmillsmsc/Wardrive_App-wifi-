package com.wardrive;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import android.content.Context;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;

public class ScannerPlugin extends Plugin {
public static final String SCAN_STRING="Scan"; 
public static final String TURN_ON_STRING="TurnOn"; 
private WifiManager wifiManager;
      public static final String SUCCESS_PARAMETER="success"; 
      private static final String TAG = "WIFI SCANNER";
  	  private int numap=0;

      @Override 
      public PluginResult execute(String action, JSONArray data, String callbackId) { 
             //only perform the action if it is the one that should be invoked 
    	  Log.v(TAG,action);
      	 wifiManager=(WifiManager) this.cordova.getActivity().getSystemService(Context.WIFI_SERVICE);

    	  if (SCAN_STRING.equals(action)) { 
             	 // Get Scan

             	 ap[] set1 = new ap[100];
             	 numap=0;
             	 for(int i=0; i< 100; i++)
             		 try{
             		 set1[i]=new ap();
             		} catch (Exception e){
             			e.printStackTrace();
                	}
             	 set1=getwifi(set1);
             	 //end Get Scan
             	 // sort
             	 // Convert to Json  
              	JSONObject jAPType = new JSONObject();
              	for(int i=1; i<numap; i++){
              		JSONObject jObject = new JSONObject();
              		try {
              			jObject.put("SSID", set1[i].ssid);	
              			jObject.put("MAC", set1[i].mac);
              			jObject.put("SECURITY", set1[i].encrypt);
						jObject.put("FREQUENCY", set1[i].freq);
						jObject.put("SIGNAL", set1[i].signal);
						jAPType.accumulate("AP", jObject);
						set1[i].initem();
					} catch (JSONException e) {
						e.printStackTrace();
					}
              	}
             	Log.v(TAG,jAPType.toString());
              	
             	return new PluginResult(PluginResult.Status.OK, jAPType); 
             } 
    	  else if(TURN_ON_STRING.equals(action)	)
    	  {
    		  // Turn Wifi On
    		  Log.v(TAG, "TURN ON IF");
          	 if(!wifiManager.isWifiEnabled())
          	 {
          		 wifiManager.setWifiEnabled(true);
          		 Log.v(TAG,"!!!!!!!!!!!!!!!! WIFI ON NOW");
          		 return new PluginResult(PluginResult.Status.OK);
          	 }
          	 else
          		 return new PluginResult(PluginResult.Status.OK, "WIFI IS ON");
          	 //End Turn Wifi on
    	  }
    	  else {
            	 return new PluginResult(PluginResult.Status.INVALID_ACTION);
    	  }
      }
      public ap[] getwifi(ap[] set)
      {

      	wifiManager.startScan();
      	List<ScanResult> apq = wifiManager.getScanResults();
      	Collections.sort(apq, new Comparator<ScanResult>() {

			public int compare(ScanResult accessPoint1, ScanResult accessPoint2) {
				int sComp = accessPoint1.SSID.compareTo(accessPoint2.SSID);
					if(sComp !=0 ){
						return sComp;
					} else {
						if (accessPoint1.level<=accessPoint2.level)
							return 1;
						else if (accessPoint1.level>=accessPoint2.level)
							return -1;
						else 
							return 0;
			}
			}
		}); 
      	numap=apq.size();
        for(int i=1; i<numap; i++){
        	try {
        		//Log.v(TAG,apq.get(i).toString());
        		set[i].getfromWifi(apq.get(i));
        	} catch (Exception e){
        		e.printStackTrace();
        	}
      	}
        
      	return set;
      }

} 

