const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

async function run() {
  console.log("Preparing generation request...");
  
  const postData = JSON.stringify({
    name: "TurovFy",
    shortName: "TurovFy",
    startUrl: "https://turovfy-app.onrender.com/",
    display: "standalone",
    themeColor: "#050507",
    backgroundColor: "#050507",
    manifestUrl: "https://turovfy-app.onrender.com/manifest.json",
    domain: "turovfy-app.onrender.com",
    packageId: "com.turovfy.app.twa",
    appVersion: "1.0.0",
    appVersionCode: 1,
    icons: [{ src: "https://turovfy-app.onrender.com/assets/logo.png", sizes: "512x512" }],
    signingKey: { type: "new" }
  });

  const req = https.request({
    hostname: 'pwabuilder-android-cloudflare.pwa.workers.dev',
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Mozilla/5.0'
    }
  }, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Cloudflare worker failed with status code: ${res.statusCode}`);
      process.exit(1);
    }
    
    const fileStream = fs.createWriteStream('android-app.zip');
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log("Success! android-app.zip generated.");
    });
  });

  req.on('error', (e) => {
    console.error('Request error:', e);
    process.exit(1);
  });

  req.write(postData);
  req.end();
}

run();
