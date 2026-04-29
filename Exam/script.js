
// Function for changing background color 

function changeColor(element){
    element.style.backgroundColor='#3b4598';
}
function changeColor2(element){
    element.style.backgroundColor='blue';
}

// End of Function


// Function for changing Text and Img

function changeText(element){
    var item = document.querySelector('.midhead');
    var item2 = document.querySelector('.para');
    var item3 = document.querySelector('.changebtn');
    var img = document.getElementById('img2');

    if (item3.innerText === 'Make A Change') {
        item.innerText = 'what we do';
        item2.innerText = 'At our company,innovation drives everything we do. We specialize in leveraging cutting-edge technologies and strategic expertise to empower businesess to grow smarter and faster, From enhancing digital experiences and optimizing internal workflows to unlocking new revenue opportunities';
        item3.innerText = 'Change Back';
        img.src = 'Static/alt-features.png';

    } else {
        item.innerText = 'Who we are';
        item2.innerText = 'We are a forward-thinking company dedicatted to providing innovative solutions that fuel business growth. With a focus on modern technologies and strategic insights, we help businesess streamline their operations, enhance customer experiences, and scale efficientl. Whether you\'re looking to improve your digital presence, optimize processes, or drive new revenue streams';
        item3.innerText = 'Make A Change';
        img.src = 'Static/about.jpg';
    }
}

// End of function


// function add cards


function addService(element){
    var items4=document.getElementById("services")
    items4.innerHTML +='<div class="card"><img class="cardimg" src="Static/values-2.png" alt="values"> <p>We provide modern, technology-driven solutions tailored to help you adapt, compete, and thrive in a ever-evolving market.</p>';
}
// end of function