// CB-AI Platform Main JavaScript Application
class CBAIPlatform {
    constructor() {
        this.currentUser = null;
        this.assessmentState = null;
        this.currentModal = null;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.loadUserSession();
        this.initializeAnimations();
    }

    attachEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });

        // Close modals on background click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') && this.currentModal) {
                this.closeModal();
            }
        });
    }

    loadUserSession() {
        // Simulate loading user session
        const savedUser = localStorage.getItem('cbai_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    updateUIForLoggedInUser() {
        // Update navigation for logged-in user
        const signInBtn = document.querySelector('button[onclick="showLogin()"]');
        if (signInBtn && this.currentUser) {
            signInBtn.innerHTML = `<i class="fas fa-user-circle mr-2"></i> ${this.currentUser.name}`;
            signInBtn.onclick = () => this.showUserProfile();
        }
    }

    initializeAnimations() {
        // Add fade-in animation to elements as they scroll into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe feature cards and other elements
        document.querySelectorAll('.bg-white.p-6.rounded-lg').forEach(el => {
            observer.observe(el);
        });
    }

    showModal(content, title = '') {
        const modalHtml = `
            <div class="modal" id="active-modal">
                <div class="modal-content" style="max-width: 600px;">
                    ${title ? `
                        <div class="modal-header">
                            <h2 class="text-xl font-bold">${title}</h2>
                            <button onclick="app.closeModal()" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    ` : ''}
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHtml;
        this.currentModal = document.getElementById('active-modal');
        
        // Trigger animation
        setTimeout(() => {
            this.currentModal.classList.add('active');
        }, 10);
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('active');
            setTimeout(() => {
                document.getElementById('modal-container').innerHTML = '';
                this.currentModal = null;
            }, 300);
        }
    }

    // Assessment Methods
    startAssessment() {
        this.showModal(this.getAssessmentOnboardingContent(), 'Career Assessment');
    }

    getAssessmentOnboardingContent() {
        return `
            <div class="text-center">
                <div class="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i class="fas fa-brain text-blue-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Discover Your Ideal Career Path</h3>
                <p class="text-gray-600 mb-8">
                    Our adaptive assessment evaluates your skills, interests, personality, and learning style 
                    to provide personalized career recommendations.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-clock text-blue-600 mt-1"></i>
                        <div>
                            <strong>20-30 minutes</strong>
                            <p class="text-sm text-gray-600">Adaptive length based on your responses</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <i class="fas fa-chart-line text-blue-600 mt-1"></i>
                        <div>
                            <strong>Science-based</strong>
                            <p class="text-sm text-gray-600">Psychometric principles and ML algorithms</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <i class="fas fa-shield-alt text-blue-600 mt-1"></i>
                        <div>
                            <strong>Privacy-first</strong>
                            <p class="text-sm text-gray-600">Your data is encrypted and confidential</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-3">
                        <i class="fas fa-trophy text-blue-600 mt-1"></i>
                        <div>
                            <strong>Instant results</strong>
                            <p class="text-sm text-gray-600">Get personalized roadmap immediately</p>
                        </div>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="form-label">Choose assessment type:</label>
                    <div class="grid grid-cols-1 gap-3">
                        <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50">
                            <input type="radio" name="assessment-type" value="full" checked class="mr-3">
                            <div>
                                <strong>Comprehensive Assessment</strong>
                                <p class="text-sm text-gray-600">Complete evaluation including all dimensions</p>
                            </div>
                        </label>
                        <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50">
                            <input type="radio" name="assessment-type" value="quick" class="mr-3">
                            <div>
                                <strong>Quick Assessment</strong>
                                <p class="text-sm text-gray-600">Fast-track evaluation for immediate results</p>
                            </div>
                        </label>
                    </div>
                </div>
                <button onclick="app.beginAssessment()" class="btn btn-primary w-full">
                    <i class="fas fa-rocket mr-2"></i> Start Assessment
                </button>
            </div>
        `;
    }

    beginAssessment() {
        const assessmentType = document.querySelector('input[name="assessment-type"]:checked').value;
        this.assessmentState = {
            type: assessmentType,
            currentQuestion: 0,
            answers: [],
            startTime: Date.now()
        };

        this.showModal(this.getAssessmentQuestionContent(), 'Career Assessment');
    }

    getAssessmentQuestionContent() {
        const questions = this.getAssessmentQuestions();
        const currentQ = questions[this.assessmentState.currentQuestion];
        const progress = ((this.assessmentState.currentQuestion + 1) / questions.length) * 100;

        return `
            <div class="assessment-container">
                <div class="question-header">
                    <span class="text-sm text-gray-600">Question ${this.assessmentState.currentQuestion + 1} of ${questions.length}</span>
                    <button onclick="app.saveAndExit()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-save mr-1"></i> Save & Exit
                    </button>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="question-card">
                    <h3 class="text-lg font-semibold mb-6">${currentQ.question}</h3>
                    <div class="answer-options">
                        ${currentQ.options.map((option, index) => `
                            <div class="answer-option" onclick="app.selectAnswer(${index})">
                                <label class="flex items-center cursor-pointer">
                                    <input type="radio" name="answer" value="${index}" class="mr-3">
                                    <span>${option}</span>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="flex justify-between mt-8">
                        <button onclick="app.previousQuestion()" class="btn btn-secondary" ${this.assessmentState.currentQuestion === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left mr-2"></i> Previous
                        </button>
                        <button onclick="app.nextQuestion()" class="btn btn-primary" id="next-btn" disabled>
                            Next <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getAssessmentQuestions() {
        return [
            {
                question: "What type of problems do you enjoy solving most?",
                options: [
                    "Logical puzzles and mathematical problems",
                    "Creative challenges and artistic expression",
                    "People-related problems and communication",
                    "Technical problems and building things",
                    "Strategic business problems and planning"
                ]
            },
            {
                question: "How do you prefer to learn new things?",
                options: [
                    "Through hands-on practice and experimentation",
                    "By reading and studying theoretical concepts",
                    "Through discussion and collaboration with others",
                    "By watching demonstrations and examples",
                    "Through structured courses and formal education"
                ]
            },
            {
                question: "What work environment suits you best?",
                options: [
                    "Quiet, focused individual work",
                    "Collaborative team environment",
                    "Fast-paced, dynamic setting",
                    "Flexible, remote work options",
                    "Structured, traditional office setting"
                ]
            },
            {
                question: "Which of these activities interests you most?",
                options: [
                    "Analyzing data and finding patterns",
                    "Creating visual designs and interfaces",
                    "Managing projects and coordinating people",
                    "Writing code and building software",
                    "Planning business strategies and growth"
                ]
            },
            {
                question: "What's your preferred work-life balance?",
                options: [
                    "Steady 9-5 with clear boundaries",
                    "Flexible hours with project-based work",
                    "High-intensity periods with good compensation",
                    "Remote work with autonomy",
                    "Part-time with multiple interests"
                ]
            }
        ];
    }

    selectAnswer(index) {
        // Remove previous selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selection to clicked option
        document.querySelectorAll('.answer-option')[index].classList.add('selected');
        document.querySelector(`input[name="answer"][value="${index}"]`).checked = true;

        // Enable next button
        document.getElementById('next-btn').disabled = false;
    }

    nextQuestion() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) return;

        // Save answer
        this.assessmentState.answers[this.assessmentState.currentQuestion] = parseInt(selectedAnswer.value);

        // Move to next question or complete assessment
        if (this.assessmentState.currentQuestion < this.getAssessmentQuestions().length - 1) {
            this.assessmentState.currentQuestion++;
            this.showModal(this.getAssessmentQuestionContent(), 'Career Assessment');
        } else {
            this.completeAssessment();
        }
    }

    previousQuestion() {
        if (this.assessmentState.currentQuestion > 0) {
            this.assessmentState.currentQuestion--;
            this.showModal(this.getAssessmentQuestionContent(), 'Career Assessment');
        }
    }

    saveAndExit() {
        localStorage.setItem('cbai_assessment_state', JSON.stringify(this.assessmentState));
        this.closeModal();
        this.showNotification('Assessment saved! You can continue later.', 'success');
    }

    completeAssessment() {
        // Simulate processing assessment
        this.showModal(`
            <div class="text-center">
                <div class="spinner mx-auto mb-6"></div>
                <h3 class="text-xl font-bold mb-4">Analyzing Your Responses</h3>
                <p class="text-gray-600">Our AI is processing your assessment to generate personalized career recommendations...</p>
            </div>
        `, 'Processing');

        setTimeout(() => {
            this.showAssessmentResults();
        }, 3000);
    }

    showAssessmentResults() {
        const results = this.generateAssessmentResults();
        
        this.showModal(`
            <div class="text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i class="fas fa-check text-green-600 text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">Your Career Profile is Ready!</h3>
                <div class="text-left mb-6">
                    <h4 class="font-semibold mb-3">Top Career Matches:</h4>
                    ${results.careers.map(career => `
                        <div class="bg-gray-50 p-4 rounded-lg mb-3">
                            <div class="flex justify-between items-center">
                                <div>
                                    <strong>${career.title}</strong>
                                    <p class="text-sm text-gray-600">${career.description}</p>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-blue-600">${career.match}%</div>
                                    <div class="text-xs text-gray-500">Match</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="app.viewRoadmap()" class="btn btn-primary w-full mb-3">
                    <i class="fas fa-route mr-2"></i> View Your Personalized Roadmap
                </button>
                <button onclick="app.closeModal()" class="btn btn-secondary w-full">
                    Review Later
                </button>
            </div>
        `, 'Assessment Complete');
    }

    generateAssessmentResults() {
        // Simulate career matching based on assessment
        return {
            careers: [
                {
                    title: "Data Analyst",
                    description: "Analyze complex data sets to help organizations make better decisions",
                    match: 92
                },
                {
                    title: "Business Analyst",
                    description: "Bridge business needs and technical solutions",
                    match: 85
                },
                {
                    title: "Product Manager",
                    description: "Lead product development and strategy",
                    match: 78
                }
            ],
            traits: {
                analytical: 88,
                creative: 72,
                interpersonal: 65,
                technical: 81,
                leadership: 58
            }
        };
    }

    viewRoadmap() {
        this.closeModal();
        this.showRoadmapModal();
    }

    showRoadmapModal() {
        const roadmap = this.generateRoadmap();
        
        this.showModal(`
            <div class="roadmap-container">
                <div class="roadmap-header">
                    <h3 class="text-2xl font-bold mb-2">Your Personalized Learning Roadmap</h3>
                    <p class="text-gray-600">Data Analyst Career Path - 9 months</p>
                </div>
                <div class="timeline">
                    ${roadmap.nodes.map((node, index) => `
                        <div class="timeline-item ${index === 0 ? 'completed' : index === 1 ? 'current' : ''}">
                            <div class="skill-node ${index === 0 ? 'completed' : index === 1 ? 'current' : ''}">
                                <div class="skill-node-header">
                                    <div>
                                        <h4 class="font-semibold text-lg">${node.title}</h4>
                                        <p class="text-gray-600">${node.description}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm font-semibold">${node.duration}</div>
                                        ${index === 0 ? '<i class="fas fa-check-circle text-green-500"></i>' : 
                                          index === 1 ? '<i class="fas fa-play-circle text-blue-500"></i>' : 
                                          '<i class="fas fa-lock text-gray-400"></i>'}
                                    </div>
                                </div>
                                <div class="skill-resources">
                                    ${node.resources.map(resource => `
                                        <div class="resource-card">
                                            <div class="resource-icon">
                                                <i class="fas ${resource.icon}"></i>
                                            </div>
                                            <div class="resource-info">
                                                <div class="font-medium">${resource.title}</div>
                                                <div class="resource-meta">
                                                    <span><i class="fas fa-clock mr-1"></i>${resource.duration}</span>
                                                    <span><i class="fas fa-signal mr-1"></i>${resource.level}</span>
                                                    <span><i class="fas fa-dollar-sign mr-1"></i>${resource.cost}</span>
                                                </div>
                                            </div>
                                            <button class="btn btn-primary btn-sm">Start</button>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-between mt-8">
                    <button onclick="app.closeModal()" class="btn btn-secondary">
                        Close
                    </button>
                    <button onclick="app.saveRoadmap()" class="btn btn-success">
                        <i class="fas fa-save mr-2"></i> Save Roadmap
                    </button>
                </div>
            </div>
        `, 'Career Roadmap');
    }

    generateRoadmap() {
        return {
            nodes: [
                {
                    title: "Python Fundamentals",
                    description: "Master basic programming concepts and Python syntax",
                    duration: "4 weeks",
                    resources: [
                        {
                            title: "Python for Everybody",
                            icon: "fa-video",
                            duration: "8 hours",
                            level: "Beginner",
                            cost: "Free"
                        },
                        {
                            title: "Interactive Python Exercises",
                            icon: "fa-code",
                            duration: "20 hours",
                            level: "Beginner",
                            cost: "Free"
                        }
                    ]
                },
                {
                    title: "Data Analysis with Pandas",
                    description: "Learn data manipulation and analysis with Pandas",
                    duration: "6 weeks",
                    resources: [
                        {
                            title: "Pandas Documentation",
                            icon: "fa-book",
                            duration: "10 hours",
                            level: "Intermediate",
                            cost: "Free"
                        },
                        {
                            title: "Real-world Data Projects",
                            icon: "fa-project-diagram",
                            duration: "15 hours",
                            level: "Intermediate",
                            cost: "Free"
                        }
                    ]
                },
                {
                    title: "Data Visualization",
                    description: "Create compelling data visualizations",
                    duration: "3 weeks",
                    resources: [
                        {
                            title: "Matplotlib & Seaborn",
                            icon: "fa-chart-bar",
                            duration: "6 hours",
                            level: "Intermediate",
                            cost: "Free"
                        }
                    ]
                }
            ]
        };
    }

    selectCareer() {
        this.showModal(`
            <div class="text-center">
                <div class="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i class="fas fa-target text-purple-600 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">Choose Your Target Career</h3>
                <p class="text-gray-600 mb-8">
                    Already know what you want to become? Select your target career and we'll create a personalized roadmap to get you there.
                </p>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Search for a career..." id="career-search">
                </div>
                <div class="grid grid-cols-1 gap-3 mb-6 text-left max-h-60 overflow-y-auto">
                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50">
                        <input type="radio" name="target-career" value="data-scientist" class="mr-3">
                        <div>
                            <strong>Data Scientist</strong>
                            <p class="text-sm text-gray-600">ML, statistics, programming</p>
                        </div>
                    </label>
                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50">
                        <input type="radio" name="target-career" value="web-developer" class="mr-3">
                        <div>
                            <strong>Web Developer</strong>
                            <p class="text-sm text-gray-600">Frontend, backend, full-stack</p>
                        </div>
                    </label>
                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50">
                        <input type="radio" name="target-career" value="product-manager" class="mr-3">
                        <div>
                            <strong>Product Manager</strong>
                            <p class="text-sm text-gray-600">Strategy, development, user experience</p>
                        </div>
                    </label>
                    <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-purple-50">
                        <input type="radio" name="target-career" value="ux-designer" class="mr-3">
                        <div>
                            <strong>UX Designer</strong>
                            <p class="text-sm text-gray-600">Design, research, prototyping</p>
                        </div>
                    </label>
                </div>
                <div class="mb-6">
                    <label class="form-label">How many hours per week can you dedicate?</label>
                    <select class="form-select">
                        <option>5-10 hours (Part-time)</option>
                        <option>10-20 hours (Moderate)</option>
                        <option>20-30 hours (Dedicated)</option>
                        <option>30+ hours (Full-time)</option>
                    </select>
                </div>
                <button onclick="app.generateTargetRoadmap()" class="btn btn-primary w-full">
                    <i class="fas fa-rocket mr-2"></i> Generate My Roadmap
                </button>
            </div>
        `, 'Select Your Career');
    }

    generateTargetRoadmap() {
        const selectedCareer = document.querySelector('input[name="target-career"]:checked');
        if (!selectedCareer) {
            this.showNotification('Please select a career first', 'error');
            return;
        }

        this.showModal(`
            <div class="text-center">
                <div class="spinner mx-auto mb-6"></div>
                <h3 class="text-xl font-bold mb-4">Creating Your Personalized Roadmap</h3>
                <p class="text-gray-600">Analyzing requirements and curating the best resources for your journey...</p>
            </div>
        `, 'Generating Roadmap');

        setTimeout(() => {
            this.showRoadmapModal();
        }, 2000);
    }

    // User Management Methods
    showLogin() {
        this.showModal(`
            <div class="max-w-md mx-auto">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <i class="fas fa-user text-blue-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold">Welcome Back</h3>
                    <p class="text-gray-600">Sign in to access your personalized roadmap</p>
                </div>
                <form onsubmit="app.handleLogin(event)">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" placeholder="you@example.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-input" placeholder="••••••••" required>
                    </div>
                    <div class="flex items-center justify-between mb-6">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            <span class="text-sm">Remember me</span>
                        </label>
                        <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary w-full mb-4">
                        Sign In
                    </button>
                    <div class="text-center">
                        <p class="text-sm text-gray-600">
                            Don't have an account? 
                            <a href="#" onclick="app.showSignup()" class="text-blue-600 hover:underline">Sign up</a>
                        </p>
                    </div>
                </form>
                <div class="mt-6 pt-6 border-t">
                    <p class="text-center text-sm text-gray-600 mb-4">Or continue with</p>
                    <div class="grid grid-cols-2 gap-3">
                        <button type="button" class="btn btn-secondary">
                            <i class="fab fa-google mr-2"></i> Google
                        </button>
                        <button type="button" class="btn btn-secondary">
                            <i class="fab fa-github mr-2"></i> GitHub
                        </button>
                    </div>
                </div>
            </div>
        `, 'Sign In');
    }

    handleLogin(event) {
        event.preventDefault();
        
        // Simulate login
        this.currentUser = {
            id: 'user_123',
            name: 'John Doe',
            email: event.target.querySelector('input[type="email"]').value,
            avatar: null
        };

        localStorage.setItem('cbai_user', JSON.stringify(this.currentUser));
        this.updateUIForLoggedInUser();
        this.closeModal();
        this.showNotification('Welcome back! Your roadmap has been loaded.', 'success');
    }

    showSignup() {
        this.showModal(`
            <div class="max-w-md mx-auto">
                <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <i class="fas fa-user-plus text-green-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold">Create Your Account</h3>
                    <p class="text-gray-600">Start your personalized career journey today</p>
                </div>
                <form onsubmit="app.handleSignup(event)">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-input" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" placeholder="you@example.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-input" placeholder="••••••••" required>
                    </div>
                    <div class="form-group">
                        <div class="flex items-center">
                            <input type="checkbox" id="terms" class="mr-2" required>
                            <label for="terms" class="text-sm">
                                I agree to the Terms of Service and Privacy Policy
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary w-full mb-4">
                        Create Account
                    </button>
                    <div class="text-center">
                        <p class="text-sm text-gray-600">
                            Already have an account? 
                            <a href="#" onclick="app.showLogin()" class="text-blue-600 hover:underline">Sign in</a>
                        </p>
                    </div>
                </form>
            </div>
        `, 'Sign Up');
    }

    handleSignup(event) {
        event.preventDefault();
        
        // Simulate signup
        this.currentUser = {
            id: 'user_' + Date.now(),
            name: event.target.querySelector('input[type="text"]').value,
            email: event.target.querySelector('input[type="email"]').value,
            avatar: null
        };

        localStorage.setItem('cbai_user', JSON.stringify(this.currentUser));
        this.updateUIForLoggedInUser();
        this.closeModal();
        this.showNotification('Account created! Would you like to start your assessment?', 'success');
        
        // Show onboarding for new user
        setTimeout(() => {
            this.startAssessment();
        }, 1000);
    }

    // Utility Methods
    showLanguageSelector() {
        this.showModal(`
            <div class="text-center">
                <h3 class="text-xl font-bold mb-6">Choose Your Language</h3>
                <div class="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    <button onclick="app.changeLanguage('en')" class="btn btn-secondary">
                        <i class="fas fa-flag-usa mr-2"></i> English
                    </button>
                    <button onclick="app.changeLanguage('es')" class="btn btn-secondary">
                        <i class="fas fa-flag mr-2"></i> Español
                    </button>
                    <button onclick="app.changeLanguage('hi')" class="btn btn-secondary">
                        <i class="fas fa-flag mr-2"></i> हिन्दी
                    </button>
                    <button onclick="app.changeLanguage('zh')" class="btn btn-secondary">
                        <i class="fas fa-flag mr-2"></i> 中文
                    </button>
                    <button onclick="app.changeLanguage('fr')" class="btn btn-secondary">
                        <i class="fas fa-flag mr-2"></i> Français
                    </button>
                    <button onclick="app.changeLanguage('ar')" class="btn btn-secondary">
                        <i class="fas fa-flag mr-2"></i> العربية
                    </button>
                </div>
            </div>
        `, 'Language Selection');
    }

    changeLanguage(lang) {
        localStorage.setItem('cbai_language', lang);
        this.closeModal();
        this.showNotification('Language preference saved', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `message ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    learnMore() {
        this.showModal(`
            <div>
                <h3 class="text-2xl font-bold mb-6">About CB-AI</h3>
                <div class="space-y-6">
                    <div>
                        <h4 class="font-semibold text-lg mb-2">Our Mission</h4>
                        <p class="text-gray-600">
                            Career-Based AI for All (CB-AI) aims to democratize career guidance by providing 
                            personalized, data-driven insights to everyone regardless of their background or location.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-2">Technology</h4>
                        <p class="text-gray-600">
                            Our platform combines psychometric assessment, machine learning, and real-time labor 
                            market data to create accurate career recommendations and learning roadmaps.
                        </p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-2">Impact</h4>
                        <p class="text-gray-600">
                            We've helped thousands of users discover fulfilling careers and acquire the skills 
                            needed to succeed in the modern economy.
                        </p>
                    </div>
                </div>
                <div class="mt-8">
                    <button onclick="app.closeModal()" class="btn btn-primary">
                        Got it!
                    </button>
                </div>
            </div>
        `, 'Learn More');
    }

    saveRoadmap() {
        this.showNotification('Roadmap saved successfully!', 'success');
    }
}

// Initialize the application
const app = new CBAIPlatform();

// Global functions for HTML onclick handlers
window.app = app;
window.startAssessment = () => app.startAssessment();
window.selectCareer = () => app.selectCareer();
window.showLogin = () => app.showLogin();
window.showLanguageSelector = () => app.showLanguageSelector();
window.learnMore = () => app.learnMore();