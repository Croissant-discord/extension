async function GetMethodJson(token, url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token, // Ensure this is your actual bot token
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data;
}

async function LoadSomeBox(profileData) {
    document.getElementById('ProfileUsername').innerText = profileData.username;
    document.getElementById("ProfileImg").src = `https://cdn.discordapp.com/avatars/${profileData.id}/${profileData.avatar}.webp?size=80`;
    document.querySelector('h1').style.top = '160px';
    document.getElementById('DoSomethingBox').style.top = '165px';
    document.getElementById("ProfileBox").style.visibility = "visible";
    document.getElementById("ButtonLogin").style.visibility = "visible";
    document.getElementById("ButtonCopy").style.visibility = "visible"
}

async function CopyToken(profileData) {
    navigator.clipboard.writeText(profileData)
}

document.getElementById('InputToken').addEventListener('input', async function() {
    const Token = this.value;
    if (Token) {
        const profileData = await GetMethodJson(Token, 'https://discord.com/api/v9/users/@me'); // Replace with actual API URL
        if (profileData) {
            LoadSomeBox(profileData);
            document.getElementById("ButtonCopy").addEventListener("click", function() {
                CopyToken(JSON.stringify(profileData));
            });
            document.getElementById("ButtonLogin").addEventListener("click", function() {
                window.open("https://discord.com?Croissant="+Token, "_blank");
            });
        } else {
            console.error('No data received from API');
        }
    } else {
        console.log('Token input is empty');
    }
});
