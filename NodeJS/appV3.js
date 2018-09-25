//como leer un archivo en NodeJS

var http = require("http");
var fs = require('fs');

//leer un archivo de forma sincrona
//var html = fs.readFileSync("./HTML/indexV3.html"); // modificar a html el html para hacerlo correr sincronamente (obvio saco la coneccion del servidor fuera)

//leer un archivo de forma asincrona


http.createServer((req, res)=>{
    fs.readFile("./HTML/indexV3.html",(err,html)=>{
        res.write(html);
        res.end();
    });
}).listen(5000); // crea el servidor http