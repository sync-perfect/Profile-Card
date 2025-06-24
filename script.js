function getGithubProfile(){
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');

    if(!username){
        alert("Please enter github username");
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if(!response.ok){
                throw new error('User not found');
            }
            return response.json;
        })
        .then(data => {
            const profileHTML = `
            <img src="${data.avatar_url}" alt="${data.login}">
            <h2>${data.name || data.login}</h2>
            <p>Bio: ${data.bio || "Not available"}</p>
            <p>Public Repos: ${data.public_repos}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <a href="${data.html_url}" target="_blank">View Profile</a>`;
            profileDiv.innerHTML = profileHTML;
        })
        .catch(error => {
            profileDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
        
}