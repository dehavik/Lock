const clientId = '17db1aab-b6e3-4156-86b6-ee24be24dcca';
const redirectUri = window.location.origin + '/MicrosoftKeeoSync/auth.html';

document.getElementById('login-button').onclick = () => {
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=User.Read.All`;
    window.location.href = authUrl;
};

async function fetchUsers(token) {
    const response = await fetch('https://graph.microsoft.com/v1.0/users', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    const userList = document.getElementById('user-list');
    data.value.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.displayName;
        userList.appendChild(li);
    });
}
