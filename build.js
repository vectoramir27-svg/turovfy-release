const { execSync } = require('child_process');

try {
  console.log("Installing generator package...");
  execSync('npm install @pwabuilder/android', { stdio: 'inherit' });
  
  console.log("Running generator...");
  const { generateApp } = require('@pwabuilder/android');
  
  (async () => {
    const options = {
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
    };

    const app = await generateApp(options);
    const fs = require('fs');
    const zipContent = await app.zip.generateAsync({ type: 'nodebuffer' });
    fs.writeFileSync('android-app.zip', zipContent);
    console.log("Done! android-app.zip created.");
  })();
} catch (e) {
  console.error("Build failed:", e);
  process.exit(1);
}
