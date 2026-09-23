/* ==========================================================================
   CONFIGURACIÓN — edita aquí los datos clave de la boda
========================================================================== */

const CONFIG = {
  fechaBoda: '2027-10-20T16:00:00',
  whatsappNumero: '529997948974',
  foroURL: 'https://script.google.com/macros/s/AKfycbwsJImqtBQtTR-E0O9yw-1VwVaSy5qeSv33uunJYDpuvdeAZke0ZMCYZeWPY9pmg9g9/exec',
};


/* ==========================================================================
   1) BOTELLA — ABRIR LA INVITACIÓN
========================================================================== */

(function initBotella(){

  const botonBotella = document.getElementById('cofre-boton');
  const portada = document.getElementById('portada');
  const resto = document.getElementById('resto-contenido');
  const scrollCue = document.getElementById('scroll-cue');

  const body = document.body;

  const audioMusica = document.getElementById('audio-musica');
  const botonMusica = document.getElementById('boton-musica');
  const textoMusica = document.getElementById('texto-musica');

  const papel = document.getElementById('papel-mensaje');

  if (!botonBotella) return;


  function abrirInvitacion(){

    if (botonBotella.classList.contains('abierto')) return;


    /* --------------------------------------------------------------
       CAMBIAMOS EL ESTADO DE LA PORTADA
    -------------------------------------------------------------- */

    botonBotella.classList.add('abierto');

    if (portada){
      portada.classList.add('abierto');
    }


    /* --------------------------------------------------------------
       REVELAR EL PERGAMINO DEL COFRE
    -------------------------------------------------------------- */

    const mensajeCofre =
      document.getElementById('mensaje-cofre');

    if (mensajeCofre){
      mensajeCofre.classList.add('visible');
      mensajeCofre.setAttribute('aria-hidden', 'false');
    }

    const instruccionCofre =
      document.getElementById('instruccion-cofre');

    if (instruccionCofre){
      instruccionCofre.classList.add('oculta');
    }


    /* --------------------------------------------------------------
       ACCESIBILIDAD
    -------------------------------------------------------------- */

    botonBotella.setAttribute(
      'aria-label',
      'Invitación abierta'
    );

    botonBotella.setAttribute(
      'aria-expanded',
      'true'
    );

    if (papel){
      papel.setAttribute(
        'aria-hidden',
        'false'
      );
    }


    /* --------------------------------------------------------------
       MÚSICA
    -------------------------------------------------------------- */

    if (audioMusica && audioMusica.src){

      audioMusica.play().then(() => {

        if (botonMusica){
          botonMusica.classList.add('reproduciendo');
          botonMusica.setAttribute(
            'aria-pressed',
            'true'
          );
        }

        if (textoMusica){
          textoMusica.textContent =
            'Pausar nuestra canción';
        }

      }).catch(() => {

        /*
          El navegador puede bloquear la reproducción automática.
          El botón de música seguirá funcionando.
        */

      });

    }


    /* --------------------------------------------------------------
       REVELAR EL RESTO DE LA INVITACIÓN
    -------------------------------------------------------------- */

    window.setTimeout(() => {

      if (resto){
        resto.classList.remove('oculto');
      }

      body.classList.remove('bloqueado');

      if (scrollCue){
        scrollCue.classList.add('visible');
      }

    }, 2500);

  }


  /* --------------------------------------------------------------
     CLICK
  -------------------------------------------------------------- */

  botonBotella.addEventListener(
    'click',
    abrirInvitacion
  );


  /* --------------------------------------------------------------
     TECLADO
  -------------------------------------------------------------- */

  botonBotella.addEventListener(
    'keydown',
    (e) => {

      if (e.key === 'Enter' || e.key === ' '){

        e.preventDefault();

        abrirInvitacion();

      }

    }
  );

})();



/* ==========================================================================
   1b) PARALLAX SUAVE AL HACER SCROLL
========================================================================== */

