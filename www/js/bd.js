$(document).ready(function(){

var myDB;
//Abrir conexión y crear la base de datos
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady(){
myDB = window.openDatabase("mySQLite", "1.0", "La BD principal", 0);
}

//Create Nueva Tabla
$("#createTable").click(function(){
    myDB.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE IF NOT EXISTS articulo (id integer primary key, title text, desc text)', [],
        function(tx, result) {
             //Todo está bien
            alert("¡Tabla Creada!");
        }, 
        function(error) {
            //Hubo un error
              alert("Error al crear tabla.");
        });
    });
});

//Agrear nuevo artículo
$("#insert").click(function(){
  var title=$("#title").val();
  var desc=$("#desc").val();
  console.log(title +""+ desc);
  myDB.transaction(function(transaction) {
        var executeQuery = "INSERT INTO articulo (title, desc) VALUES (?,?)";             
        transaction.executeSql(executeQuery, [title,desc]
            , function(tx, result) {
                //Todo está bien
                 alert('Agregada');
            },
            function(error){
                //Hubo un error
                 alert('No se pudo Agregar'); 
            });
    });
});

//Despliega la tabla, consulta
$("#showTable").click(function(){
  $("#TableData").html("");
  myDB.transaction(function(transaction) {
  transaction.executeSql('SELECT * FROM articulo', [], function (tx, results) {
       var len = results.rows.length, i;
       $("#rowCount").html(len);
       for (i = 0; i < len; i++){
          $("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td><td><a href='edit.html?id="+results.rows.item(i).id+"&title="+results.rows.item(i).title+"&desc="+results.rows.item(i).desc+"'>Edit</a> &nbsp;&nbsp; <a class='delete' href='#' id='"+results.rows.item(i).id+"'>Delete</a></td></tr>");
       }
    }, null);
  });
});

//Eliminar artículo
$(document.body).on('click', '.delete' ,function(){
  var id=this.id;
  myDB.transaction(function(transaction) {
    var executeQuery = "DELETE FROM articulo where id=?";
    transaction.executeSql(executeQuery, [id],
      //Todo está bien
      function(tx, result) {alert('Borrado Correctamente');},
      //Hubo un error
      function(error){alert('No se pudo Borrar');});
  });
});


//Actualizar artículos
$("#update").click(function(){
  var id=$("#id").text();
  var title=$("#title").val();
  var desc=$("#desc").val()
  myDB.transaction(function(transaction) {
    var executeQuery = "UPDATE articulo SET title=?, desc=? WHERE id=?";
    transaction.executeSql(executeQuery, [title,desc,id],
      //Todo está bien
      function(tx, result) {alert('¡Actualizado!');},
      //Hubo un error
      function(error){alert('No se pudo Actualizar');});
  });
});
//Borra Tabla
$("#DropTable").click(function(){
    myDB.transaction(function(transaction) {
        var executeQuery = "DROP TABLE  IF EXISTS articulo";
        transaction.executeSql(executeQuery, [],
            function(tx, result) {alert('El Inventario se borró correctamente.');},
            function(error){alert('No se pudo el inventario.');}
        );
    });
});

});


