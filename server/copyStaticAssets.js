const shell = require('shelljs');

// Test Frontend
shell.rm('-rf', 'dist/public');
shell.cp('-R', 'src/public', 'dist/public/');

// Config
shell.rm('-rf', 'dist/config');
shell.cp('-R', 'src/config', 'dist/config');
