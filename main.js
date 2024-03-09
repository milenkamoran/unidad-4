import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {auth,actualizarObtenerTarea,eliminarTarea,actualizarTarea,obtenerTarea, obtenerPerfil} from "./app/firebase.js"; /*el guardar tarea es la funcion creada en el firebase*/


import './app/crearCuenta.js'
import './app/iniciarSesion.js'
import './app/cerrarSesion.js'
import {verificarSesion} from './app/verificarSesion.js'
import { guardarTarea } from "./app/firebase.js";

//llamas al id del form

const formTarea = $("#form-tareas");
const contenedorTareasMias = $("#contenedor-tareas");
const contenedorTareasTodas= $("#contenedor-tareas2");
let userGlobal;
let estadoEditar = false;
let id= '';

auth.onAuthStateChanged(async function(user) {
    if (user) { //si el usuario tiene una cuenta iniciada en la pag

      //perfilCreado = verificarPerfil()

      /*
      if perfilcreado
        
      */

        verificarSesion(user); //mostrar u ocultar los botones cuando inicies y cierres sesión

        userGlobal = user
        const correo =user.email;

        actualizarObtenerTarea(querySnapshot => {
           
            let html = '';
            let html2 = '';

            querySnapshot.forEach( //el forEach (recorre todo el arreglo) sirve para que pase tarea por tarea, reemplaza al for y while

                function(doc){
                    const tarea = doc.data();
                    
                    if(tarea.email == correo){
                       
                      const fecha = tarea.fechaCreacion.toDate();
                      const anio = fecha.getFullYear();
                      const mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses van de 0 a 11
                      const dia = fecha.getDate();
                      const hora = fecha.getHours();
                      const minutos = fecha.getMinutes();
                   
                      let amPm;

                      if(hora>=12){
                        amPm = "PM";
    
                      }
                      else{
                        amPm = "AM";
                      }
                      html += ` 

                        <li  class="list-group-item list-group-item-action mt-2    publicacionesmostrar">
                        <p> <b> ${tarea.email}</b> </p>
                        <p >${+dia+"/"+mes+"/"+anio+" a las "+hora+":"+minutos+" "+amPm} </p>
                        <p>${tarea.comentarioPublicar}</p>
                        
                        
                        <div>
                          <button id="botonEliminar" class="btn btn-primary btn-eliminar" data-id="${doc.id}">
                          <i class="bi bi-trash3-fill"></i>
                          Eliminar
                          </button>
                          <button id="botonEditar" class="btn btn-outline btn-editar" data-id="${doc.id}">
                          <i class="bi bi-pencil-fill"></i>
                          Editar
                          </button>
                        </div>
                      </li>
                      `;
                    }
                }
                    
            );


            querySnapshot.forEach( //el forEach (recorre todo el arreglo) sirve para que pase tarea por tarea, reemplaza al for y while

            function(doc){
                const tarea = doc.data();
                
                if(tarea.email != correo){

                    
                  const fecha = tarea.fechaCreacion.toDate();
                  const anio = fecha.getFullYear();
                  const mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses van de 0 a 11
                  const dia = fecha.getDate();
                  const hora = fecha.getHours();
                  const minutos = fecha.getMinutes();
                  
                  let amPm;

                  if(hora>=12){
                    amPm = "PM";

                  }
                  else{
                    amPm = "AM";
                  }

    

                    html2 += ` 

                    <li id="publicacionesmostrar2" class="list-group-item list-group-item-action mt-2">
                    
                    <div class="d-flex justify-content-between">
                    <label class="nombreUsuarios" data-id=""><b>${tarea.email}</b> publicó:</label>
                    <button class="btn btn-outline-success btn-OtroPerfil ms-auto " data-id="${tarea.email}"  data-bs-toggle="modal" data-bs-target="#modalPerfil" >
                    <i class="bi bi-person-lines-fill"></i>
                    Ver Perfil
                    </button>
                     
                     </div>
                 
                    <p>${tarea.comentarioPublicar}</p>
                    <p>${+dia+"/"+mes+"/"+anio+" a las "+hora+":"+minutos+" "+amPm} </p>
                    
                    <div>
                      <button id="botonLike" class="btn btn-primary btn-like" data-id="">
                      <i class="bi bi-heart-fill"></i>
                    Like
                      </button>
                      <button id="botonComentar" class="btn btn-secondary btn-edit" data-id="">
                      <i class="bi bi-chat-fill"></i>
                      Comentar
                      </button>

                  
                    </div>
                  </li>
                  `;
                }
            
            }
        );

            contenedorTareasMias.html(html); //dentro del un order list del indez se coloca el codigo 
            contenedorTareasTodas.html(html2);

            //ACCION ELIMINAR

            const $btnsEliminar = $('.btn-eliminar');
                  
            $btnsEliminar.each(function () {
              $(this).on('click', function (event) {
              
                eliminarTarea($(this).data('id'));
              });
            });

// ACCION EDITAR
            const btnsEditar = $(".btn-editar"); // En la constante btnsEditar se guarda 
            btnsEditar.each(function () { //con cada uno de los botones editar quiero que hagas lo siguiente
              $(this).on('click', async function (event) {
                const doc = await obtenerTarea($(this).data("id"));
                const tarea = doc.data(); //me va a obtener toda la info de la tarea (EMAIL, COMENTARIOPUBLICAR) y lo va a guardar en la constante "tarea"
                const cuadroeditar = $("#form-tareas"); //Dentro de taskForm2 se guardará el forms de las tareas 
                cuadroeditar.find('#comentarioPublicar').val(tarea.comentarioPublicar); //Se coloca el COMENTARIO de la tarea en el input del forms
               
                estadoEditar = true; //se esta editando
                id = doc.id;
                cuadroeditar.find('#btn-task-form').text('Modificar');
              });
            });


            //Accion mostrar perfil de otros

            const btnsOtroPerfil = $(".btn-OtroPerfil")

            btnsOtroPerfil.each(function(){
              $(this).click(async function(){
                const perfil = await obtenerPerfil($(this).data("id"));
                llenarModalPerfil(perfil)
              })
            })

         
             
 

            
        });


        
      } else {
        console.log("sin sesion")
    
        
       
    
        //mostrarContenidoVacio();
        verificarSesion(user);
      }
    });


        /*console.log("sesion iniciada")
        try {     
           
            mostrarContenido(); 
        } catch (error) {
            console.log(error)
        }*/
     
   
