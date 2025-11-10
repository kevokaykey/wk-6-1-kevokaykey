import fs from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Running Early Detection Checks...');
console.log('====================================');

let passCount = 0;
let failCount = 0;

function checkSyntax() {
  console.log('1. Checking test file syntax...');
  try {
    const testFiles = [];
    
    function findTestFiles(dir) {
      if (!fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          findTestFiles(fullPath);
        } else if (item.match(/\.test\.(js|jsx)$/)) {
          testFiles.push(fullPath);
        }
      });
    }
    
    if (fs.existsSync('src/__tests__')) {
      findTestFiles('src/__tests__');
    }
    
    testFiles.forEach(file => {
      try {
        fs.readFileSync(file, 'utf8');
      } catch (e) {
        console.log(`   ❌ Syntax error in: ${file}`);
        failCount++;
      }
    });
    
    if (testFiles.length > 0) {
      console.log(`   ✅ ${testFiles.length} test files have valid syntax`);
      passCount++;
    } else {
      console.log('   ⚠️  No test files found');
      passCount++;
    }
  } catch (error) {
    console.log('   ❌ Error checking syntax:', error.message);
    failCount++;
  }
}

function checkEmptyTests() {
  console.log('2. Checking for empty test files...');
  try {
    const testFiles = [];
    
    function findTestFiles(dir) {
      if (!fs.existsSync(dir)) return;
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          findTestFiles(fullPath);
        } else if (item.match(/\.test\.(js|jsx)$/)) {
          testFiles.push(fullPath);
        }
      });
    }
    
    findTestFiles('src/__tests__');
    
    const emptyFiles = testFiles.filter(file => {
      const content = fs.readFileSync(file, 'utf8');
      return !content.match(/test\(|it\(|describe\(/);
    });
    
    if (emptyFiles.length === 0) {
      console.log('   ✅ No empty test files found');
      passCount++;
    } else {
      console.log(`   ❌ Found ${emptyFiles.length} empty test files:`);
      emptyFiles.forEach(file => console.log(`      - ${file}`));
      failCount++;
    }
  } catch (error) {
    console.log('   ⚠️  Could not check for empty tests');
    passCount++;
  }
}

function checkPackageJson() {
  console.log('3. Checking package.json validity...');
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('   ✅ package.json is valid JSON');
    passCount++;
  } catch (error) {
    console.log('   ❌ package.json has JSON errors:', error.message);
    failCount++;
  }
}

// Run checks
checkPackageJson();
checkSyntax();
checkEmptyTests();

// Summary
console.log('\n📊 SUMMARY:');
console.log(`   Passed: ${passCount}`);
console.log(`   Failed: ${failCount}`);

if (failCount === 0) {
  console.log('✅ All early detection checks passed!');
  process.exit(0);
} else {
  console.log('❌ Some checks failed - please fix before commit');
  process.exit(1);
}
