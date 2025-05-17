const fs = require('fs');
const path = require('path');

const requiredFiles = [
  '.env',
  'babel.config.js',
  'src/types/env.d.ts',
  'tsconfig.json'
];

console.log('🔍 Vérification de la configuration @env...\n');

// Vérifier les fichiers
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Fichier manquant : ${file}`);
  } else {
    console.log(`✅ ${file}`);
  }
}

// Vérifier le contenu de env.d.ts
const envPath = path.join('src', 'types', 'env.d.ts');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  if (!content.includes('declare module \'@env\'')) {
    console.error('❌ env.d.ts ne déclare pas correctement le module @env.');
  } else {
    console.log('✅ env.d.ts déclare @env correctement');
  }
}

// Vérifier babel.config.js
const babelPath = 'babel.config.js';
if (fs.existsSync(babelPath)) {
  const content = fs.readFileSync(babelPath, 'utf-8');
  if (!content.includes('module:react-native-dotenv')) {
    console.error('❌ Babel n\'est pas configuré avec react-native-dotenv.');
  } else {
    console.log('✅ Babel est bien configuré avec react-native-dotenv');
  }
}

// Vérifier tsconfig.json
const tsconfigPath = 'tsconfig.json';
if (fs.existsSync(tsconfigPath)) {
  const content = fs.readFileSync(tsconfigPath, 'utf-8');
  if (!content.includes('env.d.ts')) {
    console.error('❌ env.d.ts n\'est pas inclus dans tsconfig.json');
  } else {
    console.log('✅ tsconfig.json inclut env.d.ts');
  }
}

console.log('\n✅ Vérification terminée.');
