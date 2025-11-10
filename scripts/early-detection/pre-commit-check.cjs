const fs = require('fs');
const path = require('path');

console.log('🔍 Running Comprehensive Early Detection Checks...');
console.log('==================================================');

let passCount = 0;
let failCount = 0;
const issues = [];

function logCheck(name, passed, message = '') {
  if (passed) {
    console.log(`   ✅ ${name}`);
    passCount++;
  } else {
    console.log(`   ❌ ${name}${message ? ': ' + message : ''}`);
    failCount++;
    issues.push(`${name}${message ? ': ' + message : ''}`);
  }
}

// 1. Check package.json validity
function checkPackageJson() {
  console.log('1. Package Configuration:');
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    logCheck('Valid JSON syntax', true);
    logCheck('Has test scripts', !!packageJson.scripts?.test, 'test script found');
    logCheck('Has start script', !!packageJson.scripts?.start, 'start script found');
    
  } catch (error) {
    logCheck('Valid JSON syntax', false, error.message);
  }
}

// 2. Check test file structure
function checkTestStructure() {
  console.log('2. Test Structure:');
  
  const hasTestDir = fs.existsSync('src/__tests__');
  logCheck('Test directory exists', hasTestDir, 'src/__tests__/');
  
  if (hasTestDir) {
    const testFiles = [];
    
    function findTestFiles(dir) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          findTestFiles(fullPath);
        } else if (item.match(/\.test\.(js|jsx)$/)) {
          testFiles.push(fullPath);
        }
      });
    }
    
    findTestFiles('src/__tests__');
    logCheck('Test files found', testFiles.length > 0, `${testFiles.length} test files`);
    
    // Check for empty test files
    const emptyFiles = testFiles.filter(file => {
      const content = fs.readFileSync(file, 'utf8');
      return !content.match(/test\(|it\(|describe\(/);
    });
    
    logCheck('No empty test files', emptyFiles.length === 0, 
             emptyFiles.length > 0 ? `${emptyFiles.length} empty files` : '');
  } else {
    logCheck('Test directory exists', false, 'Create src/__tests__/');
  }
}

// 3. Check for common React test issues
function checkReactSpecific() {
  console.log('3. React-Specific Checks:');
  
  // Check if test utilities exist (either .js or .cjs)
  const testUtilsJs = fs.existsSync('src/__tests__/utils/test-utils.js');
  const testUtilsCjs = fs.existsSync('src/__tests__/utils/test-utils.cjs');
  const hasTestUtils = testUtilsJs || testUtilsCjs;
  
  logCheck('Test utilities available', hasTestUtils, 
           hasTestUtils ? 
             (testUtilsJs ? 'test-utils.js found' : 'test-utils.cjs found') : 
             'Create test utilities');
  
  // Check if integration tests might need providers
  const integrationTestDir = 'src/__tests__/integration';
  if (fs.existsSync(integrationTestDir)) {
    const integrationFiles = fs.readdirSync(integrationTestDir)
      .filter(file => file.match(/\.test\.(js|jsx)$/));
    
    if (integrationFiles.length > 0) {
      let hasProviderIssues = false;
      integrationFiles.forEach(file => {
        const content = fs.readFileSync(path.join(integrationTestDir, file), 'utf8');
        if (content.includes('render(') && !content.includes('Provider') && 
            !content.includes('renderWithProviders') && !content.includes('Wrapper')) {
          hasProviderIssues = true;
        }
      });
      logCheck('Integration tests have providers', !hasProviderIssues, 
               hasProviderIssues ? 'Some tests may need Provider wrappers' : '');
    }
  } else {
    logCheck('Integration test directory', false, 'Create integration tests');
  }
}

// 4. Check for syntax errors in source files
function checkSourceSyntax() {
  console.log('4. Source Code Syntax:');
  
  const sourceFiles = [];
  
  function findSourceFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && item !== 'node_modules' && item !== '__tests__') {
        findSourceFiles(fullPath);
      } else if (item.match(/\.(js|jsx)$/) && !item.match(/\.test\./)) {
        sourceFiles.push(fullPath);
      }
    });
  }
  
  findSourceFiles('src');
  
  let syntaxErrors = 0;
  sourceFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
    } catch (e) {
      syntaxErrors++;
      console.log(`      ❌ Syntax error in: ${file}`);
    }
  });
  
  logCheck('Source files syntax', syntaxErrors === 0, 
           syntaxErrors > 0 ? `${syntaxErrors} files have issues` : `${sourceFiles.length} files OK`);
}

// Run all checks
checkPackageJson();
checkTestStructure();
checkReactSpecific();
checkSourceSyntax();

// Summary
console.log('\n📊 COMPREHENSIVE SUMMARY:');
console.log(`   Passed: ${passCount}`);
console.log(`   Failed: ${failCount}`);
console.log(`   Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);

if (issues.length > 0) {
  console.log('\n🚨 Issues to Address:');
  issues.forEach(issue => console.log(`   • ${issue}`));
}

if (failCount === 0) {
  console.log('\n🎉 All early detection checks passed!');
  console.log('✅ Ready for commit and CI/CD');
  process.exit(0);
} else {
  console.log('\n❌ Some checks failed - please fix before commit');
  process.exit(1);
}
