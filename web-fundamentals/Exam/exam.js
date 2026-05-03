// function for changing background image and button background and text color
function changeBackground() {
  var img = document.getElementById("mainImage");
  document.getElementById("mainImage").style.backgroundImage =
    "url('Static/content/Yoga-Pastel-Sun.webp')";
  var item = document.getElementById("my_Element");
  item.style.backgroundColor = "Blue";
  item.style.color = "purple";
}
// function for playing sound
function playHelloSound() {
  const sound = document.getElementById("hello_Sound");
  sound.play();
}
// function for showing alert
function showAlert() {
  const searchBtn = document.getElementById("search_Btn");
  const searchInput = document.getElementById("search_Input");

  searchBtn.addEventListener("click", () => {
    // Get the value from the input field
    const searchText = searchInput.value;

    // Alert the value
    if (searchText.trim() !== "") {
      alert("Searching for: " + searchText);
    } else {
      alert("Please enter text in the search box.");
    }
  });
}
