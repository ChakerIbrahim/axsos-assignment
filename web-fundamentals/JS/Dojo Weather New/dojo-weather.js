function showalert(){
    alert('Loading weather report...')
}
function disappear(){
    var doc =document.querySelector('.cookies');
    doc.remove();
}
function changeTemp(tempUnit){
      console.log(tempUnit);
   var tempretures=document.querySelectorAll(".temp");
   console.log(tempretures);
   for(var i=0;i<tempretures.length;i++){
      if(tempUnit=="C"){
         var change= parseInt(tempretures[i].innerText); 
         change=(change-32)*5/9;
         console.log(change);
         tempretures[i].innerText=Math.floor(change);
         
      }
      else{
         var change= parseInt(tempretures[i].innerText); 
         change=(change*9/5)+32;
         console.log(change);
         tempretures[i].innerText=Math.floor(change);
      }
      
   }
}

