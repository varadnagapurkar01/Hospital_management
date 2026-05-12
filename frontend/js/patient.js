// ===================================
// VKVV HOSPITAL - PATIENT DASHBOARD
// ===================================

const stats = {
    upcoming: 2,
    prescriptions: 3,
    reports: 12,
    bills: 4500
};

const appointments = [
    { doctor: 'Dr. Rajesh Sharma', specialty: 'Cardiologist', date: '2025-01-25', time: '10:00 AM' },
    { doctor: 'Dr. Priya Patil', specialty: 'Neurologist', date: '2025-01-28', time: '02:30 PM' }
];

const prescriptions = [
    { icon: 'fa-pills', color: '', name: 'Amlodipine 5mg', desc: '1 tablet daily - BP', time: '30 days left' },
    { icon: 'fa-capsules', color: 'green', name: 'Metformin 500mg', desc: '2 tablets daily - Diabetes', time: '15 days left' },
    { icon: 'fa-prescription-bottle', color: 'orange', name: 'Vitamin D3', desc: '1 weekly - Deficiency', time: '60 days left' }
];

const history = [
    { date: '2025-01-15', doctor: 'Dr. Rajesh Sharma', diagnosis: 'Hypertension', treatment: 'Medication', status: 'completed' },
    { date: '2025-01-10', doctor: 'Dr. Priya Patil', diagnosis: 'Migraine', treatment: 'Consultation', status: 'completed' },
    { date: '2025-01-05', doctor: 'Dr. Amit Deshmukh', diagnosis: 'Knee Pain', treatment: 'Physiotherapy', status: 'active' },
    { date: '2024-12-28', doctor: 'Dr. Sneha Kulkarni', diagnosis: 'Routine Checkup', treatment: 'Health Check', status: 'completed' }
];

document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    loadAppointments();
    loadPrescriptions();
    loadHistory();
    setCurrentDate();
    setupSidebar();
    setupLogout();
    setUserName();
});

function animateStats() {
    animateValue('upcomingApt', 0, stats.upcoming, 1500);
    animateValue('activePresc', 0, stats.prescriptions, 1500);
    animateValue('totalReports', 0, stats.reports, 1500);
    animateValue('pendingBills', 0, stats.bills, 2000, true);
}

function animateValue(id, start, end, duration, isMoney = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) { current = end; clearInterval(timer); }
        el.textContent = isMoney ? '₹' + Math.floor(current).toLocaleString('en-IN') : Math.floor(current);
    }, 16);
}

function loadAppointments() {
    const list = document.getElementById('appointmentsList');
    if (!list) return;
    list.innerHTML = appointments.map(apt => `
        <div class="appointment-card">
            <div class="apt-header">
                <h4>${apt.doctor}</h4>
                <span class="apt-time">${apt.time}</span>
            </div>
            <p><i class="fas fa-stethoscope"></i> ${apt.specialty}</p>
            <p><i class="fas fa-calendar"></i> ${formatDate(apt.date)}</p>
        </div>
    `).join('');
}

function loadPrescriptions() {
    const list = document.getElementById('prescriptionList');
    if (!list) return;
    list.innerHTML = prescriptions.map(p => `
        <li class="activity-item">
            <div class="activity-icon ${p.color}"><i class="fas ${p.icon}"></i></div>
            <div class="activity-content">
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
                <span class="time">${p.time}</span>
            </div>
        </li>
    `).join('');
}

function loadHistory() {
    const table = document.getElementById('historyTable');
    if (!table) return;
    table.innerHTML = history.map(h => `
        <tr>
            <td>${formatDate(h.date)}</td>
            <td>${h.doctor}</td>
            <td>${h.diagnosis}</td>
            <td>${h.treatment}</td>
            <td><span class="status-badge status-${h.status}">${h.status.toUpperCase()}</span></td>
            <td>
                <button class="action-btn"><i class="fas fa-eye"></i></button>
                <button class="action-btn"><i class="fas fa-download"></i></button>
            </td>
        </tr>
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
    if (email) document.getElementById('userName').textContent = email.split('@')[0].toUpperCase();
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

console.log('%c🤒 Patient Dashboard Loaded', 'color: #ff6b35; font-size: 16px; font-weight: bold;');