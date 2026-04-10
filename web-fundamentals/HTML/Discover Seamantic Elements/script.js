console.log("page loaded...");

function changeText(){
    var doc =document.querySelector('.name')
    doc.innerHTML= 'Chaker Ibrahim';
}
function removeText(element){
    const item = element.closest('.card-list-item');
    item.innerHTML = "";

}
function connectionRequests(element){
    var doc1 =document.querySelector('#connect');
    var count= parseInt(doc1.innerHTML)
    count--;
    doc1.innerHTML=count;
    if (count <= 0) {
        doc1.style.display = 'none';
    }
}
function yourConnections(element){
    var doc2 =document.querySelector('#super');
    var count= parseInt(doc2.innerHTML)
    count++;
    doc2.innerHTML=count;
}