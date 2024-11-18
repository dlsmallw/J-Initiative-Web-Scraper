function highlightBtnPressed() {
  console.log("test");
}


document.addEventListener('contextmenu', function(event) {
  // Prevent the default context menu from appearing
  //event.preventDefault();

  // Do something here, e.g., display a custom context menu
  highlightBtnPressed();
});