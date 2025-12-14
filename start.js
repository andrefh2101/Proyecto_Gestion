const { exec } = require("child_process");

// levantar el servidor
require("./server");

// abrir navegador automáticamente
setTimeout(() => {
  exec("start http://localhost:3000");
}, 1500);
