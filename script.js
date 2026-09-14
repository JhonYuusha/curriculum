var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function typeEffect(element, text) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i);
            yield sleep(75);
        }
    });
}
function deleteEffect(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentText = element.innerHTML;
        for (let i = currentText.length; i >= 0; i--) {
            element.innerHTML = currentText.substring(0, i);
            yield sleep(40);
        }
    });
}
function startTypingLoop(element, text) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield typeEffect(element, text);
            yield sleep(3000);
            yield deleteEffect(element);
            yield sleep(500);
        }
    });
}
function formatHours(years) {
    const hours = Math.round(years * 1040);
    return hours.toLocaleString('pt-BR');
}
// NOVO: Função para formatar o texto usando Markdown simples (**negrito**)
function formatMarkdown(text) {
    // Regex: Encontra **texto** e substitui por <strong>texto</strong>
    return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
const skillData = {
    'HTML5': { years: 1.5, note: "Desenvolvendo interfaces semânticas, acessíveis e focadas em performance.", level: "Expert" },
    'CSS3': { years: 1.5, note: "Foco em design responsivo, animações limpas e pré-processadores.", level: "Expert" },
    'JavaScript': { years: 1.2, note: "Construindo a lógica e interatividade, dominando ES6+ e assincronicidade.", level: "Expert" },
    'TypeScript': { years: 0.5, note: "Utilizando tipagem forte para códigos mais seguros e escaláveis em grandes projetos.", level: "Intermediate" },
    'Java': { years: 1.1, note: "Foco em POO (Programação Orientada a Objetos), padrões de projeto e sistemas de backend.", level: "Intermediate" },
    'React': { years: 0.5, note: "Conhecimento inicial em componentes funcionais, Hooks e gerenciamento de estado.", level: "Intermediate" },
    'Bootstrap': { years: 1.2, note: "Criação rápida de layouts e prototipagem com foco em responsividade.", level: "Intermediate" },
    'Tailwind': { years: 0.5, note: "Entendendo o workflow utility-first para estilização rápida e eficiente.", level: "Intermediate" },
    'SQL': { years: 1, note: "Consultas complexas, otimização e modelagem de banco de dados relacional (MariaDB/MySQL).", level: "Intermediate" },
    'NoSQL': { years: 0.2, note: "Explorando a flexibilidade e escalabilidade de dados não-estruturados (MongoDB/Firebase).", level: "Basic" },
    'Git': { years: 1.5, note: "Controle de versão avançado para trabalho colaborativo e manutenção de repositórios.", level: "Intermediate" },
    'VSCode': { years: 2, note: "O ambiente de trabalho principal, expert em atalhos, extensões e customização.", level: "Expert" },
    'Nodejs': { years: 0.6, note: "Utilização básica em ambientes de desenvolvimento, scripts de automação e backends simples.", level: "Intermediate" }
};
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById('hero');
    const typingElement = document.getElementById('typing-text');
    const observerTargets = document.querySelectorAll('.observer-target');
    const backToTopButton = document.getElementById('back-to-top');
    const infoIcons = document.querySelectorAll('.skill-info-icon');
    const skillTags = document.querySelectorAll('.skill-tag');
    const levelPopup = document.getElementById('level-popup');
    const levelPopupTitle = document.getElementById('level-popup-title');
    const levelPopupList = document.getElementById('level-popup-list');
    const levelPopupClose = document.getElementById('level-popup-close');
    const textToType = "Desenvolvedor Full Stack Júnior.";
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('loaded');
        }, 100);
    }
    else {
        console.error("Elemento #hero não encontrado!");
    }
    if (typingElement) {
        typingElement.style.fontFamily = "var(--font-mono)";
        typingElement.style.color = "var(--slate)";
        startTypingLoop(typingElement, textToType);
    }
    if (observerTargets.length > 0) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observerTargets.forEach(target => {
            target.classList.add('hidden');
            observer.observe(target);
        });
    }
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            }
            else {
                backToTopButton.classList.remove('visible');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    infoIcons.forEach(icon => {
        const skillName = icon.getAttribute('data-skill');
        const popupElement = document.getElementById(`${skillName}-popup`);
        const data = skillData[skillName || ''];
        if (skillName && popupElement && data) {
            const hours = formatHours(data.years);
            popupElement.innerHTML = formatMarkdown(`
                ${data.note}<br><br>
                Praticando há **${data.years} anos** (aprox. **${hours} horas**).
            `);
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                if (levelPopup)
                    levelPopup.classList.remove('active');
                document.querySelectorAll('.skill-popup.active').forEach(p => {
                    if (p !== popupElement) {
                        p.classList.remove('active');
                    }
                });
                popupElement.classList.toggle('active');
            });
        }
    });
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const level = tag.getAttribute('data-level');
            if (!level || !levelPopup || !levelPopupTitle || !levelPopupList)
                return;
            // 1. Fecha todos os pop-ups individuais
            document.querySelectorAll('.skill-popup').forEach(p => p.classList.remove('active'));
            // 2. Agrupa e lista as habilidades do nível clicado
            const skillsByLevel = Object.keys(skillData)
                .filter(key => skillData[key].level === level)
                .map(key => {
                const data = skillData[key];
                const hours = formatHours(data.years);
                return formatMarkdown(`<li><span class="accent-color">➤</span> **${key}:** ${data.note} (${data.years} anos / ${hours}h)</li>`);
            })
                .join('');
            // 3. Preenche e exibe o pop-up de nível
            levelPopupTitle.textContent = `Habilidades Nível: ${level}`;
            levelPopupList.innerHTML = skillsByLevel;
            levelPopup.classList.add('active');
        });
    });
    if (levelPopupClose && levelPopup) {
        levelPopupClose.addEventListener('click', () => {
            levelPopup.classList.remove('active');
        });
    }
    // --- LÓGICA DE FECHAMENTO GLOBAL ---
    // 1. Fecha popups ao clicar fora (no documento)
    document.addEventListener('click', () => {
        document.querySelectorAll('.skill-popup').forEach(p => p.classList.remove('active'));
        if (levelPopup)
            levelPopup.classList.remove('active');
    });
    // 2. Impede o fechamento ao clicar dentro do pop-up de nível
    if (levelPopup) {
        levelPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    // 3. Impede o fechamento ao clicar dentro dos pop-ups individuais
    infoIcons.forEach(icon => {
        const skillName = icon.getAttribute('data-skill');
        const popupElement = document.getElementById(`${skillName}-popup`);
        if (popupElement) {
            popupElement.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    });
});
