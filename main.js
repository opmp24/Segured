/**
 * Gestiona la carga dinámica del layout común (nav/footer) para mantener la consistencia en todas las páginas.
 * También inicializa funcionalidades globales como animaciones de scroll y la inyección del botón de WhatsApp.
 */
/**
 * EXPLICACIÓN DE LA INTEGRACIÓN (MASTER PAGE):
 * 
 * 1. El disparador: Cada página secundaria (ej: about.html) carga este script: <script src="../js/main.js" defer></script>.
 *    Esto le dice al navegador: "Sal de la carpeta pages, entra a la carpeta js y ejecuta main.js".
 * 
 * 2. La acción (main.js): Este archivo ejecuta una petición fetch('layout.html').
 *    Le dice al navegador: "Desde la página actual (en /pages), dame el contenido de layout.html".
 * 
 * 3. La inyección: Una vez que obtiene el index.html, extrae el <nav> y el <footer> y los pega en la página actual.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');

    // Si el nav ya tiene contenido (ej. en index.html), no hacemos nada.
    if (nav && nav.children.length > 0) {
        return;
    }

    // Advertencia si se abre como archivo local.
    if (window.location.protocol === 'file:') {
        console.warn('El menú no se puede cargar usando el protocolo file:// por seguridad. Usa un servidor local (Live Server).');
        if(nav) nav.innerHTML = '<div class="alert alert-warning m-3">El menú no se puede cargar desde un archivo local. Por favor, usa un servidor web (como Live Server en VS Code).</div>';
        return;
    }

    // Detectamos si estamos en la carpeta /pages/ o en la raíz para ajustar las rutas
    const isInPages = window.location.pathname.includes('/pages/');
    const rootPath = isInPages ? '../' : './';
    const layoutPath = isInPages ? 'layout.html' : 'pages/layout.html';

    try {
        // Cargamos layout.html ajustando la ruta según donde estemos
        const response = await fetch(layoutPath);
        if (!response.ok) throw new Error(`Error ${response.status} al cargar la plantilla.`);
        
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');

        // Inyectamos el Nav
        const masterNav = doc.querySelector('nav');
        if (masterNav && nav) {
            nav.replaceWith(masterNav);
        }

        // Inyectamos el Footer
        const masterFooter = doc.querySelector('footer');
        if (masterFooter && footer) {
            footer.replaceWith(masterFooter);
        }

        // --- Actualización de contenido desde Google Drive (Email, Teléfono, Dirección) ---
        const fetchDriveText = async (fileId, isDoc) => {
            if (!window.DRIVE_CONFIG || !window.DRIVE_CONFIG.apiKey) return null;
            const { apiKey } = window.DRIVE_CONFIG;
            
            // Definimos ambas URLs posibles (Exportar Doc o Descargar Archivo)
            const urlExport = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain&key=${apiKey}`;
            const urlMedia = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;

            // Intentamos primero según la configuración, pero tenemos fallback por si el tipo de archivo es incorrecto
            const primaryUrl = isDoc ? urlExport : urlMedia;
            const secondaryUrl = isDoc ? urlMedia : urlExport;

            try {
                let resp = await fetch(primaryUrl);
                if (resp.ok) return await resp.text();
                // Si falla el primer intento, probamos el método alternativo (fallback)
                resp = await fetch(secondaryUrl);
                if (resp.ok) return await resp.text();
            } catch (e) {
                console.warn(`Error cargando archivo Drive ${fileId}:`, e);
            }
            return null;
        };

        if (window.DRIVE_CONFIG) {
            // 1. Dirección (Address)
            if (window.DRIVE_CONFIG.addressFileId) {
                const address = await fetchDriveText(window.DRIVE_CONFIG.addressFileId, false);
                if (address) document.querySelectorAll('.sucursal-direccion').forEach(el => el.textContent = address.trim());
            }

            // 2. Teléfono (Phone)
            if (window.DRIVE_CONFIG.phoneFileId) {
                const phone = await fetchDriveText(window.DRIVE_CONFIG.phoneFileId, true);
                if (phone) {
                    const phoneClean = phone.trim();
                    const phoneUrl = phoneClean.replace(/[^0-9]/g, '');
                    document.querySelectorAll('.dynamic-phone-text').forEach(el => {
                        el.textContent = phoneClean;
                        if (el.tagName === 'A') el.href = `tel:${phoneUrl}`;
                    });
                    const fab = document.querySelector('.whatsapp-fab');
                    if (fab && phoneUrl) fab.href = `https://wa.me/${phoneUrl}`;
                }
            }

            // 3. Email
            if (window.DRIVE_CONFIG.emailFileId) {
                const email = await fetchDriveText(window.DRIVE_CONFIG.emailFileId, true);
                if (email) {
                    const emailClean = email.trim();
                    // Actualiza cualquier elemento con clase .dynamic-email-text
                    document.querySelectorAll('.dynamic-email-text').forEach(el => {
                        el.textContent = emailClean;
                        if (el.tagName === 'A') el.href = `mailto:${emailClean}`;
                    });
                }
            }
        }

        // Inyectamos el botón de WhatsApp
        const masterWa = doc.querySelector('.whatsapp-fab');
        const waPlaceholder = document.getElementById('whatsapp-placeholder');
        if (masterWa) {
            if (waPlaceholder) {
                waPlaceholder.replaceWith(masterWa);
            } else if (!document.querySelector('.whatsapp-fab')) {
                document.body.appendChild(masterWa);
            }
        }

        // Marcamos el link activo en el menú
        const currentHref = window.location.href;
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.toggle('active', link.href === currentHref);
        });

        // Reactivamos funcionalidades globales que se pierden al reemplazar el nav
        if (window.loadCustomInstallIcon) window.loadCustomInstallIcon();
        if (window.checkInstallButton) window.checkInstallButton();

        // Inicializamos las animaciones de scroll
        initScrollAnimations();
        initCounterAnimations();

        // Inicializamos el efecto de navbar al hacer scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled', 'bg-white', 'navbar-light');
                    navbar.classList.remove('navbar-dark', 'bg-dark');
                } else {
                    navbar.classList.remove('navbar-scrolled', 'bg-white', 'navbar-light');
                    navbar.classList.add('navbar-dark');
                }
            }
        });

    } catch (error) {
        console.error('Error cargando la página maestra:', error);
    }
});

function initScrollAnimations() {
    // Verificamos si anime.js está cargado
    if (typeof anime === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [50, 0], // Desde 50px abajo hacia su posición original
                    opacity: [0, 1],     // Desde invisible a visible
                    duration: 1000,      // 1 segundo de duración
                    easing: 'easeOutExpo' // Efecto de frenado suave característico de Anime.js
                });
                observer.unobserve(entry.target); // Animamos solo una vez
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initCounterAnimations() {
    // Verificamos si anime.js está cargado
    if (typeof anime === 'undefined') return;

    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                anime({
                    targets: el,
                    innerHTML: [0, target],
                    easing: 'easeOutExpo',
                    round: 1, // Redondear a enteros
                    duration: 2500
                });
                obs.unobserve(el); // Dejar de observar una vez animado
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando el 50% del elemento es visible
    
    counters.forEach(c => observer.observe(c));
}