const https = require('https');
const fs = require('fs');
const path = require('path');

async function run() {
  const data = JSON.stringify({
    "name": "TurovFy",
    "shortName": "TurovFy",
    "startUrl": "https://turovfy-app.onrender.com/",
    "display": "standalone",
    "themeColor": "#050507",
    "backgroundColor": "#050507",
    "manifestUrl": "https://turovfy-app.onrender.com/manifest.json",
    "domain": "turovfy-app.onrender.com",
    "packageId": "com.turovfy.app.twa",
    "appVersion": "1.0.0",
    "appVersionCode": 1,
    "icons": [
      { "src": "https://turovfy-app.onrender.com/assets/logo.png", "sizes": "512x512" }
    ],
    "signingKey": { "type": "new" }
  });

  const req = https.request({
    hostname: 'pwabuilder-android-cloudflare.pwa.workers.dev',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }, (res) => {
    const fileStream = fs.createWriteStream(path.join(__dirname, 'android-app.zip'));
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('APK Zip generated successfully!');
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

run();
