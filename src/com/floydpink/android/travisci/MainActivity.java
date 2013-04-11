package com.floydpink.android.travisci;

import android.os.Bundle;

import org.apache.cordova.*;

import com.google.analytics.tracking.android.EasyTracker;

public class MainActivity extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/xp/index.html");
    }
	@Override
	public void onStart()
	{
		super.onStart();
		EasyTracker.getInstance().activityStart(this);
	}

	@Override
	public void onStop()
	{
		super.onStop();
		EasyTracker.getInstance().activityStop(this);
	}
}
