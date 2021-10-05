document.addEventListener("DOMContentLoaded", () => {
    const mode = document.getElementById("mode");
    
    function changeColor() {
        const body = document.getElementById("body");
        const input = document.getElementById("input");
       
        input.classList.toggle("white");
        body.classList.toggle("dark-mode");
        mode.classList.toggle("light-hover");
    }

    function changeMode() {
        const modeImg = document.getElementById("mode-img");
        const modeName = document.getElementById("mode-name");
    
        if (modeImg.src.match("assets/icon-moon.svg")) {
            modeImg.src = "assets/icon-sun.svg";
            modeName.innerHTML = "light";
        }
        else {
            modeImg.src = "assets/icon-moon.svg";
            modeName.innerHTML = "dark";
        }
    }        

    // function changePlaceholderColor() {
    //     const input = document.getElementById("input");
    //     input.classList.toggle("white");
        
    // }

    mode.addEventListener("click", changeColor);
    mode.addEventListener("click", changeMode);
    // mode.addEventListener("click", changePlaceholderColor);


    function search() {
        let username = document.getElementById("input").value;
        getData(username);
    };

   
    const getData = (username) => {
        fetch('https://api.github.com/users/' + username)
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty("message")) {
                    document.getElementById("warning").style.display = "block";
                }

                if (!data.hasOwnProperty("message")) {
                    document.getElementById("warning").style.display = "none";
                    document.getElementById("image").src = data.avatar_url;

                    if (data.name == null) {
                        document.getElementById("name").innerHTML = "Name is not available";
                    }
                    else {
                        document.getElementById("name").innerHTML = data.name;
                    }
                    
                    document.getElementById("link").innerHTML = "@" + data.login;

                    if (data.bio == null) {
                        document.getElementById("bio").innerHTML = "This profile has no bio";
                        document.getElementById("bio").classList.add("bio-opacity");
                        document.getElementById("bio-tablet").innerHTML = "This profile has no bio";
                        document.getElementById("bio-tablet").classList.add("bio-opacity");
                    }
                    else { 
                        document.getElementById("bio").innerHTML = data.bio;
                        document.getElementById("bio").classList.remove("bio-opacity");
                        document.getElementById("bio-tablet").innerHTML = data.bio;
                        document.getElementById("bio-tablet").classList.remove("bio-opacity");
                    }

                    let d = new Date(data.created_at);
                    let datestring = d.getDate()  + " " + d.toLocaleString('en-us',{month:'short'})+ " " + d.getFullYear();
                    document.getElementById("date").innerHTML = datestring;
                
                    document.getElementById("repos").innerHTML = data.public_repos;
                    document.getElementById("followers").innerHTML = data.followers;
                    document.getElementById("following").innerHTML = data.following;

                    if (data.location == null) {
                        document.getElementById("location").innerHTML = "Not Available";
                        document.getElementById("location-img").classList.add("icon-opacity");
                        document.getElementById("location").classList.add("icon-opacity");
                    }
                    else {
                        document.getElementById("location").innerHTML = data.location;
                        document.getElementById("location-img").classList.remove("icon-opacity");
                        document.getElementById("location").classList.remove("icon-opacity");
                    }

                    if (data.blog == "") {
                        document.getElementById("website").innerHTML = "Not Available";
                        document.getElementById("website-img").classList.add("icon-opacity");
                        document.getElementById("website").classList.add("icon-opacity");
                    }
                    else {
                        document.getElementById("website").innerHTML = data.blog;
                        document.getElementById("website-img").classList.remove("icon-opacity");
                        document.getElementById("website").classList.remove("icon-opacity");
                    }

                    if (data.twitter_username == null) {
                        document.getElementById("twitter").innerHTML = "Not Available";
                        document.getElementById("twitter-img").classList.add("icon-opacity");
                        document.getElementById("twitter").classList.add("icon-opacity");
                    }
                    else {
                        document.getElementById("twitter").innerHTML = data.twitter_username;
                        document.getElementById("twitter-img").classList.remove("icon-opacity");
                        document.getElementById("twitter").classList.remove("icon-opacity");
                    }

                    if (data.company == null) {
                        document.getElementById("company").innerHTML = "Not Available";
                        document.getElementById("company-img").classList.add("icon-opacity");
                        document.getElementById("company").classList.add("icon-opacity");
                    }
                    else {
                        document.getElementById("company").innerHTML = data.company;
                        document.getElementById("company-img").classList.remove("icon-opacity");
                        document.getElementById("company").classList.remove("icon-opacity");
                    }
                    
                }
            });
        }

        document.getElementById("btn").addEventListener("click", search);

        window.addEventListener("load",(event)=>{
            getData("octocat");
        });
                
});