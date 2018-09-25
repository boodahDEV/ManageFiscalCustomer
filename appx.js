let fs =require('fs');
let soap = require("soap");
let args = {name: "value"};

/**datos importantes requeridos */
 let pass=fs.readFileSync('pass.txt','utf-8'); 
 let user=fs.readFileSync('user.txt','utf-8');
 let webservice=fs.readFileSync('ws.txt','utf-8');
/**datos importantes requeridos */

soap.createClient(webservice,(err,client)=>{
    args={
        FiscalCustomerInvoice:{
            CustomerInvoiceID: "8474-1728"
        }
    }
    client.setSecurity(new soap.BasicAuthSecurity(user,pass));
    client.service.Read;
    client.Read(args,(err,res)=>{
        if(err){ console.log("Error de conexion...\n");console.log(err);}
        conexion_tedious();
        //console.log(res);
        //BulkLoadData (res);
    });
});

//// <---  CONNECTION WITH TEDIUOS   ---> ////
function conexion_tedious(){
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES
var connection = new Connection({
    userName: 'sa', 
    password: 'sybase',
    server: 'localhost', 
    options: {
        instanceName: 'SQLSERVER',
        database: 'DBMOF',
    }
});
connection.on('connect', function(err) {
    if (err) {
      console.log('Connection Failed in the DataBase \n\n'+err);
    }else{
        console.log("Satisfactory Connections...");
        consult_sql(connection,(err,res)=>{
            if(err) console.log('Error en el QUERY => '+err);
            else console.log(res);
         });
    }//fin else
});
}

function BulkLoadData (res) {
    const tabla = '[dbo].[Tabla_prueba]';
    var options = {keepNulls: true};
    var bulkload = connection.newBulkLoad(tabla, options,(err,rowcount)=>{
         if(err){
             console.log('Error Not Found \n'+err);
         }else{
            console.log('insert '+rowcount+' Rows');
            connection.close();
         }
    });

    //anadir columnas
      bulkload.addColumn('SAP_UUID',TYPES.VarChar,{length: 50 ,nullable:false});
      bulkload.addColumn('CustomerInvoiceID',TYPES.VarChar,{length: 50 ,nullable:false});
      bulkload.addColumn('Date',TYPES.VarChar,{length: 50, nullable:false});
      bulkload.addColumn('FiscalNumber',TYPES.VarChar,{length: 50 ,nullable:false});

   for (let i in res){
        for(let j in res[i]){
            bulkload.addRow(res[i]["SAP_UUID"], res[i]["CustomerInvoiceID"],res[i]["Date"],res[i]["FiscalNumber"]);
            break;
        }
    }
    connection.execBulkLoad(bulkload);
}//end functions bulk load


//// <---  CONSULT WITH TEDIUOS   ---> ////
function consult_sql(connection, callback){
    var results = [];
    var Request = require('tedious').Request;
    var request = new Request('SELECT * FROM dbo.Tabla_prueba', function(error) {
        if (error) return callback(error);
        callback(null, results);
    });

    request.on("row", function(rowObject) {
        results.push(rowObject);    //anade al arreglo la siguiente columna
    });
    connection.execSql(request);

}//end consult