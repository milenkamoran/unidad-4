import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js";
import { mostrarMensaje } from "./showMessage.js";

const formIniciarSesion = $("#formIniciarSesion");

formIniciarSesion.submit(async function(event) {
    // Evita que el formulario se envíe
    event.preventDefault();
    
    // Realiza cualquier acción necesaria aquí

    console.log(formCrearCuenta);
    var correo = formIniciarSesion.find('#correoIniciarSesion').val();
    var contra = formIniciarSesion.find('#contraIniciarSesion').val();
    console.log(correo);
    console.log(contra);
    

    try{
        const credencialesUsuario = await signInWithEmailAndPassword(auth,correo,contra);
        console.log(credencialesUsuario);

        //Cerrar modal de crear cuenta
        //const modalIniciarSesion = $("#modalInicioDeSesión");
        //const modal = bootstrap.Modal.getInstance(modalIniciarSesion);
        //modal.hide();

        //resetear el form
        console.log("pasoooo")
        formIniciarSesion.trigger('reset');
        //mostrar mensaje de bienvenida
        mostrarMensaje("Bienvenido "+credencialesUsuario.user.email);



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