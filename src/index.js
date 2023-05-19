import View from "./view.js";
import Controller from "./controller.js";
import Service from "./service.js";

//O worker ele é lido dentro do index.html
//O worker module só funciona no chrome por enquanto
//ou seja o worker funciona, mas o import/export não vai funcionar
const worker = new Worker('./src/worker.js', {
    type: "module"
});

worker.postMessage('hey dude!');
/**
 * Dessa forma o código não precisa do navegador
 * deixando o projeto desaclopado
 */
Controller.init({
    view: new View(),
    worker
});