// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.currentModal = null;
        this.systemData = this.loadSystemData();
        this.init();
    }

    init() {
        this.loadUserSession();
        this.startRealTimeUpdates();
        this.setupEventListeners();
    }

    loadUserSession() {
        // In a real app, this would check admin permissions
        const savedUser = localStorage.getItem('cbai_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            window.location.href = 'index.html';
        }
    }

    loadSystemData() {
        return {
            users: 2847,
            activeLearners: 1234,
            projectsCompleted: 892,
            jobPlacements: 156,
            recentActivity: [],
            systemHealth: {
                api: { status: 'normal', responseTime: 245 },
                database: { status: 'optimal', performance: 85 },
                mlModel: { accuracy: 92.3 },
                storage: { usage: 68 }
            }
        };
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateSystemMetrics();
        }, 30000); // Update every 30 seconds
    }

    setupEventListeners() {
        // Event listeners will be set up as needed
    }

    showModal(content, title = '') {
        const modalHtml = `
            <div class="modal" id="active-modal">
                <div class="modal-content" style="max-width: 900px;">
                    ${title ? `
                        <div class="modal-header">
                            <h2 class="text-xl font-bold">${title}</h2>
                            <button onclick="adminDashboard.closeModal()" class="text-gray-500 hover:text-gray-700">
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

    // Content Management
    showContentManagement() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">Content Management</h3>
                
                <!-- Content Types Tabs -->
                <div class="border-b mb-6">
                    <div class="flex space-x-6">
                        <button onclick="adminDashboard.showContentTab('assessments')" class="pb-2 border-b-2 border-blue-600 font-medium text-blue-600">
                            Assessments
                        </button>
                        <button onclick="adminDashboard.showContentTab('projects')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            Projects
                        </button>
                        <button onclick="adminDashboard.showContentTab('courses')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            Courses
                        </button>
                        <button onclick="adminDashboard.showContentTab('resources')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            Resources
                        </button>
                    </div>
                </div>

                <!-- Search and Filter -->
                <div class="flex gap-4 mb-6">
                    <div class="flex-1">
                        <input type="text" class="form-input" placeholder="Search content...">
                    </div>
                    <select class="form-select">
                        <option>All Categories</option>
                        <option>Data Science</option>
                        <option>Web Development</option>
                        <option>Mobile Development</option>
                        <option>Business</option>
                    </select>
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Under Review</option>
                    </select>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus mr-2"></i> Add New
                    </button>
                </div>

                <!-- Content List -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-3 px-4">Title</th>
                                <th class="text-left py-3 px-4">Category</th>
                                <th class="text-left py-3 px-4">Status</th>
                                <th class="text-left py-3 px-4">Users</th>
                                <th class="text-left py-3 px-4">Rating</th>
                                <th class="text-left py-3 px-4">Updated</th>
                                <th class="text-left py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div>
                                        <div class="font-medium">Data Analyst Assessment</div>
                                        <div class="text-sm text-gray-500">Comprehensive evaluation for data analysis roles</div>
                                    </div>
                                </td>
                                <td class="py-3 px-4">Data Science</td>
                                <td class="py-3 px-4">
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Published</span>
                                </td>
                                <td class="py-3 px-4">342</td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="text-yellow-400">★★★★★</div>
                                        <span class="text-sm text-gray-500 ml-1">(4.8)</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4">2 days ago</td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-green-600 hover:text-green-800">
                                            <i class="fas fa-chart-line"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-800">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div>
                                        <div class="font-medium">Web Scraping Project</div>
                                        <div class="text-sm text-gray-500">Extract data from websites using Python</div>
                                    </div>
                                </td>
                                <td class="py-3 px-4">Web Development</td>
                                <td class="py-3 px-4">
                                    <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Under Review</span>
                                </td>
                                <td class="py-3 px-4">128</td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="text-yellow-400">★★★★☆</div>
                                        <span class="text-sm text-gray-500 ml-1">(4.2)</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4">1 week ago</td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="text-blue-600 hover:text-blue-800">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-green-600 hover:text-green-800">
                                            <i class="fas fa-chart-line"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-800">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="flex justify-between items-center mt-6">
                    <div class="text-sm text-gray-600">
                        Showing 1-10 of 89 items
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-secondary btn-sm">Previous</button>
                        <button class="btn btn-primary btn-sm">1</button>
                        <button class="btn btn-secondary btn-sm">2</button>
                        <button class="btn btn-secondary btn-sm">3</button>
                        <button class="btn btn-secondary btn-sm">Next</button>
                    </div>
                </div>
            </div>
        `;

        this.showModal(content, 'Content Management');
    }

    showContentTab(tab) {
        // Update tab styling
        const tabs = document.querySelectorAll('.border-b button');
        tabs.forEach(t => {
            t.classList.remove('border-blue-600', 'text-blue-600');
            t.classList.add('border-transparent');
        });
        event.target.classList.add('border-blue-600', 'text-blue-600');
        event.target.classList.remove('border-transparent');
        
        // Load content for selected tab
        this.showNotification(`Loading ${tab}...`, 'info');
    }

    // User Management
    showUserManagement() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">User Management</h3>
                
                <!-- User Stats -->
                <div class="grid grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 p-4 rounded text-center">
                        <div class="text-2xl font-bold text-blue-600">2,847</div>
                        <div class="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div class="bg-green-50 p-4 rounded text-center">
                        <div class="text-2xl font-bold text-green-600">1,234</div>
                        <div class="text-sm text-gray-600">Active Today</div>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded text-center">
                        <div class="text-2xl font-bold text-yellow-600">156</div>
                        <div class="text-sm text-gray-600">New This Week</div>
                    </div>
                    <div class="bg-purple-50 p-4 rounded text-center">
                        <div class="text-2xl font-bold text-purple-600">89%</div>
                        <div class="text-sm text-gray-600">Retention</div>
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="flex gap-4 mb-6">
                    <div class="flex-1">
                        <input type="text" class="form-input" placeholder="Search users by name, email...">
                    </div>
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                    </select>
                    <select class="form-select">
                        <option>All Plans</option>
                        <option>Free</option>
                        <option>Premium</option>
                        <option>Enterprise</option>
                    </select>
                    <button class="btn btn-primary">
                        <i class="fas fa-download mr-2"></i> Export
                    </button>
                </div>

                <!-- User Table -->
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-3 px-4">User</th>
                                <th class="text-left py-3 px-4">Email</th>
                                <th class="text-left py-3 px-4">Status</th>
                                <th class="text-left py-3 px-4">Plan</th>
                                <th class="text-left py-3 px-4">Progress</th>
                                <th class="text-left py-3 px-4">Joined</th>
                                <th class="text-left py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <div class="font-medium">John Doe</div>
                                            <div class="text-sm text-gray-500">ID: #USR001</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-4">john.doe@example.com</td>
                                <td class="py-3 px-4">
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                                </td>
                                <td class="py-3 px-4">
                                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Premium</span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-24 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">75%</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4">Jan 15, 2024</td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="text-blue-600 hover:text-blue-800" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="text-green-600 hover:text-green-800" title="Message">
                                            <i class="fas fa-envelope"></i>
                                        </button>
                                        <button class="text-yellow-600 hover:text-yellow-800" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-800" title="Suspend">
                                            <i class="fas fa-ban"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-b hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            SC
                                        </div>
                                        <div>
                                            <div class="font-medium">Sarah Chen</div>
                                            <div class="text-sm text-gray-500">ID: #USR002</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-4">sarah.chen@example.com</td>
                                <td class="py-3 px-4">
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                                </td>
                                <td class="py-3 px-4">
                                    <span class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Free</span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex items-center gap-2">
                                        <div class="w-24 bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: 45%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">45%</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4">Jan 20, 2024</td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="text-blue-600 hover:text-blue-800" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="text-green-600 hover:text-green-800" title="Message">
                                            <i class="fas fa-envelope"></i>
                                        </button>
                                        <button class="text-yellow-600 hover:text-yellow-800" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="text-red-600 hover:text-red-800" title="Suspend">
                                            <i class="fas fa-ban"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.showModal(content, 'User Management');
    }

    // Analytics
    showAnalytics() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">Analytics Dashboard</h3>
                
                <!-- Date Range Selector -->
                <div class="flex gap-4 mb-6">
                    <select class="form-select">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Last year</option>
                        <option>Custom range</option>
                    </select>
                    <button class="btn btn-primary">
                        <i class="fas fa-sync mr-2"></i> Refresh Data
                    </button>
                </div>

                <!-- Key Metrics -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white border rounded-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">User Growth</span>
                            <i class="fas fa-users text-blue-600"></i>
                        </div>
                        <div class="text-2xl font-bold">+18.5%</div>
                        <div class="text-sm text-gray-500">vs last period</div>
                        <div class="mt-2 text-xs text-green-600">↑ 3.2% improvement</div>
                    </div>
                    
                    <div class="bg-white border rounded-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">Engagement Rate</span>
                            <i class="fas fa-chart-line text-green-600"></i>
                        </div>
                        <div class="text-2xl font-bold">72.3%</div>
                        <div class="text-sm text-gray-500">active users</div>
                        <div class="mt-2 text-xs text-green-600">↑ 5.1% improvement</div>
                    </div>
                    
                    <div class="bg-white border rounded-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">Completion Rate</span>
                            <i class="fas fa-graduation-cap text-purple-600"></i>
                        </div>
                        <div class="text-2xl font-bold">68.9%</div>
                        <div class="text-sm text-gray-500">project completion</div>
                        <div class="mt-2 text-xs text-red-600">↓ 1.2% decline</div>
                    </div>
                    
                    <div class="bg-white border rounded-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-gray-600">Job Placements</span>
                            <i class="fas fa-briefcase text-orange-600"></i>
                        </div>
                        <div class="text-2xl font-bold">156</div>
                        <div class="text-sm text-gray-500">this month</div>
                        <div class="mt-2 text-xs text-green-600">↑ 12 new placements</div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-4">User Activity Trends</h4>
                        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
                            <div class="text-center text-gray-500">
                                <i class="fas fa-chart-area text-4xl mb-2"></i>
                                <p>Chart visualization would be implemented here</p>
                                <p class="text-sm">Daily active users over time</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-4">Course Completion Distribution</h4>
                        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
                            <div class="text-center text-gray-500">
                                <i class="fas fa-chart-pie text-4xl mb-2"></i>
                                <p>Pie chart would be implemented here</p>
                                <p class="text-sm">Completion by course category</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top Performing Content -->
                <div class="bg-white border rounded-lg p-6">
                    <h4 class="font-semibold mb-4">Top Performing Content</h4>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2">Content Title</th>
                                    <th class="text-left py-2">Users</th>
                                    <th class="text-left py-2">Completion</th>
                                    <th class="text-left py-2">Rating</th>
                                    <th class="text-left py-2">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b">
                                    <td class="py-2">Data Analyst Assessment</td>
                                    <td class="py-2">1,234</td>
                                    <td class="py-2">89.2%</td>
                                    <td class="py-2">4.8</td>
                                    <td class="py-2">$12,340</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-2">Python Basics Course</td>
                                    <td class="py-2">987</td>
                                    <td class="py-2">76.5%</td>
                                    <td class="py-2">4.6</td>
                                    <td class="py-2">$8,900</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="py-2">Web Development Project</td>
                                    <td class="py-2">654</td>
                                    <td class="py-2">82.1%</td>
                                    <td class="py-2">4.7</td>
                                    <td class="py-2">$7,200</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.showModal(content, 'Analytics Dashboard');
    }

    // Settings
    showSettings() {
        const content = `
            <div>
                <h3 class="text-2xl font-bold mb-6">System Settings</h3>
                
                <!-- Settings Tabs -->
                <div class="border-b mb-6">
                    <div class="flex space-x-6">
                        <button onclick="adminDashboard.showSettingsTab('general')" class="pb-2 border-b-2 border-blue-600 font-medium text-blue-600">
                            General
                        </button>
                        <button onclick="adminDashboard.showSettingsTab('ml')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            ML Models
                        </button>
                        <button onclick="adminDashboard.showSettingsTab('notifications')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            Notifications
                        </button>
                        <button onclick="adminDashboard.showSettingsTab('security')" class="pb-2 border-b-2 border-transparent hover:border-gray-300 font-medium">
                            Security
                        </button>
                    </div>
                </div>

                <!-- General Settings -->
                <div id="general-settings">
                    <div class="space-y-6">
                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="font-semibold mb-4">Platform Configuration</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="form-group">
                                    <label class="form-label">Platform Name</label>
                                    <input type="text" class="form-input" value="CB-AI Platform">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Default Language</label>
                                    <select class="form-select">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                        <option>Hindi</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Timezone</label>
                                    <select class="form-select">
                                        <option>UTC-5 (Eastern)</option>
                                        <option>UTC-6 (Central)</option>
                                        <option>UTC-7 (Mountain)</option>
                                        <option>UTC-8 (Pacific)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Currency</label>
                                    <select class="form-select">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>INR (₹)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-6 rounded-lg">
                            <h4 class="font-semibold mb-4">Maintenance Mode</h4>
                            <div class="flex items-center gap-4">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2">
                                    <span>Enable Maintenance Mode</span>
                                </label>
                                <div class="text-sm text-gray-600">
                                    (This will disable user access to the platform)
                                </div>
                            </div>
                            <div class="mt-4">
                                <label class="form-label">Maintenance Message</label>
                                <textarea class="form-textarea" rows="3" placeholder="Message to display during maintenance..."></textarea>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <button onclick="adminDashboard.saveSettings()" class="btn btn-primary">
                                <i class="fas fa-save mr-2"></i> Save Changes
                            </button>
                            <button onclick="adminDashboard.closeModal()" class="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal(content, 'System Settings');
    }

    showSettingsTab(tab) {
        // Update tab styling
        const tabs = document.querySelectorAll('.border-b button');
        tabs.forEach(t => {
            t.classList.remove('border-blue-600', 'text-blue-600');
            t.classList.add('border-transparent');
        });
        event.target.classList.add('border-blue-600', 'text-blue-600');
        event.target.classList.remove('border-transparent');
        
        this.showNotification(`Loading ${tab} settings...`, 'info');
    }

    // Quick Action Methods
    createAnnouncement() {
        const content = `
            <div>
                <h3 class="text-xl font-bold mb-6">Create Announcement</h3>
                <form class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-input" placeholder="Announcement title...">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-textarea" rows="6" placeholder="Write your announcement message..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target Audience</label>
                        <select class="form-select">
                            <option>All Users</option>
                            <option>Active Users Only</option>
                            <option>Premium Users</option>
                            <option>New Users (Last 30 days)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            <span>Send email notification</span>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Schedule</label>
                        <input type="datetime-local" class="form-input">
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="adminDashboard.sendAnnouncement()" class="btn btn-primary">
                            <i class="fas fa-paper-plane mr-2"></i> Send Announcement
                        </button>
                        <button type="button" onclick="adminDashboard.closeModal()" class="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        this.showModal(content, 'Create Announcement');
    }

    sendAnnouncement() {
        this.showNotification('Announcement sent successfully!', 'success');
        this.closeModal();
    }

    saveSettings() {
        this.showNotification('Settings saved successfully!', 'success');
    }

    viewReports() {
        this.showNotification('Generating reports...', 'info');
    }

    systemSettings() {
        this.showSettings();
    }

    manageUsers() {
        this.showUserManagement();
    }

    // Utility Methods
    updateSystemMetrics() {
        // Simulate real-time metric updates
        const metrics = ['users', 'activeLearners', 'projectsCompleted', 'jobPlacements'];
        metrics.forEach(metric => {
            const change = Math.random() > 0.5 ? 1 : -1;
            const variation = Math.floor(Math.random() * 5) * change;
            this.systemData[metric] = Math.max(0, this.systemData[metric] + variation);
        });
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

// Initialize Admin Dashboard
const adminDashboard = new AdminDashboard();

// Global functions for HTML onclick handlers
window.adminDashboard = adminDashboard;
window.showUserManagement = () => adminDashboard.showUserManagement();
window.showContentManagement = () => adminDashboard.showContentManagement();
window.showAnalytics = () => adminDashboard.showAnalytics();
window.showSettings = () => adminDashboard.showSettings();
window.createAnnouncement = () => adminDashboard.createAnnouncement();
window.manageUsers = () => adminDashboard.manageUsers();
window.viewReports = () => adminDashboard.viewReports();
window.systemSettings = () => adminDashboard.systemSettings();