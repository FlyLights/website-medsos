let isLoggedIn = false;

function showContent(contentType) {
    // Hide all content areas
    const contents = document.querySelectorAll('.content-area');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all boxes
    const boxes = document.querySelectorAll('.flow-box');
    boxes.forEach(box => box.classList.remove('active'));

    // Show selected content and highlight box
    document.getElementById(contentType + 'Content').classList.add('active');
    document.getElementById(contentType + 'Box').classList.add('active');

    // Check if user needs to login first
    if (contentType !== 'login' && !isLoggedIn) {
        alert('Silakan login terlebih dahulu!');
        showContent('login');
        return;
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        isLoggedIn = true;
        alert('Login berhasil! Selamat datang ' + username);
        showContent('feed');
    } else {
        alert('Mohon isi username dan password!');
    }
}

function showFlowchart() {
    // Hide all content areas
    const contents = document.querySelectorAll('.content-area');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from all boxes
    const boxes = document.querySelectorAll('.flow-box');
    boxes.forEach(box => box.classList.remove('active'));

    // Show login content as default
    document.getElementById('loginContent').classList.add('active');
    document.getElementById('loginBox').classList.add('active');
}

function performSearch(query) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (query.trim() === '') {
        resultsDiv.innerHTML = `
            <div class="post-item">
                <h4>Hasil Pencarian</h4>
                <p>Ketik kata kunci di kotak pencarian untuk mulai mencari.</p>
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = `
        <div class="post-item">
            <h4>Mencari: "${query}"</h4>
            <p>Menampilkan hasil untuk pencarian "${query}"...</p>
        </div>
        <div class="post-item">
            <h4>@user_${query}</h4>
            <p>Profil pengguna yang mengandung kata "${query}"</p>
        </div>
        <div class="post-item">
            <h4>Post tentang ${query}</h4>
            <p>Ini adalah contoh post yang mengandung kata kunci "${query}" yang Anda cari.</p>
        </div>
    `;
}

function uploadPost() {
    const textarea = document.querySelector('#uploadContent textarea');
    const fileInput = document.querySelector('#uploadContent input[type="file"]');
    
    if (textarea.value.trim() || fileInput.files.length > 0) {
        alert('Post berhasil diupload! 🎉');
        textarea.value = '';
        fileInput.value = '';
    } else {
        alert('Mohon tulis sesuatu atau pilih file untuk diupload!');
    }
}

function logout() {
    isLoggedIn = false;
    showContent('login');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    alert('Anda telah logout!');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showContent('login');
    
    // Add Enter key listener for login form
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });
    
    // Add drag and drop functionality to upload area
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.background = '#e8f5e8';
            this.style.borderColor = '#2e7d2e';
        });
        
        uploadArea.addEventListener('dragleave', function() {
            this.style.background = '#f9fff9';
            this.style.borderColor = '#4CAF50';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '#f9fff9';
            this.style.borderColor = '#4CAF50';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                alert(`${files.length} file(s) siap diupload!`);
            }
        });
    }
});