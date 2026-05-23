// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Hamburguer
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Função para fechar o menu
    function closeMenu() {
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Função para abrir/fechar o menu ao clicar no botão
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            
            // Fazer scroll para a seção
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                setTimeout(function() {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (menuToggle && navMenu) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                closeMenu();
            }
        }
    });
    
    // Smooth scroll para links de navegação (exceto nav-link que já tem seu próprio handler)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        // Pular se for nav-link (já tratado acima) ou faq-question
        if (anchor.classList.contains('nav-link') || anchor.classList.contains('faq-question')) {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                // Fechar menu se estiver aberto
                closeMenu();
                
                // Fazer scroll
                setTimeout(function() {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const faqItem = this.closest('.faq-item');
            if (!faqItem) return;
            
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // Abrir o item clicado se não estava aberto
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
});
