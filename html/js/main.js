document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. NAVEGACIÓN Y SCROLL SPY
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Abrir/cerrar menú hamburguesa
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  // Cerrar menú al hacer clic en un enlace (móvil)
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
      }
    });
  });

  // Resaltado de sección activa en scroll (Scroll Spy)
  const updateActiveLink = () => {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      const linkId = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', linkId === currentId);
    });
  };

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Estado inicial al cargar

  // Efecto Parallax suave para la imagen de fondo
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.body.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  });

  // ==========================================
  // 2. PROCESAMIENTO ASÍNCRONO DEL FORMULARIO
  // ==========================================
  const form = document.getElementById('contact-form');
  const result = document.getElementById('form-result');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('span') : null;

  if (form && result && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalText = btnText ? btnText.textContent : submitBtn.textContent;

      // Estado de carga en el botón
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Enviando mensaje...';

      // Mostrar estado de procesamiento
      result.removeAttribute('style'); // Limpia cualquier estilo en línea previo
      result.className = 'form-result info';
      result.textContent = 'Procesando tu mensaje...';

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const jsonResponse = await response.json();

        if (response.status === 200) {
          // Éxito: Mensaje enviado
          result.className = 'form-result success';
          result.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';
          form.reset();
        } else {
          // Error devuelto por la API
          result.className = 'form-result error';
          result.textContent = jsonResponse.message || 'Ocurrió un error al enviar el mensaje.';
        }
      } catch (error) {
        // Error de red
        result.className = 'form-result error';
        result.textContent = 'Error de conexión. Por favor intenta de nuevo.';
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = originalText;
      }
    });
  }