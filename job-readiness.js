// Job Readiness Tools JavaScript
class JobReadinessManager {
    constructor() {
        this.currentUser = null;
        this.currentModal = null;
        this.init();
    }

    init() {
        this.loadUserSession();
        this.setupEventListeners();
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('cbai_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            window.location.href = 'index.html';
        }
    }

    setupEventListeners() {
        // Event listeners will be set up as needed
    }

    showModal(content, title = '') {
        const modalHtml = `
            <div class="modal" id="active-modal">
                <div class="modal-content" style="max-width: 800px;">
                    ${title ? `
                        <div class="modal-header">
                            <h2 class="text-xl font-bold">${title}</h2>
                            <button onclick="jobReadinessManager.closeModal()" class="text-gray-500 hover:text-gray-700">
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

    // Resume Builder Methods
    createResume() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">Create Your Resume</h3>
                
                <!-- Template Selection -->
                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Choose a Template</h4>
                    <div class="grid grid-cols-4 gap-3">
                        <label class="text-center cursor-pointer">
                            <input type="radio" name="resume-template" value="professional" checked class="sr-only">
                            <div class="border rounded-lg p-3 hover:border-blue-400 template-option">
                                <i class="fas fa-file-alt text-2xl mb-2"></i>
                                <div class="text-xs">Professional</div>
                            </div>
                        </label>
                        <label class="text-center cursor-pointer">
                            <input type="radio" name="resume-template" value="creative" class="sr-only">
                            <div class="border rounded-lg p-3 hover:border-blue-400 template-option">
                                <i class="fas fa-palette text-2xl mb-2"></i>
                                <div class="text-xs">Creative</div>
                            </div>
                        </label>
                        <label class="text-center cursor-pointer">
                            <input type="radio" name="resume-template" value="technical" class="sr-only">
                            <div class="border rounded-lg p-3 hover:border-blue-400 template-option">
                                <i class="fas fa-code text-2xl mb-2"></i>
                                <div class="text-xs">Technical</div>
                            </div>
                        </label>
                        <label class="text-center cursor-pointer">
                            <input type="radio" name="resume-template" value="executive" class="sr-only">
                            <div class="border rounded-lg p-3 hover:border-blue-400 template-option">
                                <i class="fas fa-user-tie text-2xl mb-2"></i>
                                <div class="text-xs">Executive</div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Resume Sections -->
                <form id="resume-form" class="space-y-6">
                    <!-- Personal Information -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-3">Personal Information</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-input" value="${this.currentUser.name}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-input" value="${this.currentUser.email}" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-input" placeholder="+1 (555) 123-4567">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Location</label>
                                <input type="text" class="form-input" placeholder="City, State">
                            </div>
                            <div class="form-group col-span-2">
                                <label class="form-label">Professional Summary</label>
                                <textarea class="form-textarea" rows="3" placeholder="Brief summary of your professional background and career goals"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Skills -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-3">Skills</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">Technical Skills</label>
                                <textarea class="form-textarea" rows="3" placeholder="Python, SQL, Excel, Data Analysis..."></textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Soft Skills</label>
                                <textarea class="form-textarea" rows="3" placeholder="Communication, Leadership, Problem-solving..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Experience -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-3">Work Experience</h4>
                        <div id="experience-section">
                            <div class="experience-entry mb-4 p-3 border rounded">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="form-group">
                                        <label class="form-label">Job Title</label>
                                        <input type="text" class="form-input" placeholder="Data Analyst">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Company</label>
                                        <input type="text" class="form-input" placeholder="Company Name">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Start Date</label>
                                        <input type="month" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">End Date</label>
                                        <input type="month" class="form-input">
                                    </div>
                                    <div class="form-group col-span-2">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-textarea" rows="2" placeholder="Describe your responsibilities and achievements..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" onclick="jobReadinessManager.addExperienceEntry()" class="btn btn-secondary btn-sm">
                            <i class="fas fa-plus mr-2"></i> Add Experience
                        </button>
                    </div>

                    <!-- Education -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-3">Education</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-group">
                                <label class="form-label">Degree</label>
                                <input type="text" class="form-input" placeholder="Bachelor of Science">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Field of Study</label>
                                <input type="text" class="form-input" placeholder="Computer Science">
                            </div>
                            <div class="form-group">
                                <label class="form-label">University</label>
                                <input type="text" class="form-input" placeholder="University Name">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Graduation Year</label>
                                <input type="number" class="form-input" placeholder="2023">
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-8">
                    <button onclick="jobReadinessManager.generateResume()" class="btn btn-primary">
                        <i class="fas fa-magic mr-2"></i> Generate Resume
                    </button>
                    <button onclick="jobReadinessManager.closeModal()" class="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        this.showModal(content, 'Create Resume');
        
        // Setup template selection visual feedback
        setTimeout(() => {
            this.setupTemplateSelection();
        }, 100);
    }

