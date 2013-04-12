package com.floydpink.android.travisci;

import android.os.Bundle;

import org.apache.cordova.*;

import com.google.analytics.tracking.android.EasyTracker;
import com.strumsoft.websocket.phonegap.WebSocketFactory;

public class MainActivity extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/xp/index.html");

		this.appView.addJavascriptInterface(new WebSocketFactory(this),
				"WebSocketFactory");
	}

	@Override
	public void onStart() {
		super.onStart();
		EasyTracker.getInstance().activityStart(this);
	}

	@Override
	public void onStop() {
		super.onStop();
		EasyTracker.getInstance().activityStop(this);
	}
}