//PARA QUE AL DARLE AL BOTON SE GUARDE LA TAREa

formTarea.submit(function(e){

    e.preventDefault();

    var comentarioPublicarI = formTarea.find("#comentarioPublicar").val(); //tomo titulo del formulario
    const fechaCreacionF = new Date();

    if(userGlobal){ 
      
      if(estadoEditar){ //se evalua si estamos en modo editar
        console.log("entro a estado editar if")
        actualizarTarea(id, {
          comentarioPublicar: comentarioPublicarI,
          email: userGlobal.email
        });
        estadoEditar = false;
        id = "";
        formTarea.find('#btn-task-form').text('Guardar'); //que el boton diga guardar denuevo
  
      
      }else{
        guardarTarea(userGlobal.email,comentarioPublicarI,fechaCreacionF); //se guarda la tarea
      }
      
      //si la inicion esta iniciada
     
        formTarea.trigger("reset"); //para que se vacie el contenido del input 
    }
});

    //Vamos a colocar la accion del boton mi perfil

    const botonMiPerfil = $("#botonPerfil");
    botonMiPerfil.click(async function(){

      //que va a pasar cuando le de click al boton mi perfil
      


      const perfil = await  obtenerPerfil(userGlobal.email);
      llenarModalPerfil(perfil); //llena el modal "miperfil" con datos obtenidos
    

    });

    function llenarModalPerfil(perfil){
      $("#nombresPerfil").html(perfil.nombres)
      $("#apodoPerfil").html(perfil.apodo);
      $("#numeroPerfil").html(perfil.numero);
      $("#cumplePerfil").html(perfil.cumple);
      $("#edadPerfil").html(perfil.edad);
      $("#sexoPerfil").html(perfil.sexo);
     
    }

// CODIGO PARA HACER QUE SE BAJE Y SUBA SOLA AL DAR CLICK A UN BOTON
    $(document).ready(function() {
      $('#botonAcercaDe').on('click', function() {
          $('#contAcercaDe')[0].scrollIntoView({ behavior: 'smooth' });
      });
  });


  $(document).ready(function() {
    $('#botonSubir').on('click', function() {
        $('#modalInicioDeSesión')[0].scrollIntoView({ behavior: 'smooth' });
    });
});