console.log("page loaded...");

function playVideo(video){
    video.play();
}
function pauseVideo(video){
    video.pause();
}
function subscribe(){
    alert("You subscribed")
}

function logOut(element){ 
    var btn = document.querySelector(".btn")
                   // ?
    if(btn.innerText == "Login"){
        console.log("nnnnnnnn")
        btn.innerText = 'Logout';
    }
    else{
        console.log("Test")
        btn.innerText="Login";
    }
}