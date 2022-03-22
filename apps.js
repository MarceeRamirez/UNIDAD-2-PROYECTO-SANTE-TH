firebase.initializeApp({
    apikey: "AIzaSyDwIzTw-rPkAJ_MdAXZwddwreaUgLXwgxQ",
    authDomian: "admin-20cbc.firebaseapp.com",
    projectId: "admindb-20cbc"
});
 

 
 var db = firebase.firestore();
 
 function agregar(){
    var nom = document.getElementById('nombre').value;    
    var pre = document.getElementById('precio').value; 
    var sto = document.getElementById('stock').value; 
    var pro = document.getElementById('provedor').value; 


    db.collection("Restaurante").add({
        Sunombre: nom,
        Suprecio: pre,
        Sustock: sto,
        Suprovedor: pro
    })
    .then((docREf) => {
        console.log("Document written with ID: ",docREf.id);
        document.getElementById('nombre').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('stock').value = "";
        document.getElementById('provedor').value = "";
    })
    .catch((error) => {
        console.error("Error adding document: ",error);
    });
}



tabla = document.getElementById('tabla');
db.collection("Restaurante").onSnapshot((querySnapshot) =>{
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) =>{
        console.long('${doc.id} =>{doc.data().last}');
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <th>${doc.data().Sunombre}</td>
            <th>${doc.data().Suprecio}</td>
            <th>${doc.data().Sustock}</td>
            <th>${doc.data().Suprovedor}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().Sunombre}','${doc.data().Suprecio}','${doc.data().Sustock}','${doc.data().Suprovedor})">Editar</button></td>
        </tr>
        `
        });
   });

   function eliminar(id){
    db.collection("Restaurante").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}
function editar(id, nombre, precio, stock, provedor){
    console.log(id);
    var nombre = document.getElementById('nombre').value = nombre;
    var precio = document.getElementById('precio').value = precio;
    var stock = document.getElementById('stock').value = stock;
    var provedor = document.getElementById('provedor').value = provedor;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

   

    boton.onclick = function(){
        var datosEditar = db.collection("Restaurante").doc(id);
        var nombre = document.getElementById('nombre').value;
        var precio = document.getElementById('precio').value;
        var stock = document.getElementById('stock').value;
        var provedor = document.getElementById('provedor').value;
        
    

        return datosEditar.update({
            Sunombre: nombre,
            Suprecio: precio,
            Sustock: stock,
            Suprovedor: provedor
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Agregar Dato';
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

}
