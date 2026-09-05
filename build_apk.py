import os
import urllib.request
import zipfile
import subprocess

print("--- Начинаем сборку APK для TurovFy ---")

# 1. Создаем структуру Android-проекта для TWA
os.makedirs("android_project/app/src/main/assets", exist_ok=True)
os.makedirs("android_project/app/src/main/java/com/turovfy/app", exist_ok=True)
os.makedirs("android_project/app/src/main/res/values", exist_ok=True)
os.makedirs("android_project/app/src/main/res/mipmap-hdpi", exist_ok=True)

# 2. AndroidManifest.xml
manifest_content = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.turovfy.app">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="TurovFy"
        android:roundIcon="@mipmap/ic_launcher"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
"""

with open("android_project/app/src/main/AndroidManifest.xml", "w", encoding="utf-8") as f:
    f.write(manifest_content)

# 3. MainActivity.java (открывает сайт в WebView)
activity_content = """package com.turovfy.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WebView webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("https://turovfy-app.onrender.com/");
        setContentView(webView);
    }
}
"""

with open("android_project/app/src/main/java/com/turovfy/app/MainActivity.java", "w", encoding="utf-8") as f:
    f.write(activity_content)

print("Структура проекта успешно создана!")
