const ipcRenderer = window.urlScrape;
/*
function createRightClickMenu() {
    
    var menu = document.createElement('div');
    menu.id = "importedRightClickMenu";
    menu.style.zIndex = 1000;
    menu.style.position = "absolute";
    menu.style.display = "none";
    menu.style.border = "1px solid black";
    menu.style.borderRadius = "4px";
    menu.style.padding = "2px";
    menu.style.margin = "0px";
    menu.style.listStyleType = "none";
    menu.style.listStyle = "none";
    menu.style.cursor = "pointer";

    var textNode = document.createTextNode("Import");
    menu.appendChild(textNode);

    document.body.appendChild(menu);
    

}

function importText() {
    webview.send('getSelected');
}

function showMenu(event) {
    var menu = document.getElementById("importedRightClickMenu");
    menu.style.display = "block";

    menu.style.top = (event.pageY - 10) + 'px';
    menu.style.left = (event.pageX  - 10) + 'px';
}

function hideMenu() {
    var menu = document.getElementById("importedRightClickMenu");
    menu.style.display = "none";
}

*/

document.addEventListener('DOMContentLoaded', () => {
    
    createRightClickMenu();

    ipcRenderer.receive('setUrl', (url) => {
        $('#ext-url-window').attr('src', url);
    });

    var webview = document.getElementById('ext-url-window');

    $('#importSelectedBtn').on('click', () => {
        webview.send('getSelected');
    });
    /*
    webview.addEventListener('contextmenu', function(event) {
        // Prevent the default context menu from appearing
        event.preventDefault();

        showMenu(event);
    });

    webview.addEventListener(('click', function(event) => {
        var menu = document.getElementById("importedRightClickMenu");
        // check if the click was in the expected region of the menu.
        const menuDims = menu.getBoundingClientRect();
        if((event.pageX >= menuDims.left) && (event.pageX <= menuDims.right) &&
            (event.pageY >= menuDims.top) && (event.pageY <= menuDims.bottom)) {
            importText();

        }
        else {
            hideMenu();
        }

    });
    */
    webview.addEventListener('ipc-message', function(event, selection) {
        $('#imported_textarea').val(event.args[0]);
    });
});