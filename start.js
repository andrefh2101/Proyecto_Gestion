const { exec } = require("child_process");

// levantar servidor
require("./server");

// abrir navegador automáticamente
setTimeout(() => {
  exec('cmd /c start "" "http://localhost:3000"');
}, 1500);
