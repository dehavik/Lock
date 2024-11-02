const msalConfig = {
    auth: {
        clientId: "YOUR_CLIENT_ID",
        authority: "https://login.microsoftonline.com/YOUR_TENANT_ID",
        redirectUri: "http://localhost:5500", // or your production URL
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

async function signIn() {
    try {
        await msalInstance.loginPopup({
            scopes: ["User.Read.All"],
        });
        alert("Signed in successfully!");
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
        alert("Please sign in first.");
        return;
    }

    const accessTokenRequest = {
        scopes: ["User.Read.All"],
        account: account,
    };

    try {
        const accessTokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);
        const accessToken = accessTokenResponse.accessToken;

        // Fetch users from Microsoft Graph
        const response = await fetch("https://graph.microsoft.com/v1.0/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        displayUsers(data.value);
    } catch (error) {
        console.error(error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.displayName} (${user.mail || "No email"})`;
        userList.appendChild(li);
    });
}
