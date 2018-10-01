//quiero hacer un formulario sencillo para hacer los remposes correcto y demas, esto es mas como una practica.
var http = require("http");
var fs = require('fs');



http.createServer((req, res)=>{
    //console.log(req);// imprime las peticiones que se hacen al servidor

    if(req.url.indexOf("favicon.ico")>0){ //me devuelve la url, si dice favicon, index me duevle 0 si encontro la cadena de favicon.ico en la url
        return;
    } // por ahora, la forma de acceder a los parametros sera por la url.



    fs.readFile("./HTML/indexV6.html",(err,html)=>{
        var html_string = html.toString();
        var nombre = "Boodah :v";
        var arreglo_parametro = [],parametros={}; // parametro es un hash
       

        if(req.url.indexOf("?") > 0){//esta condicion busca el caracter ? dentro de la url para saber si nos estan mandando un parametro o no!
            //primero tengo que separar el PATH  osea   /?nombre=Boodah
            var url_data = req.url.split("?"); // aqui lo que esta diciendo es que parte la cadena en varias partes basado en el operador ?, me devuelve un arrglo con el ['/', 'nombre=boodah']
            // la forma con la que se separan los parametros en una URL es por el &
            arreglo_parametro = url_data[1].split("&"); // todos los parametros que vienen en la posicion lo partimos con el & 
            //ahora tengo hasta aqui [nomre=boodah, data=algo]
        } //end if

        for (var i = arreglo_parametro.length-1; i >= 0; i--) {
            var parametro = arreglo_parametro[i];
            // nombre=boodah
            //ahora lo separo denuevopara obtener el nombre la variable
            var param_data = parametro.split("="); // separo teniendo [nombre, boodah]

            parametros[param_data[0]] = [param_data[1]]; // ahora tengo un hash de esta manera {nombre: boodah}
        };
        //ahora solo queda reemplazar el parametro por el del html
        var variables = html_string.match(/[^\{\}]+(?=\})/g) 
     
        for(var i = variables.length-1; i>=0;i--){
          var value = eval(variables[i]);
          var variable = variables[i]; //significa que estamos iterando un arreglo, entonces cada ves que se itera guada el elemento en variable
          //parametros[variable], esto dice, busca en el hash de parametros el valor variables[i] que son las variables que estamos iterando. OSEA BUSCA EN PARAMETROS ELQUE SE LLAME NOMBRE obtendre boodah
          // parametros[nombre] =boodah
          html_string=html_string.replace("{"+variables[i]+"}",parametros[variable]); // el nombre de las parametros estan definidos en el arreglo parametros[] ejemplo (nombre)
        };
        
        res.writeHead(200,{"Content-Type":"text/html" });
        res.write(html_string); 
        res.end(); 
    });
}).listen(5000); // crea el servidor http
