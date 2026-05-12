// ===================================
// VKVV HOSPITAL - LOGIN PAGE LOGIC
// ===================================

// Demo Credentials for each role
const credentials = {
    admin: {
        email: 'admin@vkvv.com',
        password: 'admin123',
        redirect: 'admin.html'
    },
    doctor: {
        email: 'doctor@vkvv.com',
        password: 'doctor123',
        redirect: 'doctor.html'
    },
    patient: {
        email: 'patient@vkvv.com',
        password: 'patient123',
        redirect: 'patient.html'
    }
};

let currentRole = 'admin';

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    setupRoleTabs();
    setupPasswordToggle();
    setupLoginForm();
    checkUrlRole();
});

// ===== CHECK URL FOR ROLE PARAMETER =====
function checkUrlRole() {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    if (role && credentials[role]) {
        switchRole(role);
    }
}

// ===== ROLE TAB SWITCHING =====
function setupRoleTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const role = tab.getAttribute('data-role');
            switchRole(role);
        });
    });
}

function switchRole(role) {
    currentRole = role;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-role') === role) {
            tab.classList.add('active');
        }
    });
    
    // Update role label in button
    const roleLabel = document.getElementById('roleLabel');
    if (roleLabel) {
        roleLabel.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    }
    
    // Update demo credentials
    const demoInfo = document.getElementById('demoInfo');
    if (demoInfo && credentials[role]) {
        demoInfo.innerHTML = `
            <span><strong>Email:</strong> ${credentials[role].email}</span>
            <span><strong>Password:</strong> ${credentials[role].password}</span>
        `;
    }
    
    // Clear form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// ===== PASSWORD SHOW/HIDE TOGGLE =====
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            const icon = toggleBtn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
}

// ===== LOGIN FORM HANDLING =====
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
}

function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const expected = credentials[currentRole];
    
    // Validation
    if (!email || !password) {
        showAlert('Please fill in all fields!', 'error');
        return;
    }
    
    // Check credentials
    if (email === expected.email && password === expected.password) {
        showAlert(`Welcome ${currentRole.toUpperCase()}! Redirecting...`, 'success');
        
        // Store login info in sessionStorage
        sessionStorage.setItem('userRole', currentRole);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Redirect after 1.5 seconds
        setTimeout(() => {
            window.location.href = expected.redirect;
        }, 1500);
    } else {
        showAlert('Invalid email or password! Try demo credentials.', 'error');
    }
}

// ===== ALERT MESSAGE =====
function showAlert(message, type) {
    // Remove existing alert
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) existingAlert.remove();
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert-message alert-${type}`;
    alert.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styling
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// ===== CONSOLE WELCOME =====
console.log('%c🔐 VKVV Hospital Login System Active', 
    'color: #00b4d8; font-size: 16px; font-weight: bold;');
console.log('%cDemo Credentials:', 'color: #ff6b35; font-weight: bold;');
console.table(credentials);