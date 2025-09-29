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
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
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
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip external links
            if (targetId.includes('.html')) {
                window.location.href = targetId;
                return;
            }
            
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
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        }
        
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
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
            }
            
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
                explanation: "O Filo Chordata possui 46.200 espécies conhecidas, distribuídas em três subfilos principais.",
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
                explanation: "As quatro características diagnósticas são fundamentais para definir os cordados.",
                link: "#chordata"
            },
            {
                category: "Urochordata",
                question: "Quando os tunicados apresentam as características típicas de cordados?",
                options: ["Durante toda a vida", "Apenas na fase larval", "Apenas no adulto", "Varia entre as classes"],
                correct: 1,
                explanation: "Os tunicados apresentam características de cordados apenas nos estágios larvais.",
                link: "#urochordata"
            },
            {
                category: "Cephalochordata",
                question: "Quantas fendas faríngeas possuem os anfioxos?",
                options: ["50 fendas", "100 fendas", "200 fendas", "300 fendas"],
                correct: 2,
                explanation: "Os anfioxos possuem 200 fendas faríngeas verticais oblíquas.",
                link: "#cephalochordata"
            },
            {
                category: "Agnatha",
                question: "Quantas câmaras branquiais possuem as lampréias?",
                options: ["5 pares", "7 pares", "10 pares", "15 pares"],
                correct: 1,
                explanation: "As lampréias possuem 7 pares de câmaras branquiais.",
                link: "#agnatha"
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
                explanation: "Holocephali possui cabeça íntegra, Elasmobranchii tem cabeça separada do corpo.",
                link: "#chondrichthyes"
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
                explanation: "Sapos: porte grande, pernas curtas. Rãs: pernas longas. Pererecas: discos adesivos.",
                link: "#amphibia"
            }
        ],
        avancado: [
            {
                category: "Mammalia",
                question: "Quais características esqueléticas distinguem os mamíferos?",
                options: [
                    "Apenas presença de ossos",
                    "Um osso mandibular, três ossículos do ouvido médio, pavilhão auditivo",
                    "Somente esqueleto interno",
                    "Apenas articulações móveis"
                ],
                correct: 1,
                explanation: "Os mamíferos possuem características esqueléticas únicas.",
                link: "#mammalia"
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
        
        if (quizStart) quizStart.style.display = 'none';
        if (quizQuestion) quizQuestion.style.display = 'block';
        
        showQuestion();
    }

    function showQuestion() {
        if (!currentQuiz[currentQuestion]) return;
        
        const question = currentQuiz[currentQuestion];
        
        // Update progress
        const progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
        if (progressFill) progressFill.style.width = progress + '%';
        if (progressText) progressText.textContent = `Questão ${currentQuestion + 1} de ${currentQuiz.length}`;
        
        // Update question content
        if (questionCategory) questionCategory.textContent = question.category;
        if (questionNumber) questionNumber.textContent = currentQuestion + 1;
        if (questionText) questionText.textContent = question.question;
        
        // Update answer options
        if (answerOptions) {
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
        }
        
        // Reset feedback and controls
        if (questionFeedback) questionFeedback.style.display = 'none';
        if (prevBtn) prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = 'none';
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
        if (nextBtn) {
            nextBtn.style.display = 'block';
            nextBtn.innerHTML = currentQuestion === currentQuiz.length - 1 ? 
                'Ver Resultados <i class="fas fa-chart-bar"></i>' : 
                'Próxima <i class="fas fa-arrow-right"></i>';
        }
    }

    function showFeedback(isCorrect, question) {
        if (feedbackIcon) {
            feedbackIcon.innerHTML = isCorrect ? 
                '<i class="fas fa-check-circle"></i>' : 
                '<i class="fas fa-times-circle"></i>';
            feedbackIcon.className = isCorrect ? 'feedback-icon correct' : 'feedback-icon incorrect';
        }
        
        if (feedbackTitle) feedbackTitle.textContent = isCorrect ? 'Correto!' : 'Incorreto!';
        if (feedbackExplanation) feedbackExplanation.textContent = question.explanation;
        
        const feedbackLink = questionFeedback?.querySelector('.feedback-link');
        if (feedbackLink) {
            feedbackLink.href = question.link;
        }
        
        if (questionFeedback) questionFeedback.style.display = 'block';
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
        if (quizQuestion) quizQuestion.style.display = 'none';
        if (quizResults) quizResults.style.display = 'block';
        
        const percentage = Math.round((score / currentQuiz.length) * 100);
        const grade = getGrade(percentage);
        
        const finalScore = document.getElementById('finalScore');
        const finalPercentage = document.getElementById('finalPercentage');
        const finalGrade = document.getElementById('finalGrade');
        
        if (finalScore) finalScore.textContent = score;
        if (finalPercentage) finalPercentage.textContent = percentage + '%';
        if (finalGrade) finalGrade.textContent = grade;
        
        // Update results icon and title based on performance
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');
        
        if (percentage >= 80) {
            if (resultsIcon) resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
            if (resultsTitle) resultsTitle.textContent = 'Excelente!';
            if (resultsSubtitle) resultsSubtitle.textContent = 'Você completou o questionário';
        } else if (percentage >= 60) {
            if (resultsIcon) resultsIcon.innerHTML = '<i class="fas fa-medal"></i>';
            if (resultsTitle) resultsTitle.textContent = 'Bom trabalho!';
            if (resultsSubtitle) resultsSubtitle.textContent = 'Você completou o questionário';
        } else {
            if (resultsIcon) resultsIcon.innerHTML = '<i class="fas fa-book"></i>';
            if (resultsTitle) resultsTitle.textContent = 'Continue estudando!';
            if (resultsSubtitle) resultsSubtitle.textContent = 'Você completou o questionário';
        }
        
        // Calculate topic breakdown
        updateTopicBreakdown();
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
            if (quizResults) quizResults.style.display = 'none';
            if (quizStart) quizStart.style.display = 'block';
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
