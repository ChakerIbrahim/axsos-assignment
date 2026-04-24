
function enterText(){
    var yourname = document.querySelector(".name");
    yourname.innerHTML= prompt('type your name')
}
function sign(element){
    if(element.innerHTML == "Sign Out"){
        element.innerHTML= "Sign In"
    }
    else{
        element.innerHTML= "Sign Out"
    }
}
function accept(element){
    var increase =document.querySelector(".yourconnection");
    increase.innerHTML++;
    var decrease = document.querySelector(".connection");
    decrease.innerHTML--;
    var go = document.closest(".card-list-item");
    go.innerHTML= '';
}
function reject(){
        var decrease = document.querySelector(".connection");
    decrease.innerHTML--;
    var go = document.closest(".card-list-item");
    go.innerHTML= '';
}







console.log("page loaded...");