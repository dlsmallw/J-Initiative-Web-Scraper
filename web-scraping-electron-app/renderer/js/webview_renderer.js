const ipcRenderer = window.urlScrape;

let menuVisible = false;

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
    menu.style.left = "100px";
    menu.style.top = "100px";

    var textNode = document.createTextNode("Import");
    menu.appendChild(textNode);

    document.body.appendChild(menu);
}

function createTopLayer() {
    var layer = document.createElement('div');
    layer.id = "topmostLayer";
    layer.style.zIndex = 999;
    layer.style.position = "absolute";
    layer.style.display = "block";
    layer.style.width = window.innerWidth + "px";
    layer.style.height = window.innerHeight + "px";

    layer.style.backgroundColor = "#ff0000";
    layer.style.opacity = 0.2;

    document.addEventListener('click', function(event) {
        catchClick(event);
    });
    layer.addEventListener('contextmenu', function(event) {
        catchRightClick(event);
    });
    //layer.addEventListener('contextmenu', catchRightClick(event));
    document.body.appendChild(layer);
}

function catchRightClick(event) {
    showMenu(event);
}

function catchClick(event) {
    //alert("catch click: " + event.srcElement);
    //console.log("caught a click. Menu visible: " + menuVisible);
    var menu = document.getElementById("importedRightClickMenu");
    // check if the click was in the expected region of the menu.
    const menuDims = menu.getBoundingClientRect();

    if(menuVisible) {
        //console.log("Menu is visible");
        if((event.pageX >= menuDims.left) && (event.pageX <= menuDims.right) &&
        (event.pageY >= menuDims.top) && (event.pageY <= menuDims.bottom)) {
            importText();
            console.log("imported");
        }
        else {
            hideMenu();
            console.log("hidden");
        }
    }
    else {
        getItemAtClick(event);
    }
    
}

function importText() {
    webview.send('getSelected');
}

function showMenu(event) {
    var menu = document.getElementById("importedRightClickMenu");
    menu.style.display = "block";

    menu.style.top = (event.pageY - 10) + 'px';
    menu.style.left = (event.pageX  - 10) + 'px';

    menuVisible = true;
}

function hideMenu() {
    var menu = document.getElementById("importedRightClickMenu");
    menu.style.display = "none";
    menuVisible = false;
    
}

function hideFrame() {
    const layer = document.getElementById("topmostLayer");
    if(layer === null) {

    }
    else {
        layer.style.display = "none";
        layer.width = "0px";
        layer.height = "0px";
    }
    
}

function unhideFrame() {
    const layer = document.getElementById("topmostLayer");
    if(layer === null) {

    }
    else {   
        layer.style.display = "block";
        layer.style.width = window.innerWidth + "px";
        layer.style.height = window.innerHeight + "px";
    }
}

function getItemAtClick(event) {
    let yPos = event.pageY;
    let xPos = event.pageX;
    console.log("Positions: " + xPos + ", " + yPos);
    hideFrame();

    if((xPos > window.innerWidth) || (xPos < 0) || (yPos > window.innerHeight) || (yPos < 0)) {
        // do nothing, because the click is outside boundaries
    }
    else {
        if(!isFinite(xPos) || !isFinite(yPos)) {

        }
        else {
            let elem = document.elementFromPoint(xPos,yPos);
            console.log(Object.getOwnPropertyNames(elem));
            let text = elem.textContent;

            $('#imported_textarea').val(text);
            console.log("grabbed: " + text);    
        }
        
    }
    //unhideFrame();

    
}


document.addEventListener('DOMContentLoaded', () => {
    
    createRightClickMenu();
    createTopLayer();

    ipcRenderer.receive('setUrl', (url) => {
        $('#ext-url-window').attr('src', url);


        //document.getElementById('ext-url-window').addEventListener('click', catchClick(event));

        //alert("added");

    });

    var webview = document.getElementById('ext-url-window');
    //webview.executeJavaScript("alert('test');");
    //webview.getSettings().setJavaScriptEnabled(true);

    webview.contentWindow.addEventListener('click', catchClick(event));


    $('#importSelectedBtn').on('click', () => {
        webview.send('getSelected');

        //document.getElementById('ext-url-window').addEventListener('click', catchClick(event));
        //alert("add");
    });

    webview.addEventListener('ipc-message', function(event, selection) {
        $('#imported_textarea').val(event.args[0]);
        //document.getElementById('ext-url-window').addEventListener('click', catchClick(event));
        //alert("added");
    });

    //document.addEventListener('click', () => {alert("click")});

    /*
    document.getElementById('ext-url-window').contentWindow.addEventListener('contextmenu', function(event) {
        //alert("test");
        // Prevent the default context menu from appearing
        //  event.preventDefault();
        //webview.console.log("Test");
        showMenu(event);
        console.log("click");
    });
    */

    //document.addEventListener('click', catchClick(event));
    /*
    document.getElementById('ext-url-window').contentWindow.addEventListener('click', function(event) {
        //alert("test");
        //console.log(document.getElementById('ext-url-window').contentWindow.constructor.name);
        //document.getElementById('ext-url-window')
        //var t = Object.getOwnPropertyNames(document.getElementById('ext-url-window').contentWindow);
        //console.log(t.toString());
        //webview.console.log("click");
        //console.log("click");
        
        //catchClick(event);

    });*/
});