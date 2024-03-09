const botonesSesionCerrada = $(".sesionCerrada");
const botonesSesionIniciada = $(".sesionIniciada");
const carousel = $("#carouselExampleIndicators");
const login = $("#modalInicioDeSesión");
const publicación = $("#publicacion");
const titulo = $("#titulo");
const titulo2 = $("#titulo2");
const perfil = $("#botonPerfil");
const home = $("#botonHome");
const comentariosPublicados = $("#publicaciones");
const logo = $("#logo");
const nosotras = $("#contAcercaDe");
const divx = $("#spacer");

export function verificarSesion(user) {
    if (user) {
      botonesSesionIniciada.css("display", "block");
      botonesSesionCerrada.css("display", "none");
      carousel.css("display","none");
      login.css("display","none");
      publicación.css("display","block");
      titulo.css("display","none");
      titulo2.css("display","block");
      perfil.css("display","block");
      home.css("display","block");
      comentariosPublicados.css("display","block");
      logo.css("display","block");
      nosotras.css("display","none");
      divx.css("display","none");

    } else {
      botonesSesionIniciada.css("display", "none");
      botonesSesionCerrada.css("display", "block");
      carousel.css("display","block");
      login.css("display","block");
      publicación.css("display","none");
      titulo.css("display","block");
      titulo2.css("display","none");
      perfil.css("display","none");
      home.css("display","none");
      comentariosPublicados.css("display","none");
      logo.css("display","none");
      nosotras.css("display","block");
      divx.css("display","block");
    }
  }