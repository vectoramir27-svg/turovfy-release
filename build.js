const pwabuilder = require('@pwabuilder/cli');
const path = require('path');
const fs = require('fs');

async function run() {
  const platform = "android";
  const manifestUrl = "https://turovfy-app.onrender.com/manifest.json";
  const outputDir = path.join(__dirname, 'android-output');

  console.log("Starting PWA to Android conversion...");
  
  // Создаем папку под проект
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Запуск генерации Android-пакета через официальную библиотеку
  try {
    await pwabuilder.generate(manifestUrl, platform, outputDir);
    console.log("Android project generated successfully!");
  } catch (err) {
    console.error("Generation error:", err);
    process.exit(1);
  }
}

run();
