// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js" 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc,updateDoc, getDoc, query, where} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkTAg70u6UROdQn0WjGb4pPN23yvYjLDs",
  authDomain: "unidad4-app.firebaseapp.com",
  projectId: "unidad4-app",
  storageBucket: "unidad4-app.appspot.com",
  messagingSenderId: "431685624255",
  appId: "1:431685624255:web:3ead16a8e0b8610c2fc10a",
  measurementId: "G-578Q8N3VC7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//AUTENTICACION
export const auth = getAuth(app);
//export const analytics = getAnalytics(app);


//CRUD (CREAR,LEER,MODIFICAR,BORRAR)

export const db = getFirestore(); //db--> base de datos // sirve para que traiga tu base de datos a la pagina

export function guardarTarea(email,comentarioPublicar,fechaCreacion){
  addDoc( collection(db,"Publicaciones") , {email,comentarioPublicar,fechaCreacion} ); //Publicaciones es la coleccion creada donde guardaras los documentos osea los datos
} //se hace la conexion directa con firebase/firestore    //adDoc: te guarda en tu base de datos los documentos 

export function obtenerTareas() {
  return getDocs(collection(db, 'Publicaciones'));
}



export function actualizarObtenerTarea(callback){ //te muestra todas las tareas cuando ingresas a la pagina 

  return onSnapshot(  collection(db,"Publicaciones"), callback ); 
}

export function eliminarTarea(id) {
  return deleteDoc(doc(db, "Publicaciones", id));
}

export function obtenerTarea(id){
  return getDoc(doc(db, "Publicaciones", id)); // esta nos muestra una sola tarea por su id
}

export function actualizarTarea(id, nuevosCampos){  //es para poder editar la publicacion y que se actualice la publicacion una vez que ya este editada
  return updateDoc(doc(db, "Publicaciones", id), nuevosCampos);
}



//funciones de la coleccion perfiles
export function guardarPerfil(nombres, apodo,numero,cumple, edad, sexo, email) {
  addDoc(collection(db, "perfiles"), { nombres, apodo,numero,cumple, edad, sexo, email});
}

export async function obtenerPerfil(email){
  const q = query(collection(db, "perfiles"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].data();
}