const { exec } = require('child_process');

console.log('🚀 Running Quick Test Suite...\n');

// Run tests sequentially
exec('npx react-scripts test src/__tests__/early-validation.test.js --watchAll=false', (error, stdout, stderr) => {
  console.log('Early Validation Tests:');
  console.log(stdout);
  if (error) {
    console.error('❌ Early tests failed');
    return;
  }
  
  console.log('✅ Early tests passed\n');
  
  exec('npx react-scripts test src/__tests__/core-functionality.test.js --watchAll=false', (error, stdout, stderr) => {
    console.log('Core Functionality Tests:');
    console.log(stdout);
    if (error) {
      console.error('❌ Core tests failed');
      return;
    }
    
    console.log('✅ All unit tests passed!');
    console.log('\n📋 Next: Run E2E tests with: npx cypress run --spec cypress/e2e/early-stage.cy.js');
  });
});
