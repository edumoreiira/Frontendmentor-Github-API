const searchResult = document.querySelector("#search-user");
const searchBtn = document.querySelector("#search-btn");
const wrapper = document.querySelector(".profile-wrapper");

function getApi(username){
    return(fetch(`https://api.github.com/users/${username}`).then(async result =>{
        if(!result.ok){
            throw new Error(result.status);
        }

        var data = await result.json();
        console.log(data)
        return await data;
    }))
}

searchBtn.addEventListener("click", async ()=>{
    const username = searchResult.value;
    let data = await getApi("edumoreiira");
    console.log(data);
    wrapper.innerHTML = `
    <div class="profile-info">
    <div class="avatar">
        <img src="https://avatars.githubusercontent.com/u/96441062?v=4" alt="">
    </div>
    <div class="identifier">
        <div class="username-wrapper">
            <span class="name">The Octocat</span>
            <span class="user">
                <a href="google.com">@octocat</a>
            </span>
        </div>
        <span class="join-date">Joined 25 Jan 2011</span>
    </div>
    
    <div class="bio">
        <p>This profile has no bio</p>
    </div>

    <div class="user-info">
        <div class="repos">
            <span class="info-title repos-title">Repos</span>
            <span class="info-data repos-info">8</span>
        </div>
        <div class="followers">
            <span class="info-title followers-title">Followers</span>
            <span class="info-data followers-info">3938</span>
        </div>
        <div class="following">
            <div class="info-title following-title">Following</div>
            <span class="info-data following-info">9</span>
        </div>
    </div>
    
    <div class="social-info">
        <div class="location">
            <i class="fi fi-sr-marker"></i>
            <span>San Francisco</span>
        </div>
        <div class="twitter">
            <i class="fi fi-brands-twitter"></i>
            <span>Not Available</span>
        </div>
        <div class="github-link">
            <i class="fi fi-br-link-alt"></i>
            <span><a>https://github.blog</a></span>
        </div>
        <div class="enterprise">
            <i class="fi fi-ss-building"></i>
            <span>agithub</span>
        </div>
    </div>
    `
})






