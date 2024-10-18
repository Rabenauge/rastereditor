//zoomLevel
var zoomLevel = 1;
var maxZoom = 6;
//canvas
var cvs;
//ctx
var C;
//area in html for canvas
var targetE;
//start colors
var initColor = 0x000000;
var selectedColor=0xffffff;
var flashColor = 0;
//keyflag to avoid multiple key check
var keyDown = false;
//store imgData here
var imgData;
// lines 
var lineArr = new Array();
//fps for animation requestg
FPS = 25;
//animate flag 
animateFlag = true;

function initCvsAndCtx(){
    cvs = D.createElement('canvas');
    cvs.width = W*zoomLevel;
    cvs.height = H*zoomLevel;
    cvs.setAttribute('id','rastercanvas');
    C = cvs.getContext("2d")
    //area in html for canvas
    var targetE = D.getElementById('area');
    targetE.appendChild(cvs);
}

function init(){
    //cvs and ctx
    initCvsAndCtx();
    //prefill Linearr 
    lineArr = newFilledArray(cvs.height, initColor);
    //init shit
    setActiveColorBox(selectedColor);
    //init cursor
    cursor.initCursor(selectedColor,initColor,C,cvs);
    //create imgData
    createImageData(cvs,C);
    //introduce our events
    window.addEventListener("keydown", getChar, false);
    window.addEventListener("keyup", resetkeyDown, false);
    //start
    main();
}


function main(){
    setTimeout(function() {
        if(animateFlag == true){
            cursor.blink();    
            //TODO ANIMATE
        }
		requestAnimationFrame(main);
	}, 1000 / FPS); 
}