// Load environment variables from .env.local before starting Sanity
require('dotenv').config({ path: '.env.local' })

// Start Sanity dev server
require('child_process').spawn('sanity', ['dev'], {
  stdio: 'inherit',
  shell: true,
  env: process.env
})
