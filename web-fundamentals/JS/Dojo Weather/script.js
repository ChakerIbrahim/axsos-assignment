function removeText() {
   var input = document.querySelector('.cookies');
   input.style.display = 'none';
}
function changeToF() {
   const boxes = document.querySelectorAll(".redcolor");

   boxes.forEach((box) => {
   box.innerHTML='75';
});
}
changeToF();

function changeToF2() {
   const boxes = document.querySelectorAll(".bluecolor");

   boxes.forEach((box) => {
   box.innerHTML=80;
});
}
changeToF2();
