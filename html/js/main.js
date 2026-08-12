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

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Estado visual de carga
      submitBtn.disabled = true;
      submitBtn.innerText = 'Enviando mensaje...';
      result.className = 'form-result';
      result.style.display = 'none';

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
          result.className = 'form-result success';
          result.innerText = '¡Gracias! Tu mensaje ha sido enviado con éxito. Te responderemos pronto.';
          form.reset();
        } else {
          result.className = 'form-result error';
          result.innerText = jsonResponse.message || 'Ocurrió un error al enviar. Por favor intenta de nuevo.';
        }
      } catch (error) {
        result.className = 'form-result error';
        result.innerText = 'Error de conexión. Inténtalo nuevamente más tarde.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Enviar mensaje';
      }
    });
  }
});