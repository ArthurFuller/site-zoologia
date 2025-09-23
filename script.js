// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navToggle) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call
    updateActiveNav();

    // Back to top button
    function createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Voltar ao topo');
        backToTop.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }

    createBackToTopButton();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Update icon based on current theme
        updateThemeIcon(currentTheme);
        
        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeToggle.title = 'Alternar para modo claro';
            } else {
                themeIcon.className = 'fas fa-moon';
                themeToggle.title = 'Alternar para modo escuro';
            }
        }
        
        // Theme toggle event listener
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add a subtle animation
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            clearHighlights();
            return;
        }
        
        clearHighlights();
        
        const sections = document.querySelectorAll('.section');
        let foundResults = false;
        let firstResult = null;
        
        sections.forEach(section => {
            const textContent = section.textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                if (!foundResults) {
                    firstResult = section;
                    foundResults = true;
                }
                highlightSection(section);
            }
        });
        
        if (foundResults && firstResult) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = firstResult.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            showNoResultsMessage();
        }
    }
    
    function clearHighlights() {
        const highlightedSections = document.querySelectorAll('.section.search-highlight');
        highlightedSections.forEach(section => {
            section.classList.remove('search-highlight');
        });
        
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    function highlightSection(section) {
        section.classList.add('search-highlight');
    }
    
    function showNoResultsMessage() {
        const heroSection = document.querySelector('.hero');
        const noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 1rem; margin: 1rem 0; text-align: center; color: #856404;">
                <i class="fas fa-search"></i> Nenhum resultado encontrado para "${searchInput.value}"
            </div>
        `;
        heroSection.insertAdjacentElement('afterend', noResultsMsg);
        
        setTimeout(() => {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }, 3000);
    }
    
    // Search event listeners
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        searchInput.addEventListener('input', function() {
            if (this.value.trim() === '') {
                clearHighlights();
            }
        });
    }

    // Quiz functionality
    const quizData = {
        basico: [
            {
                category: "Filo Chordata",
                question: "Quantas espécies de cordados são conhecidas atualmente?",
                options: ["42.500 espécies", "46.200 espécies", "50.000 espécies", "38.900 espécies"],
                correct: 1,
                explanation: "O Filo Chordata possui 46.200 espécies conhecidas, distribuídas em três subfilos principais: Urochordata (3.710), Cephalochordata (~30) e Vertebrata (~42.500). Estes animais são deuterostômios com simetria bilateral e tubo digestório completo.",
                link: "#chordata"
            },
            {
                category: "Características dos Cordados",
                question: "Quais são as quatro características básicas que definem todos os cordados?",
                options: [
                    "Notocorda, tubo neural oco, fendas faríngeas, cauda pós-anal",
                    "Esqueleto, sistema nervoso, brânquias, nadadeiras",
                    "Crânio, coluna vertebral, mandíbulas, membros",
                    "Simetria bilateral, celoma, metameria, deuterostomia"
                ],
                correct: 0,
                explanation: "As quatro características diagnósticas são: 1) Notocorda (bastão esquelético dorsal elástico), 2) Tubo neural oco (sistema nervoso dorsal à notocorda), 3) Fendas faríngeas (perfurações faringe-exterior), 4) Cauda pós-anal (estrutura com função natatória). Estas características podem estar presentes apenas em estágios larvais em alguns grupos.",
                link: "#chordata"
            },
            {
                category: "Urochordata",
                question: "Quando os tunicados apresentam as características típicas de cordados?",
                options: ["Durante toda a vida", "Apenas na fase larval", "Apenas no adulto", "Varia entre as classes"],
                correct: 1,
                explanation: "Os tunicados (Urochordata) são únicos entre os cordados por apresentarem notocorda, tubo neural oco e cauda pós-anal APENAS nos estágios larvais. No adulto, desenvolvem uma túnica de tunicina e assumem formas sésseis (ascídias) ou planctônicas (salpas), perdendo a maioria das características de cordado.",
                link: "#urochordata"
            },
            {
                category: "Cephalochordata",
                question: "O que torna os anfioxos especiais entre os cordados não-vertebrados?",
                options: [
                    "São os únicos marinhos",
                    "Mantêm características de cordado no adulto",
                    "Possuem esqueleto cartilaginoso",
                    "Têm o maior número de espécies"
                ],
                correct: 1,
                explanation: "Os anfioxos (Cephalochordata) são únicos por manterem todas as quatro características de cordado no adulto: notocorda, tubo neural oco, 200 fendas faríngeas e cauda pós-anal. Com apenas ~30 espécies (2 no Brasil), são considerados o grupo irmão dos vertebrados e fundamentais para entender a evolução dos cordados.",
                link: "#cephalochordata"
            },
            {
                category: "Agnatha",
                question: "Por que a classe Agnatha é considerada primitiva entre os vertebrados?",
                options: [
                    "Não possuem esqueleto",
                    "Ausência de mandíbulas e nadadeiras pares verdadeiras",
                    "Vivem apenas em água doce",
                    "Não possuem sistema nervoso"
                ],
                correct: 1,
                explanation: "Agnatha ('sem mandíbulas') representa o estágio mais primitivo dos vertebrados. Possuem esqueleto cartilaginoso, câmaras branquiais saculiformes, órgão olfatório ímpar e fecundação externa. A ausência de mandíbulas e nadadeiras pares verdadeiras os diferencia dos Gnathostoma, representando uma etapa evolutiva anterior à revolução das mandíbulas.",
                link: "#agnatha"
            },
            {
                category: "Evolução",
                question: "Qual foi a principal vantagem evolutiva do desenvolvimento das mandíbulas nos Gnathostoma?",
                options: [
                    "Apenas melhor respiração",
                    "Somente proteção contra predadores",
                    "Múltiplas funções: captura de presas, manipulação, cuidado parental",
                    "Apenas melhoria na natação"
                ],
                correct: 2,
                explanation: "O desenvolvimento das mandíbulas (a partir do arco visceral mandibular) revolucionou os vertebrados, permitindo: capturar e mastigar presas, manipular objetos, cavar buracos, carregar materiais para construção de ninhos, segurar parceiros durante corte e segurar juvenis durante cuidado parental. Esta inovação, junto com nadadeiras pares verdadeiras, proporcionou maior agilidade e controle de movimentos.",
                link: "#gnathostoma"
            }
        ],
        intermediario: [
            {
                category: "Chondrichthyes",
                question: "Como se diferenciam as duas principais subclasses de Chondrichthyes?",
                options: [
                    "Pelo tipo de alimentação apenas",
                    "Holocephali (cabeça íntegra) vs Elasmobranchii (cabeça separada)",
                    "Apenas pelo habitat (marinho vs dulcícola)",
                    "Pelo número de nadadeiras"
                ],
                correct: 1,
                explanation: "Holocephali (50 espécies) possui cabeça íntegra, 4 fendas + 1 abertura com opérculo, placas dentígeras e são ovíparos bentônicos. Elasmobranchii (910 espécies) tem cabeça separada do corpo, 5-7 fendas branquiais externas, dentes tricúspides trocados a cada 7-8 dias, e reprodução variada (ovíparos, ovovivíparos ou vivíparos).",
                link: "#chondrichthyes"
            },
            {
                category: "Transição Evolutiva",
                question: "Qual teoria explica a transição dos vertebrados da água para a terra no Devoniano?",
                options: [
                    "Teoria da Competição Aquática",
                    "Teoria da Passagem Terrestre",
                    "Teoria da Pressão Predatória",
                    "Teoria da Deriva Continental"
                ],
                correct: 1,
                explanation: "A Teoria da Passagem Terrestre explica que no Período Devoniano, estações sazonais marcantes causavam secagem de lagos rasos, forçando peixes a estivar ou rastejar entre corpos d'água. O ambiente terrestre estava livre de predadores e competidores, e águas rasas com pouco oxigênio favoreceram o desenvolvimento de pulmões, levando às adaptações: nadadeiras→patas, pescoço diferenciado, coluna resistente e pele cornificada.",
                link: "#transicao"
            },
            {
                category: "Amphibia",
                question: "Como se diferenciam sapos, rãs e pererecas entre os anuros?",
                options: [
                    "Apenas pelo tamanho corporal",
                    "Porte, comprimento das pernas e habitat específico",
                    "Somente pela cor da pele",
                    "Apenas pelo tipo de reprodução"
                ],
                correct: 1,
                explanation: "Sapos: porte grande, pernas curtas, saltos curtos, habitat terrestre. Rãs: porte menor, pernas longas, saltos longos, habitat aquático/terrestre. Pererecas: porte menor, pernas longas + discos adesivos, saltos longos, habitat arborícola. Todas pertencem à ordem Anura (3.750 espécies) e compartilham características como ausência de cauda no adulto e metamorfose completa.",
                link: "#amphibia"
            },
            {
                category: "Reptilia",
                question: "Qual a importância evolutiva do ovo amniótico (cleidóico) dos répteis?",
                options: [
                    "Apenas proteção contra predadores",
                    "Somente aumento do tamanho do embrião",
                    "Independência total da água para reprodução",
                    "Apenas melhoria na nutrição"
                ],
                correct: 2,
                explanation: "O ovo amniótico revolucionou a reprodução dos vertebrados terrestres com: Casca (proteção mecânica + troca gasosa), Alantóide (respiração + armazenamento de excretas), Córion (envolve embrião e vitelo), Âmnion (espaço com líquido criando ambiente aquático), Vitelo (suprimento alimentar). Esta inovação permitiu reprodução completamente independente da água, conquistando definitivamente o ambiente terrestre.",
                link: "#reptilia"
            },
            {
                category: "Aves",
                question: "Quais são as duas principais teorias para a origem do voo nas aves?",
                options: [
                    "Teoria Aquática e Teoria Terrestre",
                    "Teoria Arborícola e Teoria Terrestre",
                    "Teoria Planadora e Teoria Saltadora",
                    "Teoria Predatória e Teoria Migratória"
                ],
                correct: 1,
                explanation: "Teoria Arborícola: trepador → planador → voador (saltava entre árvores, desenvolveu planagem). Teoria Terrestre: corredor → voador (usava asas para capturar insetos no solo). Ambas explicam como ancestrais desenvolveram estruturas especializadas como rêmiges, rectrizes, álula, quilha do esterno, sinsacro e pigóstilo para o voo eficiente.",
                link: "#aves"
            }
        ],
        avancado: [
            {
                category: "Características Diagnósticas",
                question: "Quais características esqueléticas distinguem os mamíferos de outros vertebrados?",
                options: [
                    "Apenas presença de ossos",
                    "Um osso mandibular, três ossículos do ouvido médio, pavilhão auditivo",
                    "Somente esqueleto interno",
                    "Apenas articulações móveis"
                ],
                correct: 1,
                explanation: "Os mamíferos possuem características esqueléticas únicas: um osso mandibular (dentário) com redução dos demais ossos da mandíbula, três ossículos do ouvido médio (estribo, bigorna, martelo), pavilhão auditivo externo, articulação dentário-escamosal e palato secundário separando cavidades oral e nasal. Estas adaptações melhoraram audição, mastigação e respiração.",
                link: "#mammalia"
            },
            {
                category: "Tipos de Pêlos",
                question: "Como se diferenciam funcionalmente os tipos de pêlos nos mamíferos?",
                options: [
                    "Todos têm a mesma função",
                    "Cobertura (aparência), lanosos (isolamento), vibrissas (tato), espinhos (proteção)",
                    "Apenas diferem na cor",
                    "Somente variam no comprimento"
                ],
                correct: 1,
                explanation: "Os pêlos mamíferos são altamente especializados: Cobertura (guard hairs) - longos e retos para cor/textura; Lanosos (viliformes) - curtos e achatados para isolamento térmico; Vibrissas - grossos e inervados como órgãos táteis especializados; Espinhos - rígidos para proteção; Cílios/Crinas - longos para proteção ocular e display. Esta diversificação permitiu adaptação a múltiplos ambientes.",
                link: "#mammalia"
            },
            {
                category: "Desenvolvimento Reprodutivo",
                question: "Como se diferenciam os três grupos de mamíferos quanto ao desenvolvimento embrionário?",
                options: [
                    "Todos desenvolvem da mesma forma",
                    "Monotremados (ovíparos), Marsupiais (gestação curta + marsúpio), Eutérios (placenta complexa)",
                    "Apenas diferem no tamanho dos filhotes",
                    "Somente variam no tempo de gestação"
                ],
                correct: 1,
                explanation: "Prototheria (6 espécies): ovíparos, desenvolvimento externo, sem mamilos (poros), sem placenta. Metatheria (250 espécies): vivíparos, gestação curta, desenvolvimento no marsúpio, placenta corioalantóide simples. Eutheria (3.800 espécies): vivíparos, gestação longa, desenvolvimento intrauterino completo, placenta corioalantóide complexa. Esta diversificação reprodutiva permitiu colonização de diferentes nichos ecológicos.",
                link: "#mammalia"
            },
            {
                category: "Ecolocalização",
                question: "Como funciona a ecolocalização em mamíferos e quais grupos a utilizam?",
                options: [
                    "Apenas morcegos, usando visão",
                    "Quirópteros (morcegos) e cetáceos, emitindo ultrassons e interpretando ecos",
                    "Todos os mamíferos, usando olfato",
                    "Apenas cetáceos, usando vibrações"
                ],
                correct: 1,
                explanation: "A ecolocalização é a emissão e interpretação de ecos ultrassônicos para navegação e caça. Quirópteros (morcegos) possuem o sistema mais sofisticado com frequências de 20-200 kHz. Cetáceos (golfinhos e baleias dentadas) usam melão e mandíbula especializados. O mecanismo envolve ondas sonoras de alta frequência + interpretação temporal dos ecos, permitindo caça noturna, navegação em águas turvas e detecção precisa de presas.",
                link: "#mammalia"
            },
            {
                category: "Composição das Penas",
                question: "Qual é a composição química detalhada das penas das aves?",
                options: [
                    "100% queratina",
                    "90% beta-queratina, 8% água, 1% lipídios, 1% outras proteínas/pigmentos",
                    "80% proteína, 20% água",
                    "95% colágeno, 5% outros"
                ],
                correct: 1,
                explanation: "As penas possuem composição específica: 90% beta-queratina (proteína estrutural única), 8% água, 1% lipídios e 1% outras proteínas e pigmentos. A coloração resulta de: pigmentos (amarelo, laranja, marrom, preto), microestrutura (branco) e combinação (azul, verde, iridescência). Esta composição confere leveza, resistência e propriedades aerodinâmicas essenciais para o voo.",
                link: "#aves"
            }
        ]
    };

    let currentQuiz = [];
    let currentQuestion = 0;
    let score = 0;
    let selectedLevel = '';
    let userAnswers = [];

    // Quiz elements
    const quizStart = document.getElementById('quizStart');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResults = document.getElementById('quizResults');
    const levelButtons = document.querySelectorAll('.level-btn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const questionCategory = document.getElementById('questionCategory');
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const answerOptions = document.getElementById('answerOptions');
    const questionFeedback = document.getElementById('questionFeedback');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const reviewBtn = document.getElementById('reviewBtn');

    // Start quiz
    if (levelButtons.length > 0) {
        levelButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                selectedLevel = this.dataset.level;
                startQuiz();
            });
        });
    }

    function startQuiz() {
        currentQuiz = [...quizData[selectedLevel]];
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        
        quizStart.style.display = 'none';
        quizQuestion.style.display = 'block';
        
        showQuestion();
    }

    function showQuestion() {
        const question = currentQuiz[currentQuestion];
        
        // Update progress
        const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = `Questão ${currentQuestion + 1} de ${currentQuiz.length}`;
        
        // Update question content
        questionCategory.textContent = question.category;
        questionNumber.textContent = currentQuestion + 1;
        questionText.textContent = question.question;
        
        // Update answer options
        answerOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.dataset.answer = index;
            btn.innerHTML = `
                <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                <span class="answer-text">${option}</span>
            `;
            btn.addEventListener('click', selectAnswer);
            answerOptions.appendChild(btn);
        });
        
        // Reset feedback and controls
        questionFeedback.style.display = 'none';
        prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
        nextBtn.style.display = 'none';
    }

    function selectAnswer(e) {
        const selectedBtn = e.currentTarget;
        const selectedAnswer = parseInt(selectedBtn.dataset.answer);
        const question = currentQuiz[currentQuestion];
        const isCorrect = selectedAnswer === question.correct;
        
        // Disable all buttons
        const allBtns = answerOptions.querySelectorAll('.answer-btn');
        allBtns.forEach(btn => {
            btn.style.pointerEvents = 'none';
            const answerIndex = parseInt(btn.dataset.answer);
            
            if (answerIndex === question.correct) {
                btn.classList.add('correct');
            } else if (answerIndex === selectedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });
        
        // Store answer
        userAnswers[currentQuestion] = {
            selected: selectedAnswer,
            correct: isCorrect
        };
        
        if (isCorrect) score++;
        
        // Show feedback
        showFeedback(isCorrect, question);
        
        // Show next button
        nextBtn.style.display = 'block';
        nextBtn.innerHTML = currentQuestion === currentQuiz.length - 1 ? 
            'Ver Resultados <i class="fas fa-chart-bar"></i>' : 
            'Próxima <i class="fas fa-arrow-right"></i>';
    }

    function showFeedback(isCorrect, question) {
        feedbackIcon.innerHTML = isCorrect ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-times-circle"></i>';
        feedbackIcon.className = isCorrect ? 'feedback-icon correct' : 'feedback-icon incorrect';
        
        feedbackTitle.textContent = isCorrect ? 'Correto!' : 'Incorreto!';
        feedbackExplanation.textContent = question.explanation;
        
        const feedbackLink = questionFeedback.querySelector('.feedback-link');
        if (feedbackLink) {
            feedbackLink.href = question.link;
        }
        
        questionFeedback.style.display = 'block';
    }

    // Navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion === currentQuiz.length - 1) {
                showResults();
            } else {
                currentQuestion++;
                showQuestion();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion();
            }
        });
    }

    function showResults() {
        quizQuestion.style.display = 'none';
        quizResults.style.display = 'block';
        
        const percentage = Math.round((score / currentQuiz.length) * 100);
        const grade = getGrade(percentage);
        
        document.getElementById('finalScore').textContent = score;
        document.getElementById('finalPercentage').textContent = percentage + '%';
        document.getElementById('finalGrade').textContent = grade;
        
        // Update results icon and title based on performance
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');
        
        if (percentage === 100) {
            resultsIcon.innerHTML = '<i class="fas fa-crown"></i>';
            resultsTitle.textContent = 'PERFEITO! 🎉';
            resultsSubtitle.textContent = 'Parabéns! Você ganhou o Prêmio Especial!';
            
            // Add special perfect score message
            showPerfectScoreMessage();
        } else if (percentage >= 80) {
            resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            resultsTitle.textContent = 'Excelente!';
            resultsSubtitle.textContent = 'Você completou o questionário';
            resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
            resultsTitle.textContent = 'Bom trabalho!';
            resultsSubtitle.textContent = 'Você completou o questionário';
        } else {
            resultsIcon.innerHTML = '<i class="fas fa-book"></i>';
            resultsTitle.textContent = 'Continue estudando!';
            resultsSubtitle.textContent = 'Você completou o questionário';
        }
        
        // Calculate topic breakdown
        updateTopicBreakdown();
    }

    function showPerfectScoreMessage() {
        // Define prizes for each level
        const prizes = {
            basico: {
                title: "🥉 NÍVEL BÁSICO DOMINADO! 🥉",
                description: "Você sabe mucho sobre os conceitos fundamentais!",
                prize: "UM SORVETE DA MILKY MOO!!!",
                icon: "fas fa-medal",
                color: "#cd7f32" // Bronze
            },
            intermediario: {
                title: "🥈 NÍVEL INTERMEDIÁRIO CONQUISTADO! 🥈",
                description: "Você sabe mucho sobre os processos evolutivos e classificações!",
                prize: "UM JANTAR EM QUALQUER RESTAURANTE DA SUA ESCOLHA!!!",
                icon: "fas fa-trophy",
                color: "#c0c0c0" // Silver
            },
            avancado: {
                title: "🥇 NÍVEL AVANÇADO PERFEITO! 🥇",
                description: "Simplesmente a mulher mais incrível e perfeita desse mundão!!!!!",
                prize: "UM VESTIDO (OU OUTRO MIMO) DA SUA ESCOLHA!!!",
                icon: "fas fa-crown",
                color: "#ffd700" // Gold
            }
        };

        const currentPrize = prizes[selectedLevel];
        
        // Create special message for perfect score
        const resultsCard = document.querySelector('.results-card');
        const specialMessage = document.createElement('div');
        specialMessage.className = 'perfect-score-message';
        specialMessage.style.background = `linear-gradient(135deg, ${currentPrize.color} 0%, ${currentPrize.color}88 100%)`;
        
        specialMessage.innerHTML = `
            <div class="perfect-message-content">
                <div class="perfect-icon">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h3>${currentPrize.title}</h3>
                <p>${currentPrize.description}</p>
                <div class="prize-box">
                    <div class="prize-icon">
                        <i class="${currentPrize.icon}"></i>
                    </div>
                    <div class="prize-text">
                        <h4>Você ganhou:</h4>
                        <p class="prize-description">${currentPrize.prize}</p>
                    </div>
                </div>
                <div class="level-achievement">
                    <p><strong>Nível:</strong> ${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
                    <p><strong>Questões:</strong> ${currentQuiz.length} questões</p>
                    <p><strong>Precisão:</strong> 100% - Perfeito!</p>
                </div>
            </div>
        `;
        
        // Insert after results header
        const resultsHeader = resultsCard.querySelector('.results-header');
        resultsHeader.insertAdjacentElement('afterend', specialMessage);
    }

    function getGrade(percentage) {
        if (percentage >= 90) return 'A';
        if (percentage >= 80) return 'B';
        if (percentage >= 70) return 'C';
        if (percentage >= 60) return 'D';
        return 'F';
    }

    function updateTopicBreakdown() {
        const topics = {};
        
        currentQuiz.forEach((question, index) => {
            const category = question.category;
            if (!topics[category]) {
                topics[category] = { correct: 0, total: 0 };
            }
            topics[category].total++;
            if (userAnswers[index] && userAnswers[index].correct) {
                topics[category].correct++;
            }
        });
        
        const topicResults = document.querySelector('.topic-results');
        if (topicResults) {
            topicResults.innerHTML = '';
            
            Object.entries(topics).forEach(([topic, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                const topicDiv = document.createElement('div');
                topicDiv.className = 'topic-result';
                topicDiv.innerHTML = `
                    <span class="topic-name">${topic}</span>
                    <div class="topic-bar">
                        <div class="topic-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="topic-score">${data.correct}/${data.total}</span>
                `;
                topicResults.appendChild(topicDiv);
            });
        }
    }

    // Restart quiz
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            quizResults.style.display = 'none';
            quizStart.style.display = 'block';
        });
    }

    // Review content
    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .characteristic-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation to sections
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