(function initParallax(){

  const capas = Array.from(
    document.querySelectorAll('.parallax')
  );

  if (!capas.length) return;

  let ticking = false;


  function actualizar(){

    const scrollY =
      window.scrollY ||
      window.pageYOffset;


    capas.forEach((capa) => {

      const factor =
        parseFloat(
          capa.dataset.parallax || '0.1'
        );


      const seccion =
        capa.closest('.seccion');


      const offset =
        seccion
          ? scrollY - seccion.offsetTop
          : scrollY;


      capa.style.transform =
        `translateY(${offset * factor * -0.15}px)`;

    });


    ticking = false;

  }


  window.addEventListener(
    'scroll',
    () => {

      if (!ticking){

        window.requestAnimationFrame(
          actualizar
        );

        ticking = true;

      }

    },
    { passive:true }
  );


  actualizar();

})();



/* ==========================================================================
   1b-2) APARICIÓN SUAVE DE SECCIONES AL HACER SCROLL
========================================================================== */

(function initRevelado(){

  const secciones = Array.from(
    document.querySelectorAll(
      '.seccion:not(.portada)'
    )
  );

  if (!secciones.length) return;


  if (!('IntersectionObserver' in window)){

    secciones.forEach(
      (s) => s.classList.add('en-vista')
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting){

            entry.target.classList.add(
              'en-vista'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:0.12
      }
    );


  secciones.forEach(
    (s) => observer.observe(s)
  );

})();



/* ==========================================================================
   1b-3) APARICIÓN DE EVENTOS DEL ITINERARIO
========================================================================== */

(function initItinerario(){

  const eventos = Array.from(
    document.querySelectorAll(
      '.evento-tiempo'
    )
  );

  if (!eventos.length) return;


  if (!('IntersectionObserver' in window)){

    eventos.forEach(
      (e) => e.classList.add('is-visible')
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting){

            entry.target.classList.add(
              'is-visible'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:0.25
      }
    );


  eventos.forEach(
    (e) => observer.observe(e)
  );

})();



/* ==========================================================================
   1c) SONIDO DE OLAS AMBIENTE
========================================================================== */

(function initSonidoOlas(){

  const boton =
    document.getElementById('boton-olas');

  const audio =
    document.getElementById('audio-olas');

  const texto =
    document.getElementById('texto-olas');


  if (!boton || !audio) return;


  boton.addEventListener(
    'click',
    () => {

      if (!audio.src){

        if (texto){
          texto.textContent =
            'Agrega el audio en script.js';
        }

        window.setTimeout(() => {

          if (texto){
            texto.textContent =
              'Sonido de olas';
          }

        }, 2600);

        return;

      }


      if (audio.paused){

        audio.play().catch(() => {

          if (texto){
            texto.textContent =
              'No se pudo reproducir';
          }

        });


        boton.classList.add(
          'reproduciendo'
        );

        boton.setAttribute(
          'aria-pressed',
          'true'
        );


        if (texto){
          texto.textContent =
            'Pausar olas';
        }

      } else {

        audio.pause();

        boton.classList.remove(
          'reproduciendo'
        );

        boton.setAttribute(
          'aria-pressed',
          'false'
        );


        if (texto){
          texto.textContent =
            'Sonido de olas';
        }

      }

    }
  );

})();



/* ==========================================================================
   1d) GALERÍA — LIBRO DE RECUERDOS INTERACTIVO
   Estado cerrado: una tapa que se abre al tocarla.
   Estado abierto: hojas con foto (izquierda) + mensaje (derecha),
   con navegación para pasar de hoja y un botón para cerrar el libro
   reproduciendo la animación de cierre antes de ocultarlo.
========================================================================== */

(function initLibroRecuerdos(){

  const libro =
    document.getElementById('libro-recuerdos');

  if (!libro) return;

  const tapa =
    document.getElementById('libro-abrir');

  const cuerpo =
    document.getElementById('libro-cuerpo');

  const btnCerrar =
    document.getElementById('libro-cerrar');

  const btnPrev =
    document.getElementById('pagina-prev');

  const btnNext =
    document.getElementById('pagina-next');

  const indicador =
    document.getElementById('libro-indicador');

  const hojas = Array.from(
    document.querySelectorAll('.hoja')
  );

  if (
    !tapa || !cuerpo ||
    !hojas.length
  ) return;


  const DURACION_TAPA = 700;   // debe coincidir con el CSS (.libro-tapa)
  const DURACION_HOJA = 420;   // debe coincidir con el CSS (.hoja)

  let indiceActual = 0;
  let animando = false;


  /* ------------------------------------------------------------------
     Indicador "01 / 06"
  ------------------------------------------------------------------ */

  function actualizarIndicador(){

    if (!indicador) return;

    const num = String(indiceActual + 1).padStart(2, '0');
    const total = String(hojas.length).padStart(2, '0');

    indicador.textContent = `${num} / ${total}`;

  }


  /* ------------------------------------------------------------------
     Mostrar una hoja concreta al abrir el libro o de forma directa
     (sin animación de paso de página)
  ------------------------------------------------------------------ */

  function fijarHoja(indice){

    indiceActual =
      (indice + hojas.length) % hojas.length;

    hojas.forEach((hoja, i) => {
      hoja.classList.toggle(
        'hoja--activa',
        i === indiceActual
      );
      hoja.classList.remove(
        'hoja--sale-izq',
        'hoja--sale-der',
        'hoja--entra-izq',
        'hoja--entra-der'
      );
    });

    actualizarIndicador();

  }


  /* ------------------------------------------------------------------
     Pasar de hoja con animación de "vuelta de página"
     direccion: 1 = siguiente, -1 = anterior
  ------------------------------------------------------------------ */

  function pasarHoja(direccion){

    if (animando) return;
    if (hojas.length < 2) return;

    animando = true;

    const indiceAnterior = indiceActual;

    const indiceSiguiente =
      (indiceActual + direccion + hojas.length) %
      hojas.length;

    const hojaSaliente = hojas[indiceAnterior];
    const hojaEntrante = hojas[indiceSiguiente];

    const claseSale =
      direccion > 0 ? 'hoja--sale-izq' : 'hoja--sale-der';

    const claseEntra =
      direccion > 0 ? 'hoja--entra-der' : 'hoja--entra-izq';

    // La hoja que llega arranca fuera de vista, del lado por donde "entra"
    hojaEntrante.classList.add('hoja--activa', claseEntra);

    // Forzamos reflow para que la clase de entrada aplique antes de animar
    void hojaEntrante.offsetWidth;

    // La hoja actual empieza a girar/desvanecerse hacia afuera
    hojaSaliente.classList.add(claseSale);

    // La entrante se anima hacia su posición final
    requestAnimationFrame(() => {
      hojaEntrante.classList.remove(claseEntra);
    });

    indiceActual = indiceSiguiente;
    actualizarIndicador();

    setTimeout(() => {

      hojaSaliente.classList.remove(
        'hoja--activa',
        claseSale
      );

      animando = false;

    }, DURACION_HOJA);

  }


  /* ------------------------------------------------------------------
     Abrir el libro (la tapa gira y revela el cuerpo)
  ------------------------------------------------------------------ */

  function abrirLibro(){

    fijarHoja(0);

    tapa.classList.add('libro-tapa--abriendo');
    tapa.setAttribute('aria-expanded', 'true');

    setTimeout(() => {

      tapa.hidden = true;

      cuerpo.hidden = false;
      cuerpo.classList.add('libro-cuerpo--entrando');

      requestAnimationFrame(() => {
        cuerpo.classList.remove('libro-cuerpo--entrando');
      });

      if (btnCerrar){
        btnCerrar.focus({ preventScroll: true });
      }

    }, DURACION_TAPA);

  }


  /* ------------------------------------------------------------------
     Cerrar el libro (el cuerpo se desvanece y la tapa vuelve a cerrarse)
  ------------------------------------------------------------------ */

  function cerrarLibro(){

    cuerpo.classList.add('libro-cuerpo--saliendo');

    setTimeout(() => {

      cuerpo.hidden = true;
      cuerpo.classList.remove('libro-cuerpo--saliendo');

      // Volvemos a mostrar la tapa ya "abierta" (sin transición)
      // para poder animar visualmente su cierre.
      tapa.hidden = false;
      tapa.classList.add('libro-tapa--sin-transicion');
      tapa.classList.add('libro-tapa--abriendo');

      void tapa.offsetWidth; // forzar reflow

      tapa.classList.remove('libro-tapa--sin-transicion');
      tapa.classList.remove('libro-tapa--abriendo');
      tapa.setAttribute('aria-expanded', 'false');

      tapa.focus({ preventScroll: true });

    }, 380);

  }


  tapa.addEventListener('click', abrirLibro);

  if (btnCerrar){
    btnCerrar.addEventListener('click', cerrarLibro);
  }

  if (btnPrev){
    btnPrev.addEventListener('click', () => pasarHoja(-1));
  }

  if (btnNext){
    btnNext.addEventListener('click', () => pasarHoja(1));
  }

  document.addEventListener('keydown', (e) => {

    if (cuerpo.hidden) return;

    if (e.key === 'Escape'){
      cerrarLibro();
    }

    if (e.key === 'ArrowLeft'){
      pasarHoja(-1);
    }

    if (e.key === 'ArrowRight'){
      pasarHoja(1);
    }

  });

  // Estado inicial
  fijarHoja(0);

})();



/* ==========================================================================
   1e) CONFETI DE PÉTALOS
========================================================================== */

function lanzarPetalos(){

  const colores = [
    '#e8556f',
    '#f2748f',
    '#d9a441',
    '#f7c65c'
  ];


  const total = 26;


  for (
    let i = 0;
    i < total;
    i++
  ){

    const petalo =
      document.createElement('span');


    petalo.className =
      'petalo';


    petalo.style.left =
      `${Math.random() * 100}vw`;


    petalo.style.background =
      colores[
        Math.floor(
          Math.random() *
          colores.length
        )
      ];


    petalo.style.setProperty(
      '--dx',
      `${(Math.random() - 0.5) * 200}px`
    );


    petalo.style.animationDuration =
      `${2.5 + Math.random() * 2}s`;


    document.body.appendChild(
      petalo
    );


    petalo.addEventListener(
      'animationend',
      () => petalo.remove()
    );

  }

}



/* ==========================================================================
   2) CUENTA REGRESIVA
========================================================================== */

(function initCuentaRegresiva(){

  const objetivo =
    new Date(
      CONFIG.fechaBoda
    ).getTime();


  const elDias =
    document.getElementById('dias');

  const elHoras =
    document.getElementById('horas');

  const elMin =
    document.getElementById('minutos');

  const elSeg =
    document.getElementById('segundos');


  if (!elDias) return;


  function actualizar(){

    const ahora =
      Date.now();


    let restante =
      objetivo - ahora;


    if (restante < 0){
      restante = 0;
    }


    const dias =
      Math.floor(
        restante / 86400000
      );


    const horas =
      Math.floor(
        (restante % 86400000) /
        3600000
      );


    const min =
      Math.floor(
        (restante % 3600000) /
        60000
      );


    const seg =
      Math.floor(
        (restante % 60000) /
        1000
      );


    elDias.textContent =
      String(dias).padStart(2, '0');

    elHoras.textContent =
      String(horas).padStart(2, '0');

    elMin.textContent =
      String(min).padStart(2, '0');

    elSeg.textContent =
      String(seg).padStart(2, '0');

  }


  actualizar();

  setInterval(
    actualizar,
    1000
  );

})();



/* ==========================================================================
   3) RSVP — WHATSAPP
========================================================================== */

(function initRSVP(){

  const form =
    document.getElementById(
      'form-rsvp'
    );


  const gracias =
    document.getElementById(
      'rsvp-gracias'
    );


  if (!form) return;


  form.addEventListener(
    'submit',
    (e) => {

      e.preventDefault();


      const nombre =
        form.nombre.value.trim();


      const asistenciaEl =
        form.querySelector(
          'input[name="asistencia"]:checked'
        );


      const asistencia =
        asistenciaEl
          ? asistenciaEl.value
          : '';


      const acompanantes =
        form.acompanantes.value ||
        '0';


      const mensaje =
        form.mensaje.value.trim();


      let texto =
        `¡Hola! Soy ${nombre}.\n${asistencia}.`;


      if (
        asistencia
          .toLowerCase()
          .startsWith('sí')
      ){

        texto +=
          `\nAcompañantes: ${acompanantes}.`;

      }


      if (mensaje){

        texto +=
          `\nMensaje: ${mensaje}`;

      }


      texto +=
        '\n\n— Confirmación para la boda de Amzi & Jonathan 💍';


      const url =
        `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(texto)}`;


      window.open(
        url,
        '_blank',
        'noopener'
      );


      if (gracias){
        gracias.hidden = false;
      }


      form.reset();


      lanzarPetalos();

    }
  );

})();



/* ==========================================================================
   4) FORO DE DESEOS — GOOGLE APPS SCRIPT
========================================================================== */

(function initForo(){

  const form =
    document.getElementById(
      'form-foro'
    );


  const lista =
    document.getElementById(
      'notas-invitados'
    );


  if (!form || !lista) return;


  const boton =
    form.querySelector(
      'button[type="submit"]'
    );


  const textoBotonOriginal =
    boton
      ? boton.textContent
      : '';


  function escaparHTML(texto){

    const div =
      document.createElement(
        'div'
      );


    div.textContent =
      texto;


    return div.innerHTML;

  }


  function pintarMensajes(mensajes){

    lista.innerHTML = '';


    mensajes.forEach(
      (m, i) => {

        const nota =
          document.createElement(
            'div'
          );


        nota.className =
          'nota-colgante';


        nota.style.setProperty(
          '--rot',
          `${(
            i % 2 === 0
              ? -1
              : 1
          ) * (
            2 + (i % 3)
          )}deg`
        );


        nota.innerHTML =
          `<strong>${escaparHTML(m.nombre)}</strong><p style="margin:0">${escaparHTML(m.mensaje)}</p>`;


        lista.appendChild(
          nota
        );

      }
    );

  }


  function mostrarAviso(texto){

    lista.innerHTML =
      `<p style="color:#e7e2f5;opacity:.8">${escaparHTML(texto)}</p>`;

  }


  async function cargarMensajes(){

    if (!CONFIG.foroURL){

      mostrarAviso(
        'Foro aún no configurado — agrega la URL de Google Apps Script en script.js (CONFIG.foroURL).'
      );

      return;

    }


    try {

      const resp =
        await fetch(
          CONFIG.foroURL
        );


      if (!resp.ok){
        throw new Error(
          'Respuesta no válida'
        );
      }


      const mensajes =
        await resp.json();


      if (
        !Array.isArray(mensajes) ||
        mensajes.length === 0
      ){

        mostrarAviso(
          'Sé el primero en dejar un mensaje ✨'
        );

        return;

      }


      pintarMensajes(
        mensajes
      );


    } catch (err){

      mostrarAviso(
        'No se pudieron cargar los mensajes en este momento. Intenta recargar la página.'
      );

    }

  }


  form.addEventListener(
    'submit',
    async (e) => {

      e.preventDefault();


      const nombre =
        document
          .getElementById(
            'foro-nombre'
          )
          .value
          .trim();


      const mensaje =
        document
          .getElementById(
            'foro-mensaje'
          )
          .value
          .trim();


      if (!nombre || !mensaje){
        return;
      }


      if (!CONFIG.foroURL){

        mostrarAviso(
          'Foro aún no configurado — agrega la URL de Google Apps Script en script.js (CONFIG.foroURL).'
        );

        return;

      }


      if (boton){

        boton.disabled = true;

        boton.textContent =
          'Enviando…';

      }


      try {

        await fetch(
          CONFIG.foroURL,
          {
            method:'POST',

            headers:{
              'Content-Type':
                'text/plain;charset=utf-8'
            },

            body:
              JSON.stringify({
                nombre,
                mensaje
              }),

          }
        );


        form.reset();

        await cargarMensajes();


      } catch (err){

        mostrarAviso(
          'No se pudo enviar tu mensaje. Revisa tu conexión e intenta de nuevo.'
        );


      } finally {

        if (boton){

          boton.disabled = false;

          boton.textContent =
            textoBotonOriginal;

        }

      }

    }
  );


  cargarMensajes();

})();



/* ==========================================================================
   5) ESTRELLAS TITILANDO — UBICACIÓN
========================================================================== */

(function initEstrellas(){

  const contenedor =
    document.getElementById(
      'estrellas'
    );


  if (!contenedor) return;


  const total = 60;


  for (
    let i = 0;
    i < total;
    i++
  ){

    const estrella =
      document.createElement(
        'span'
      );


    estrella.className =
      'estrella-punto';


    estrella.style.left =
      `${Math.random() * 100}%`;


    estrella.style.top =
      `${Math.random() * 100}%`;


    estrella.style.animationDelay =
      `${Math.random() * 3}s`;


    estrella.style.animationDuration =
      `${2 + Math.random() * 3}s`;


    contenedor.appendChild(
      estrella
    );

  }

})();



/* ==========================================================================
   6) LUCIÉRNAGAS — FOOTER
========================================================================== */

(function initLuciernagas(){

  const contenedor =
    document.getElementById(
      'luciernagas'
    );


  if (!contenedor) return;


  const total = 16;


  for (
    let i = 0;
    i < total;
    i++
  ){

    const luz =
      document.createElement(
        'span'
      );


    luz.className =
      'luciernaga';


    luz.style.left =
      `${Math.random() * 100}%`;


    luz.style.top =
      `${Math.random() * 100}%`;


    luz.style.animationDelay =
      `${Math.random() * 5}s, ${Math.random() * 2}s`;


    luz.style.animationDuration =
      `${5 + Math.random() * 4}s, ${2 + Math.random() * 2}s`;


    contenedor.appendChild(
      luz
    );

  }

})();



/* ==========================================================================
   7) BOTÓN DE MÚSICA
========================================================================== */

(function initMusica(){

  const boton =
    document.getElementById(
      'boton-musica'
    );


  const audio =
    document.getElementById(
      'audio-musica'
    );


  const texto =
    document.getElementById(
      'texto-musica'
    );


  if (!boton || !audio) return;


  /* --------------------------------------------------------------
     ARCHIVO DE MÚSICA
  -------------------------------------------------------------- */

  audio.src =
    'Sleeping With Sirens.mp3';


  boton.addEventListener(
    'click',
    () => {

      if (!audio.src){

        if (texto){
          texto.textContent =
            'Agrega tu canción en script.js (audio.src)';
        }


        window.setTimeout(() => {

          if (texto){
            texto.textContent =
              'Reproducir nuestra canción';
          }

        }, 2600);


        return;

      }


      if (audio.paused){

        audio.play().then(() => {

          boton.classList.add(
            'reproduciendo'
          );

          boton.setAttribute(
            'aria-pressed',
            'true'
          );


          if (texto){
            texto.textContent =
              'Pausar nuestra canción';
          }

        }).catch(() => {

          if (texto){
            texto.textContent =
              'No se pudo reproducir el audio';
          }

        });


      } else {

        audio.pause();


        boton.classList.remove(
          'reproduciendo'
        );


        boton.setAttribute(
          'aria-pressed',
          'false'
        );


        if (texto){
          texto.textContent =
            'Reproducir nuestra canción';
        }

      }

    }
  );

})();


/* ==========================================================================
   9) ATMÓSFERA TROPICAL — DEGRADADO CONTINUO AL HACER SCROLL

   Crea una capa fija detrás de todo el contenido y desplaza un degradado
   tropical (mar, arena, coral, atardecer, noche) según el avance del scroll.

   A partir de "Los invitados de honor" las secciones se vuelven translúcidas
   (ver style.css) y dejan ver esta capa, por eso los colores se funden solos.
========================================================================== */

(function initAtmosferaTropical(){

  const raiz = document.documentElement;

  /* Creamos la capa si aún no existe */

  let capa = document.querySelector('.fondo-tropical');

  if (!capa){

    capa = document.createElement('div');
    capa.className = 'fondo-tropical';
    capa.setAttribute('aria-hidden', 'true');

    const lienzo = document.createElement('div');
    lienzo.className = 'fondo-tropical__lienzo';

    capa.appendChild(lienzo);

    document.body.insertBefore(
      capa,
      document.body.firstChild
    );

  }


  /* Sección donde empieza la transición de color */

  const inicio = document.getElementById('honor');

  let ticking = false;


  function calcular(){

    ticking = false;

    const alto = window.innerHeight;

    const finDoc =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

    /*
      Si la sección de honor aún no está disponible
      (por ejemplo antes de abrir el cofre),
      usamos el documento completo.
    */

    const topInicio =
      inicio
        ? inicio.getBoundingClientRect().top + window.scrollY
        : 0;

    const recorrido =
      Math.max(finDoc - topInicio - alto, 1);

    let progreso =
      (window.scrollY - topInicio + alto * 0.55) / recorrido;

    if (progreso < 0) progreso = 0;
    if (progreso > 1) progreso = 1;

    raiz.style.setProperty(
      '--fondo-prog',
      progreso.toFixed(4)
    );

  }


  function alHacerScroll(){

    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(calcular);

  }


  window.addEventListener('scroll', alHacerScroll, { passive: true });
  window.addEventListener('resize', alHacerScroll);

  calcular();

})();