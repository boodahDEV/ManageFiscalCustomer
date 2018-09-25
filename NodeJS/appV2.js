var http = require("http");

var manejador = function(solicitud, respuesta){
    console.log("Hola mundo!...");
    respuesta.end(); //cierra el servidor 
}
var servidor = http.createServer(manejador);//servidor http sencillo    createserve retorna un objeto que funge como servidor
servidor.listen(5000);