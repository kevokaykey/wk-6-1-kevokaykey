const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Git hooks for automated testing...');

const hooksDir = path.join(__dirname, '..', '..', '.git', 'hooks');
const preCommitHook = path.join(hooksDir, 'pre-commit');

// Create hooks directory if it doesn't exist
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

// Create pre-commit hook
const hookContent = `#!/bin/sh
echo "🚀 Running pre-commit validation..."
npm run test:early

if [ $? -ne 0 ]; then
  echo "❌ Early detection tests failed. Please fix before committing."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
exit 0
`;

try {
  fs.writeFileSync(preCommitHook, hookContent);
  fs.chmodSync(preCommitHook, '755'); // Make executable
  console.log('✅ Pre-commit hook installed successfully!');
  console.log('📝 Hook will run: npm run test:early before each commit');
} catch (error) {
  console.log('❌ Failed to install git hook:', error.message);
  console.log('💡 You can manually run "npm run validate" before commits');
}
