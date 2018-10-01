//como leer un archivo en NodeJS
//Video trata sobre el serve.Response
var http = require("http");
var fs = require('fs');



http.createServer((req, res)=>{
    fs.readFile("./HTML/indexV3.html",(err,html)=>{
       //res.write(html); //aqui lo que hace es mandarle respuesta al navegador de un html
       //writehead = define el encabezado de la respuesta, podemos mandar como el codigo html, que codigo estoy mandando etc.
       //statuscode, numero que le indica al navegador lo que pasa en el servidor, como 200 que sig qye todo salio bine, 400 que no se encontro lo que se pido
            //el 300 sig que lo que el nav nos mando a buscar se movio, y los 500 que hubo algun error!
        res.writeHead(200,{"Content-Type":"text/html" }) //este caso es para mandar JSON, esta funcion puede dar problemas si trabajo con ajacs, suele dar errores. 
        res.write(JSON.stringify({nombre: "Boodah", userName: "BoodahDEV"})); // lo normal siempre mandar un JSON en cadena de caracteres.

        res.end(); // si no mando end, sigo simplemente mandando respuestas!
    });
}).listen(5000); // crea el servidor http