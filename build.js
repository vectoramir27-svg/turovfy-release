const { generateApp } = require('@pwabuilder/android');
const path = require('path');
const fs = require('fs');

async function run() {
  const options = {
    name: "TurovFy",
    shortName: "TurovFy",
    description: "Unified Streaming Engine",
    startUrl: "https://turovfy-app.onrender.com/",
    display: "standalone",
    themeColor: "#050507",
    backgroundColor: "#050507",
    manifestUrl: "https://turovfy-app.onrender.com/manifest.json",
    domain: "turovfy-app.onrender.com",
    packageId: "com.turovfy.app.twa",
    appVersion: "1.0.0",
    appVersionCode: 1,
    icons: [
      { src: "https://turovfy-app.onrender.com/assets/logo.png", sizes: "512x512" }
    ],
    signingKey: {
      type: "new"
    }
  };

  const generatedApp = await generateApp(options);
  const outputPath = path.join(__dirname, 'android-app.zip');
  await generatedApp.zip.generateAsync({ type: 'nodebuffer' }).then(content => {
    fs.writeFileSync(outputPath, content);
  });
  console.log("APK Zip generated successfully!");
}

run().catch(console.error);
