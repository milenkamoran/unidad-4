
import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

import {auth, guardarPerfil} from "./firebase.js";
import {mostrarMensaje} from "./showMessage.js"
const formCrearCuenta = $("#formCrearCuenta");



formCrearCuenta.submit(async function(event) {
    // Evita que el formulario se envíe
    event.preventDefault();
    
    // Realiza cualquier acción necesaria aquí

    //Aqui se toman los datos que el usuario ingreso por el modal de registrarse
    console.log(formCrearCuenta);
    var correo = formCrearCuenta.find('#correoCrearCuenta').val();
    var contra = formCrearCuenta.find('#contraCrearCuenta').val();
   
    //aqui se toman datos nomnres, apellidos,edad,sexo
    var nombres = formCrearCuenta.find('#nombresCrearCuenta').val();
    //var apellidos = formCrearCuenta.find('#apellidosCrearCuenta').val();
    var apodo = formCrearCuenta.find('#apodoCrearCuenta').val();
    var numero = formCrearCuenta.find('#numeroCrearCuenta').val();
    var cumple = formCrearCuenta.find('#cumpleCrearCuenta').val();
    var edad = formCrearCuenta.find('#edadCrearCuenta').val();
    var sexo = formCrearCuenta.find('#sexoCrearCuenta').val();

    try{
        const credencialesUsuario = await createUserWithEmailAndPassword(auth,correo,contra);
        
      console.log(nombres+apodo+numero+cumple+edad+sexo+correo)
        guardarPerfil(nombres, apodo,numero,cumple, edad, sexo, correo);

        //Cerrar modal de crear cuenta
        const modalCrearCuenta = $("#modalCrearCuenta");
        const modal = bootstrap.Modal.getInstance(modalCrearCuenta);
        modal.hide();

        //resetear el form
        formCrearCuenta.trigger('reset');
        //mostrar mensaje de bienvenida
        alert("Bienvenido "+credencialesUsuario.user.email);



    }catch(error){
        console.log("error")
        if (error.code === 'auth/email-already-in-use') {
            mostrarMensaje("Email en uso", "error")
          } else if (error.code === 'auth/invalid-email') {
            mostrarMensaje("Invalido email", "error")
          } else if (error.code === 'auth/weak-password') {
            mostrarMensaje("Password corto", "error")
          } else if (error.code) {
            mostrarMensaje("Algo salio mal", "error")
          }
    }

});