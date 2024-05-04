const searchResult = document.querySelector("#search-user");
const searchBtn = document.querySelector("#search-btn");
const wrapper = document.querySelector(".profile-wrapper");

function getApi(username){
    return(fetch(`https://api.github.com/users/${username}`).then(async result =>{
        if(!result.ok){
            wrapper.dataset.isloading = "no"
            throw new Error(result.status);
        }
        var data = await result.json();

        setTimeout(function(){
            wrapper.dataset.isloading = "no";
        },100)

        return await data;
    }))
}

searchBtn.addEventListener("click", async ()=>{
    const username = searchResult.value;
    wrapper.dataset.isloading = "yes";
    
    let data = await getApi(username);
    wrapper.innerHTML = `
    <div class="profile-info">
    <div class="avatar">
        <img src="${data.avatar_url}" alt="">
    </div>
    <div class="identifier">
        <div class="username-wrapper">
            <span class="name">${data.name ? data.name : data.login}</span>
            <span class="user">
                <a href="${data.html_url}">@${data.login}</a>
            </span>
        </div>
        <span class="join-date">Joined ${Intl.DateTimeFormat('en-US',{dateStyle: "medium"}).format(new Date(data.created_at))}</span>
    </div>
    
    <div class="bio">
        ${data.bio ? `<p style="color:#f1f1f1 !important;">${data.bio}</p>` :
        `<p style="color: gray !important;">This profile has no bio</p>`}
    </div>

    <div class="user-info">
        <div class="repos">
            <span class="info-title repos-title">Repos</span>
            <span class="info-data repos-info">${data.public_repos}</span>
        </div>
        <div class="followers">
            <span class="info-title followers-title">Followers</span>
            <span class="info-data followers-info">${data.followers}</span>
        </div>
        <div class="following">
            <div class="info-title following-title">Following</div>
            <span class="info-data following-info">${data.following}</span>
        </div>
    </div>
    
    <div class="social-info">
        ${data.location ? `
        <div class="location">
            <i class="fi fi-sr-marker"></i>
            <span>${data.location}</span>
        </div>`
        :
        `<div class="location" style="color: gray !important;">
        <i class="fi fi-sr-marker"></i>
        <span>Not Available</span>
        </div>`}

        <div class="twitter" ${data.twitter_username ? "" : 'style="color: gray;"'}>
            <i class="fi fi-brands-twitter"></i>
            <span>${data.twitter_username ? data.twitter_username : "Not Available"}</span>
        </div>
        <div class="github-link" ${data.blog ? "" : 'style="color: gray;"'}>
            <i class="fi fi-br-link-alt"></i>
            <span><a>${data.blog == "" ? "Not Available" : data.blog}</a></span>
        </div>
        <div class="enterprise" ${data.company ? "" : 'style="color: gray;"'}>
            <i class="fi fi-ss-building"></i>
            <span>${data.company ? data.company : "Not Available"}</span>
        </div>
    </div>
    `
    wrapper.dataset.iscalled = "yes";
})