    setupTemplateSelection() {
        const templateInputs = document.querySelectorAll('input[name="resume-template"]');
        templateInputs.forEach(input => {
            input.addEventListener('change', () => {
                document.querySelectorAll('.template-option').forEach(option => {
                    option.classList.remove('border-blue-400', 'bg-blue-50');
                });
                const selectedOption = input.nextElementSibling;
                selectedOption.classList.add('border-blue-400', 'bg-blue-50');
            });
        });
    }

    addExperienceEntry() {
        const experienceSection = document.getElementById('experience-section');
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry mb-4 p-3 border rounded';
        newEntry.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-input" placeholder="Job Title">
                </div>
                <div class="form-group">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-input" placeholder="Company Name">
                </div>
                <div class="form-group">
                    <label class="form-label">Start Date</label>
                    <input type="month" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">End Date</label>
                    <input type="month" class="form-input">
                </div>
                <div class="form-group col-span-2">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" rows="2" placeholder="Describe your responsibilities..."></textarea>
                </div>
                <div class="col-span-2">
                    <button type="button" onclick="this.closest('.experience-entry').remove()" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash mr-2"></i> Remove
                    </button>
                </div>
            </div>
        `;
        experienceSection.appendChild(newEntry);
    }

    generateResume() {
        // Show loading state
        this.showModal(`
            <div class="text-center">
                <div class="spinner mx-auto mb-6"></div>
                <h3 class="text-xl font-bold mb-4">Generating Your Resume</h3>
                <p class="text-gray-600">Our AI is creating a professional resume tailored to your target role...</p>
            </div>
        `, 'Creating Resume');

        // Simulate resume generation
        setTimeout(() => {
            this.showResumePreview();
        }, 3000);
    }

    showResumePreview() {
        const content = `
            <div>
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold">Resume Preview</h3>
                    <div class="flex gap-2">
                        <button onclick="jobReadinessManager.downloadResume()" class="btn btn-primary">
                            <i class="fas fa-download mr-2"></i> Download PDF
                        </button>
                        <button onclick="jobReadinessManager.editResume()" class="btn btn-secondary">
                            <i class="fas fa-edit mr-2"></i> Edit
                        </button>
                    </div>
                </div>

                <!-- Resume Preview -->
                <div class="bg-white border rounded-lg p-8 max-w-4xl mx-auto" style="min-height: 600px;">
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold">${this.currentUser.name}</h2>
                        <p class="text-gray-600">${this.currentUser.email} • +1 (555) 123-4567 • City, State</p>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-lg font-semibold border-b pb-2 mb-3">Professional Summary</h3>
                        <p class="text-gray-700">Data-driven professional with strong analytical skills and experience in data analysis, visualization, and reporting. Seeking to leverage technical expertise to drive business insights and decision-making.</p>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-lg font-semibold border-b pb-2 mb-3">Skills</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <strong>Technical Skills:</strong> Python, SQL, Excel, Pandas, NumPy, Matplotlib, Tableau, Statistics
                            </div>
                            <div>
                                <strong>Soft Skills:</strong> Communication, Problem-solving, Team collaboration, Project management, Critical thinking
                            </div>
                        </div>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-lg font-semibold border-b pb-2 mb-3">Professional Experience</h3>
                        <div class="mb-4">
                            <h4 class="font-semibold">Data Analyst</h4>
                            <p class="text-gray-600 text-sm">Tech Corp Inc. • Jan 2022 - Present</p>
                            <ul class="list-disc list-inside text-gray-700 mt-2">
                                <li>Analyzed large datasets to identify trends and insights for business strategy</li>
                                <li>Created automated dashboards and reports using Python and Tableau</li>
                                <li>Collaborated with cross-functional teams to drive data-driven decisions</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold border-b pb-2 mb-3">Education</h3>
                        <div>
                            <h4 class="font-semibold">Bachelor of Science in Computer Science</h4>
                            <p class="text-gray-600 text-sm">University Name • 2023</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <button onclick="jobReadinessManager.closeModal()" class="btn btn-primary">
                        Save & Close
                    </button>
                    <button onclick="jobReadinessManager.shareResume()" class="btn btn-secondary">
                        <i class="fas fa-share-alt mr-2"></i> Share
                    </button>
                </div>
            </div>
        `;

        this.showModal(content, 'Resume Preview');
    }

    downloadResume() {
        // Simulate PDF download
        this.showNotification('Resume is being downloaded...', 'info');
        setTimeout(() => {
            this.showNotification('Resume downloaded successfully!', 'success');
        }, 2000);
    }

    editResume() {
        this.createResume(); // Back to editor
    }

    shareResume() {
        this.showNotification('Resume share link copied to clipboard!', 'success');
    }

    // Mock Interview Methods
    startMockInterview() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">Mock Interview Setup</h3>
                
                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Choose Interview Type</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <label class="cursor-pointer">
                            <input type="radio" name="interview-type" value="technical" checked class="sr-only">
                            <div class="border rounded-lg p-4 hover:border-blue-400 interview-option">
                                <div class="text-center">
                                    <i class="fas fa-code text-3xl mb-2"></i>
                                    <h5 class="font-semibold">Technical Interview</h5>
                                    <p class="text-sm text-gray-600">Coding challenges, algorithms, system design</p>
                                </div>
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" name="interview-type" value="behavioral" class="sr-only">
                            <div class="border rounded-lg p-4 hover:border-blue-400 interview-option">
                                <div class="text-center">
                                    <i class="fas fa-comments text-3xl mb-2"></i>
                                    <h5 class="font-semibold">Behavioral Interview</h5>
                                    <p class="text-sm text-gray-600">Communication, teamwork, problem-solving</p>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Select Role</h4>
                    <select class="form-select">
                        <option>Data Analyst</option>
                        <option>Data Scientist</option>
                        <option>Software Engineer</option>
                        <option>Product Manager</option>
                        <option>UX Designer</option>
                    </select>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Difficulty Level</h4>
                    <div class="grid grid-cols-3 gap-3">
                        <label class="cursor-pointer">
                            <input type="radio" name="difficulty" value="beginner" checked class="sr-only">
                            <div class="border rounded-lg p-3 text-center hover:border-blue-400 difficulty-option">
                                <div>Beginner</div>
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" name="difficulty" value="intermediate" class="sr-only">
                            <div class="border rounded-lg p-3 text-center hover:border-blue-400 difficulty-option">
                                <div>Intermediate</div>
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" name="difficulty" value="advanced" class="sr-only">
                            <div class="border rounded-lg p-3 text-center hover:border-blue-400 difficulty-option">
                                <div>Advanced</div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold mb-3">Interview Duration</h4>
                    <select class="form-select">
                        <option>15 minutes - Quick Practice</option>
                        <option>30 minutes - Standard</option>
                        <option>45 minutes - Comprehensive</option>
                        <option>60 minutes - Full Session</option>
                    </select>
                </div>

                <div class="flex gap-3">
                    <button onclick="jobReadinessManager.beginInterview()" class="btn btn-primary">
                        <i class="fas fa-video mr-2"></i> Start Interview
                    </button>
                    <button onclick="jobReadinessManager.closeModal()" class="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        this.showModal(content, 'Mock Interview Setup');
        
        // Setup selection visual feedback
        setTimeout(() => {
            this.setupInterviewSelection();
        }, 100);
    }

    setupInterviewSelection() {
        // Interview type selection
        const typeInputs = document.querySelectorAll('input[name="interview-type"]');
        typeInputs.forEach(input => {
            input.addEventListener('change', () => {
                document.querySelectorAll('.interview-option').forEach(option => {
                    option.classList.remove('border-blue-400', 'bg-blue-50');
                });
                const selectedOption = input.nextElementSibling;
                selectedOption.classList.add('border-blue-400', 'bg-blue-50');
            });
        });

        // Difficulty selection
        const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
        difficultyInputs.forEach(input => {
            input.addEventListener('change', () => {
                document.querySelectorAll('.difficulty-option').forEach(option => {
                    option.classList.remove('border-blue-400', 'bg-blue-50');
                });
                const selectedOption = input.nextElementSibling;
                selectedOption.classList.add('border-blue-400', 'bg-blue-50');
            });
        });
    }

    beginInterview() {
        const interviewType = document.querySelector('input[name="interview-type"]:checked').value;
        const role = document.querySelector('select').value;
        
        // Show interview interface
        this.showInterviewInterface(interviewType, role);
    }

    showInterviewInterface(type, role) {
        const question = this.getInterviewQuestion(type, role);
        
        const content = `
            <div class="max-w-4xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold">Mock Interview Session</h3>
                    <div class="flex items-center gap-4">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">1/5</div>
                            <div class="text-sm text-gray-600">Question</div>
                        </div>
                        <button onclick="jobReadinessManager.endInterview()" class="btn btn-danger btn-sm">
                            <i class="fas fa-stop"></i> End
                        </button>
                    </div>
                </div>

                <!-- Timer -->
                <div class="bg-blue-50 p-4 rounded-lg mb-6 text-center">
                    <div class="text-3xl font-bold text-blue-600">05:00</div>
                    <div class="text-sm text-blue-600">Time Remaining</div>
                </div>

                <!-- Question -->
                <div class="bg-white border rounded-lg p-6 mb-6">
                    <h4 class="text-lg font-semibold mb-4">${question.question}</h4>
                    ${question.hints ? `
                        <details class="mb-4">
                            <summary class="text-blue-600 cursor-pointer text-sm">Need a hint?</summary>
                            <p class="text-sm text-gray-600 mt-2">${question.hints}</p>
                        </details>
                    ` : ''}
                </div>

                <!-- Answer Input -->
                ${type === 'technical' ? `
                    <div class="bg-white border rounded-lg p-6 mb-6">
                        <h4 class="font-semibold mb-4">Your Answer</h4>
                        <textarea class="form-textarea" rows="8" placeholder="Write your code or explain your approach here..."></textarea>
                        <div class="flex gap-3 mt-4">
                            <button class="btn btn-secondary">
                                <i class="fas fa-play mr-2"></i> Run Code
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fas fa-bug mr-2"></i> Test
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="bg-white border rounded-lg p-6 mb-6">
                        <h4 class="font-semibold mb-4">Your Response</h4>
                        <div class="mb-4">
                            <button class="btn btn-primary">
                                <i class="fas fa-microphone mr-2"></i> Start Recording
                            </button>
                            <p class="text-sm text-gray-600 mt-2">Click to record your verbal response, or type below</p>
                        </div>
                        <textarea class="form-textarea" rows="6" placeholder="Type your response here..."></textarea>
                    </div>
                `}

                <!-- Navigation -->
                <div class="flex justify-between">
                    <button class="btn btn-secondary" disabled>
                        <i class="fas fa-arrow-left mr-2"></i> Previous
                    </button>
                    <button onclick="jobReadinessManager.nextQuestion()" class="btn btn-primary">
                        Next Question <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;

        this.showModal(content, 'Mock Interview');
        
        // Start timer
        this.startInterviewTimer();
    }

