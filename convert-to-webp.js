const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Caminhos
const inputDir = './input';
const outputDir = './output';

// Apaga o diretório de saída se existir
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('🗑️  Diretório "output/" antigo removido.');
}

// Cria o novo diretório de saída
fs.mkdirSync(outputDir, { recursive: true });

// Lê os arquivos da pasta de entrada
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta de entrada:', err);
    return;
  }

  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputFileName = path.parse(file).name + '.webp';
    const outputPath = path.join(outputDir, outputFileName);

    sharp(inputPath)
      .webp({ quality: 80 }) // Você pode ajustar a qualidade
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Convertido: ${file} → ${outputFileName}`);
      })
      .catch(error => {
        console.error(`❌ Erro ao converter ${file}:`, error.message);
      });
  });
});


//  node convert-to-webp.js