// ===================================
// VKVV HOSPITAL - DOCTOR DASHBOARD
// ===================================

const stats = {
    today: 8,
    patients: 245,
    pending: 3,
    completed: 5
};

const schedule = [
    { patient: 'Rahul Joshi', time: '10:00 AM', reason: 'Routine Checkup' },
    { patient: 'Priya Mehta', time: '11:30 AM', reason: 'Follow-up Visit' },
    { patient: 'Amit Patil', time: '01:00 PM', reason: 'Chest Pain' },
    { patient: 'Sneha Kale', time: '03:00 PM', reason: 'Blood Pressure' },
    { patient: 'Vishal Pawar', time: '04:30 PM', reason: 'Diabetes Review' }
];

const patients = [
    { name: 'Rahul Joshi', age: 45, condition: 'Hypertension', lastVisit: '2025-01-15', status: 'active' },
    { name: 'Priya Mehta', age: 32, condition: 'Migraine', lastVisit: '2025-01-18', status: 'active' },
    { name: 'Amit Patil', age: 58, condition: 'Diabetes', lastVisit: '2025-01-10', status: 'active' },
    { name: 'Sneha Kale', age: 28, condition: 'Anxiety', lastVisit: '2025-01-19', status: 'pending' }
];

const activities = [
    { icon: 'fa-calendar-plus', color: 'green', title: 'New Appointment', desc: 'Rahul Joshi - 10 AM', time: '5 mins ago' },
    { icon: 'fa-file-medical', color: '', title: 'Lab Report Ready', desc: 'Priya Mehta - Blood Test', time: '20 mins ago' },
    { icon: 'fa-prescription', color: 'orange', title: 'Prescription Approved', desc: 'Amit Patil - Refill', time: '1 hour ago' },
    { icon: 'fa-comment-medical', color: 'pink', title: 'New Message', desc: 'From Sneha Kale', time: '2 hours ago' }
];

document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    loadSchedule();
    loadPatients();
    loadActivities();
    setCurrentDate();
    setupSidebar();
    setupLogout();
    setUserName();
});

function animateStats() {
    animateValue('todayAppointments', 0, stats.today, 1500);
    animateValue('totalPatients', 0, stats.patients, 2000);
    animateValue('pendingApt', 0, stats.pending, 1500);
    animateValue('completedApt', 0, stats.completed, 1500);
}

function animateValue(id, start, end, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = Math.floor(current);
    }, 16);
}

function loadSchedule() {
    const list = document.getElementById('scheduleList');
    if (!list) return;
    list.innerHTML = schedule.map(apt => `
        <div class="appointment-card">
            <div class="apt-header">
                <h4>${apt.patient}</h4>
                <span class="apt-time">${apt.time}</span>
            </div>
            <p><i class="fas fa-stethoscope"></i> ${apt.reason}</p>
        </div>
    `).join('');
}

function loadPatients() {
    const table = document.getElementById('patientsTable');
    if (!table) return;
    table.innerHTML = patients.map(p => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${p.name[0]}</div>
                    <span>${p.name}</span>
                </div>
            </td>
            <td>${p.age}</td>
            <td>${p.condition}</td>
            <td>${formatDate(p.lastVisit)}</td>
            <td><span class="status-badge status-${p.status}">${p.status.toUpperCase()}</span></td>
            <td>
                <button class="action-btn"><i class="fas fa-eye"></i></button>
                <button class="action-btn"><i class="fas fa-prescription"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadActivities() {
    const list = document.getElementById('activityList');
    if (!list) return;
    list.innerHTML = activities.map(act => `
        <li class="activity-item">
            <div class="activity-icon ${act.color}"><i class="fas ${act.icon}"></i></div>
            <div class="activity-content">
                <h4>${act.title}</h4>
                <p>${act.desc}</p>
                <span class="time">${act.time}</span>
            </div>
        </li>
    `).join('');
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function setCurrentDate() {
    const el = document.getElementById('currentDate');
    if (el) el.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function setUserName() {
    const email = sessionStorage.getItem('userEmail');
    if (email) document.getElementById('userName').textContent = 'Dr. ' + email.split('@')[0].toUpperCase();
}

function setupSidebar() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    const toggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) toggle.addEventListener('click', () => sidebar.classList.toggle('active'));
}

function setupLogout() {
    const btn = document.getElementById('logoutBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
}

console.log('%c👨‍⚕️ Doctor Dashboard Loaded', 'color: #00b4d8; font-size: 16px; font-weight: bold;');