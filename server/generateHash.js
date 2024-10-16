const bcrypt = require('bcryptjs');

async function generateHash(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Generated hash:', hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash('pickels').then(() => {
  console.log('Hash generation complete');
  process.exit(0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
