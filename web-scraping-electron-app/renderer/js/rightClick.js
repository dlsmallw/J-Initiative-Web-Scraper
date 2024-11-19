//const ipcRenderer = window.electronAPI;


function highlightBtnPressed() {
  console.log("test");
  //console.log(getSelectionText());
  //alert("Test!");

  
  ipcRenderer.send('show-context-menu');
  console.log("test-2");
}

// On call, retrieves whatever text the user has highlighted.
function getSelectionText() {
    let text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }

    return text;
}


document.addEventListener('contextmenu', function(event) {
  // Prevent the default context menu from appearing
  //event.preventDefault();

  // Do something here, e.g., display a custom context menu
  highlightBtnPressed();
});