// Extract token from URL
const hash = window.location.hash;
const token = new URLSearchParams(hash.replace('#', '?')).get('access_token');

// Save token and redirect back to index.html
if (token) {
    localStorage.setItem('graph_token', token);
    window.location.href = './index.html';
} else {
    console.error('Authentication failed');
}
