// gsap.registerPlugin(ScrollTrigger);

// const elemento = document.querySelector('.ContenedorCoco h2');
// const elemento2 = document.querySelector('.ImgMaskCoco');
// const elemento3 = document.querySelector('.ImgMaskCocos');
// const elemento4 = document.querySelector('.ImgMaskCocos2');
// function aplicarAnimacion() {
//   if (window.innerWidth > 925) { 
//     gsap.to(elemento, {
//       xPercent: "+=120",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });

//     gsap.to(elemento2, {
//       yPercent: "-=115",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });
//     gsap.to(elemento3, {
//       transform: "scale(1)",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });
    
//   }
//   if (window.innerWidth < 925) { 
//     gsap.to(elemento2, {
//       yPercent: "-=120",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });
//     gsap.to(elemento3, {
//       transform: "scale(1)",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });
//     gsap.to(elemento4, {
//       transform: "scale(1)",
//       duration: 2.5,
//       ease: "back.out(1.7)",
//     });
    
//   }
// }

// // Ejecutar la animación al cargar la página
// aplicarAnimacion();

// // Ejecutar la animación al cambiar el tamaño de la pantalla
// window.addEventListener('resize', aplicarAnimacion);




const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_92hv82l';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Mensaje enviado Correctamente!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});