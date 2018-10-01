// En esta version o Video se trabajara sobre como pasar variables a una vista sin modulos osea de manera como se dice cruda! osea sin express!, es para el uso de aplicaciones web dinamicas.

var http = require("http");
var fs = require('fs');



http.createServer((req, res)=>{
    fs.readFile("./HTML/indexV3.html",(err,html)=>{
        var html_string = html.toString(); // el formato que viene de html es un binario osea que viene de la lectura del archivo definido. toString(); lo convierte en cadena de caracteres!.
        var nombre = "Boodah alv prro :v";
        //uso de expresion regular! 8U alv prro!
        //Expresion regular que busca en el html donde haya {x}
        var variables = html_string.match(/[^\{\}]+(?=\})/g) // ok, los string de JS tienen un metodo MATCH que como parametro recibe una expresion regular, el cual retorna un array con todas las
                                                            // incidencias o veces dentro del texto se encuentra el patron, este patron busca un valor entre llaves...
                                                            //en variables se almacenara todas las incidencias de la busqueda en forma de arreglo de los nombres 
       //variables['nombres']
        for(var i = variables.length-1; i>=0;i--){
          var value = eval(variables[i]);  //evalúa un código JavaScript representado como una cadena de caracteres (string), sin referenciar a un objeto en particular.
          //Remplaza el contenido en llaves {x} por su valor correspondiente 
          html_string=html_string.replace("{"+variables[i]+"}",value); // remplaza lo que tengo en mi html procediente del resultado de la expresion regular por el value, osea el nombre que
                                                                        // cargue como "Boodah"
        };
        
        res.writeHead(200,{"Content-Type":"text/html" });
        res.write(html_string); // en lugar html mando el html_string es que pre-procesamos en pocas palabras.!
        res.end(); // si no mando end, sigo simplemente mandando respuestas!
    });
}).listen(5000); // crea el servidor http