    getInterviewQuestion(type, role) {
        const questions = {
            technical: {
                'Data Analyst': [
                    {
                        question: "How would you handle missing data in a dataset?",
                        hints: "Consider different strategies like removal, imputation, or interpolation based on the nature and amount of missing data."
                    },
                    {
                        question: "Write a SQL query to find the top 10 customers by total purchase amount.",
                        hints: "Use GROUP BY, SUM, ORDER BY, and LIMIT clauses. Consider joining orders and customers tables."
                    }
                ],
                'Software Engineer': [
                    {
                        question: "Explain the difference between REST and GraphQL.",
                        hints: "Consider data fetching, versioning, over-fetching, under-fetching, and endpoint structures."
                    }
                ]
            },
            behavioral: {
                'Data Analyst': [
                    {
                        question: "Tell me about a time when you had to explain complex data insights to non-technical stakeholders.",
                        hints: "Focus on communication skills, simplifying complex concepts, and achieving business impact."
                    }
                ]
            }
        };

        const roleQuestions = questions[type]?.[role] || [];
        return roleQuestions[Math.floor(Math.random() * roleQuestions.length)] || {
            question: "Describe your approach to problem-solving in your professional role.",
            hints: "Think about your methodology, tools, and collaborative approach."
        };
    }

    startInterviewTimer() {
        let timeLeft = 300; // 5 minutes in seconds
        const timerElement = document.querySelector('.text-3xl.font-bold.text-blue-600');
        
        if (timerElement) {
            const timer = setInterval(() => {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    this.nextQuestion();
                }
            }, 1000);
        }
    }

    nextQuestion() {
        // Simulate moving to next question or ending interview
        this.showNotification('Question submitted. Loading next question...', 'info');
        
        setTimeout(() => {
            this.showInterviewResults();
        }, 2000);
    }

    showInterviewResults() {
        const content = `
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-8">
                    <div class="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <i class="fas fa-check text-green-600 text-3xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Interview Complete!</h3>
                    <p class="text-gray-600">Great job! Here's your performance analysis.</p>
                </div>

                <!-- Overall Score -->
                <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-6 text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">78/100</div>
                    <div class="text-gray-600">Overall Performance Score</div>
                    <div class="flex justify-center gap-2 mt-2">
                        ${[1,2,3,4].map(i => `
                            <i class="fas fa-star ${i <= 3 ? 'text-yellow-400' : 'text-gray-300'}"></i>
                        `).join('')}
                    </div>
                </div>

                <!-- Detailed Feedback -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-3">Strengths</h4>
                        <ul class="space-y-2">
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                <span class="text-sm">Strong technical knowledge and problem-solving approach</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                <span class="text-sm">Clear communication and structured answers</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-check-circle text-green-500 mt-1"></i>
                                <span class="text-sm">Good examples and real-world applications</span>
                            </li>
                        </ul>
                    </div>

                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-3">Areas for Improvement</h4>
                        <ul class="space-y-2">
                            <li class="flex items-start gap-2">
                                <i class="fas fa-lightbulb text-yellow-500 mt-1"></i>
                                <span class="text-sm">Be more specific about metrics and outcomes</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-lightbulb text-yellow-500 mt-1"></i>
                                <span class="text-sm">Practice explaining complex concepts more simply</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <i class="fas fa-lightbulb text-yellow-500 mt-1"></i>
                                <span class="text-sm">Add more business context to technical answers</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Question-by-Question Breakdown -->
                <div class="bg-white border rounded-lg p-6 mb-6">
                    <h4 class="font-semibold mb-4">Question Performance</h4>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                                <h5 class="font-medium">Question 1: Technical Problem</h5>
                                <p class="text-sm text-gray-600">SQL and data analysis</p>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold text-green-600">85/100</div>
                                <div class="text-xs text-gray-500">Excellent</div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                                <h5 class="font-medium">Question 2: Behavioral</h5>
                                <p class="text-sm text-gray-600">Team collaboration scenario</p>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold text-blue-600">72/100</div>
                                <div class="text-xs text-gray-500">Good</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recommendations -->
                <div class="bg-blue-50 p-6 rounded-lg mb-6">
                    <h4 class="font-semibold mb-3">Personalized Recommendations</h4>
                    <div class="space-y-2">
                        <p class="text-sm">• Practice more behavioral questions using the STAR method</p>
                        <p class="text-sm">• Review SQL optimization techniques and best practices</p>
                        <p class="text-sm">• Prepare specific examples with measurable outcomes</p>
                        <p class="text-sm">• Schedule another practice session in 3-4 days</p>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 justify-center">
                    <button onclick="jobReadinessManager.scheduleAnotherInterview()" class="btn btn-primary">
                        <i class="fas fa-redo mr-2"></i> Practice Again
                    </button>
                    <button onclick="jobReadinessManager.viewFullReport()" class="btn btn-secondary">
                        <i class="fas fa-chart-line mr-2"></i> Full Report
                    </button>
                    <button onclick="jobReadinessManager.closeModal()" class="btn btn-secondary">
                        Close
                    </button>
                </div>
            </div>
        `;

        this.showModal(content, 'Interview Results');
    }

    endInterview() {
        if (confirm('Are you sure you want to end the interview?')) {
            this.showInterviewResults();
        }
    }

    scheduleAnotherInterview() {
        this.startMockInterview();
    }

    viewFullReport() {
        this.showNotification('Full report generation in progress...', 'info');
    }

    // Other Methods
    addApplication() {
        this.showNotification('Application tracker coming soon!', 'info');
    }

    updateApplication(id) {
        this.showNotification(`Updating application ${id}...`, 'info');
    }

    openJobMatcher() {
        this.showNotification('Job matcher coming soon!', 'info');
    }

    openSalaryCalculator() {
        this.showNotification('Salary calculator coming soon!', 'info');
    }

    viewJobMarket() {
        this.showNotification('Full job market report coming soon!', 'info');
    }

    viewInterviewDetails(sessionId) {
        this.showNotification('Loading interview details...', 'info');
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
}

// Initialize Job Readiness Manager
const jobReadinessManager = new JobReadinessManager();

// Global functions for HTML onclick handlers
window.jobReadinessManager = jobReadinessManager;
window.createResume = () => jobReadinessManager.createResume();
window.startMockInterview = () => jobReadinessManager.startMockInterview();
window.addApplication = () => jobReadinessManager.addApplication();
window.updateApplication = (id) => jobReadinessManager.updateApplication(id);
window.openJobMatcher = () => jobReadinessManager.openJobMatcher();
window.openSalaryCalculator = () => jobReadinessManager.openSalaryCalculator();
window.viewJobMarket = () => jobReadinessManager.viewJobMarket();
window.viewInterviewDetails = (id) => jobReadinessManager.viewInterviewDetails(id);
window.selectTemplate = (type) => jobReadinessManager.selectTemplate(type);
window.editResume = (id) => jobReadinessManager.editResume(id);
window.downloadResume = (id) => jobReadinessManager.downloadResume(id);