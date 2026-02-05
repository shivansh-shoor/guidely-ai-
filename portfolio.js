function PortfolioManager() {
    this.projects = [
        {
            id: 'dashboard',
            title: 'Data Analysis Dashboard',
            description: 'Create interactive dashboards using Python, Pandas, and Streamlit',
            category: 'Data Analysis',
            difficulty: 'Intermediate',
            duration: '8 hours',
            progress: 0,
            skills: ['Python', 'Pandas', 'Streamlit', 'Matplotlib', 'SQL'],
            score: null
        },
        {
            id: 'ml-model',
            title: 'Machine Learning Model',
            description: 'Build a classification model from scratch using scikit-learn',
            category: 'Machine Learning',
            difficulty: 'Advanced',
            duration: '12 hours',
            progress: 0,
            skills: ['Python', 'scikit-learn', 'TensorFlow', 'Keras', 'PyTorch'],
            score: null
        },
        {
            id: 'api-development',
            title: 'REST API Development',
            description: 'Create a web API with Flask/FastAPI',
            category: 'Web Development',
            difficulty: 'Intermediate',
            duration: '8 hours',
            progress: 0,
            skills: ['Python', 'Flask', 'REST', 'SQL', 'PostgreSQL'],
            score: null
        },
        {
            id: 'database-design',
            title: 'Database Design',
            description: 'Design and implement a relational database',
            category: 'Database',
            difficulty: 'Beginner',
            duration: '6 hours',
            progress: 0,
            skills: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'],
            score: null
        },
        {
            id: 'frontend-site',
            title: 'Frontend Portfolio Site',
            description: 'Build a personal portfolio website',
            category: 'Frontend',
            difficulty: 'Beginner',
            duration: '10 hours',
            progress: 0,
            skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Tailwind'],
            score: null
        }
    ];

    currentProject = null;
    currentUser = null;

    init() {
        this.loadUserSession();
        this.renderProjects();
        this.bindEvents();
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('cbai_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderProjects();
        this.bindProjectEvents();
        this.bindModalEvents();
        });
    }

    renderProjects() {
        const container = document.getElementById('project-grid');
        if (!container) return;

        container.innerHTML = '';
        
        this.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'glass-card rounded-2xl p-6';
            
            // Header
            const header = document.createElement('div');
            header.className = 'flex justify-between items-center mb-4';
            header.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-700">
                        <i class="fas fa-code text-white text-xl"></i>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900">${project.title}</h3>
                <div class="text-sm text-gray-600">${project.description}</div>
            </div>
            `;
            
            card.appendChild(header);
            
            // Category Badge
            const categoryBadge = document.createElement('div');
            categoryBadge.className = 'px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-medium rounded';
            categoryBadge.textContent = project.category;
            card.appendChild(categoryBadge);
            
            // Difficulty Badge
            const difficultyBadge = document.createElement('div');
            difficultyBadge.className = 'px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-medium rounded';
            difficultyBadge.textContent = project.difficulty;
            card.appendChild(difficultyBadge);
            
            // Progress Circle
            const progressCircle = document.createElement('div');
            progressCircle.className = 'w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center';
            progressCircle.innerHTML = `<i class="fas fa-check text-green-600 text-xl"></i>`;
            card.appendChild(progressCircle);
            
            // Progress Text
            const progressText = document.createElement('div');
            progressText.className = 'text-sm font-medium text-gray-600';
            progressText.innerHTML = `<div class="mb-2">${project.progress}%</div><div>Completed</div>`;
            card.appendChild(progressText);
            
            container.appendChild(progressCircle);
            
            card.appendChild(categoryBadge);
            card.appendChild(difficultyBadge);
            
            // Skills List
            const skillsList = document.createElement('div');
            skillsList.className = 'grid grid-cols-2 gap-2 mt-4';
            
            project.skills.forEach(skill => {
                const skillBadge = document.createElement('div');
                skillBadge.className = 'px-2 py-1 bg-gray-100 rounded text-sm text-gray-600';
                skillBadge.textContent = skill;
                skillsList.appendChild(skillBadge);
            });
            
            card.appendChild(skillsList);
            
            container.appendChild(card);
        });
    }

    selectTemplate(templateId) {
        this.currentProject = this.projects.find(p => p.id === templateId);
        if (!this.currentProject) return;
        
        this.showModal(`
            <div class="modal active" id="active-modal">
                <div class="modal-content" style="max-width: 600px;">
                    <h2 class="text-xl font-bold mb-4">Select Template: ${this.currentProject.title}</h2>
                    
                    <div class="space-y-6">
                        ${this.projects.filter(p => p.id !== templateId).map(project => `
                            <div class="glass-card p-6 rounded-2xl">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <div class="flex-1">
                                            <h4 class="text-lg font-semibold mb-2">${project.title}</h4>
                                            <p class="text-gray-600 mb-4">${project.description}</p>
                                            <div class="flex items-center gap-4">
                                                <span class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">Category: <strong>${project.category}</strong></span>
                                            <span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">Difficulty: <strong>${project.difficulty}</strong></span>
                                            <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Duration: <strong>${project.duration}</strong></span>
                                            <div class="text-gray-500 text-sm">Progress: <strong>${project.progress}%</strong></div>
                                        </div>
                                        <div class="text-right">
                                            <button onclick="portfolioManager.selectTemplate('${project.id}')" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <button onclick="portfolioManager.closeModal()" class="text-gray-500 hover:text-gray-700">Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('active-modal');
        if (!modal) return;
        modal.classList.remove('active');
    }

    showModal(content, title = '') {
        const modal = document.getElementById('modal-container');
        
        modal.innerHTML = `
            <div class="modal active" id="active-modal">
                <div class="modal-content" style="max-width: 600px;">
                    <div class="modal-header">
                        <h2 class="text-xl font-bold">${title || 'Select Template'}</h2>
                        <button onclick="portfolioManager.closeModal()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                <div class="modal-footer">
                    <button onclick="portfolioManager.closeModal()" class="bg-purple-600 text-white px-6 py-2 rounded-lg">
                        Done
                    </button>
                </div>
            </div>
        </div>
        `;
        
        modal.classList.add('active');
    }

    saveProjects() {
        localStorage.setItem('cbai_projects', JSON.stringify(this.projects));
    }

    bindProjectEvents() {
        // Modal close event
        const closeModalBtn = document.querySelector('#active-modal button[onclick*="portfolioManager.closeModal"]');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeModal();
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolioManager = new PortfolioManager();
});