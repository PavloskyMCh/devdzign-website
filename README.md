#  devdzign  Landing Page de Alta Conversión & Arquitectura Jamstack

[![Deploy via SSH to VPS](https://github.com/PavloskyMCh/devdzign-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/PavloskyMCh/devdzign-website/actions/workflows/deploy.yml)
![Nginx](https://img.shields.io/badge/Nginx-1.25--alpine-green?style=flat&logo=nginx)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?style=flat&logo=docker)
![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange?style=flat)

Sitio web oficial y landing page de alta conversión para **devdzign**, estudio especializado en desarrollo web de alto rendimiento, código limpio y arquitectura estática ultra rápida.

 **Sitio en Vivo:** [https://devdzign.online/](https://devdzign.online/)

---

##  Stack Tecnológico & Arquitectura

El proyecto está diseñado bajo una arquitectura híbrida para maximizar la velocidad de carga (Core Web Vitals) y la seguridad del servidor:

* **Frontend (Nivel 2 - Jamstack):** HTML5 Semántico, CSS3 Nativo (Variables CSS, Flexbox/Grid) y JavaScript ES6+ puro. Cero dependencias pesadas ni frameworks de ejecución en cliente.
* **Infraestructura & DevOps (Nivel 4):**
  * **Servidor de Producción:** VPS Linux (Ubuntu) corriendo contenedor Docker ligero (`nginx:alpine`).
  * **Seguridad & Enrutamiento:** Nginx Proxy Manager gestionando SSL/TLS automatizado y red aislada (`npm-network`).
  * **Pipeline CI/CD:** GitHub Actions para despliegue continuo *zero-downtime* mediante conexión SSH cifrada por puerto personalizado.

---

##  Flujo de Integración y Despliegue Continuo (CI/CD)

```text
[ VS Code Local ] > git push origin main > [ Repositorio GitHub ]
                                                      
                                           (GitHub Actions Workflow)
                                                      
                                            SSH (Puerto Personalizado)
                                                      
                                                      
                                           [ VPS / Docker Nginx ]
                                                      
                                           (docker exec -s reload)
                                                      
                                                      
                                           [https://devdzign.online/](https://devdzign.online/)
