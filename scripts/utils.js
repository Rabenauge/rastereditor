// convert a hexidecimal color string to 0..255 R,G,B
function hexToRGB(hex){
    var r = hex >> 16;
    var g = hex >> 8 & 0xFF;
    var b = hex & 0xFF;
    return 'rgb(' + [r,g,b] + ')';
}

var invert = function (obj) {

  var new_obj = {};

  for (var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }

  return new_obj;
};

function RGBTohex(imgData){
    var r = imgData.data[0] < 17 ? '0' + imgData.data[0].toString(16) : imgData.data[0].toString(16);
    var g = imgData.data[1] < 17 ? '0' + imgData.data[1].toString(16) : imgData.data[1].toString(16);
    var b = imgData.data[2] < 17 ? '0' + imgData.data[2].toString(16) : imgData.data[2].toString(16);    
    return '0x' + r + g + b;
}

function toRGB(r, g, b) { return "#" + convert(r) + convert(g) + convert(b); }

function RGBValuesTohex(red, green, blue){
    var r = red < 17 ? '0' + red.toString(16) : red.toString(16);
    var g = green < 17 ? '0' + green.toString(16) : green.toString(16);
    var b = blue < 17 ? '0' + blue.toString(16) : blue.toString(16);    
    return '0x' + r + g + b;
}


function setActiveColorBox(color){
    box = document.getElementById('selected-color-box');
    box.setAttribute('style','background-color:' + hexToRGB(color) + ';');
}
//key management

function resetkeyDown(){
    keyDown = false;
}

// event.type must be keypress
function getChar(event) {
    event.preventDefault();
    var key = event.which || event.keyCode;
    console.log(key);
    if(keyDown == false){
        keyDown = true;
        switch(key){
            //space
            case 32:
                cursor.setLine(selectedColor, cursor.y);
                cursor.realColor = selectedColor;
            break; 
            //up 
            case  38:
                cursor.up();
            break;
            // down
            case 40:
                cursor.down();
            break;
            // 1
            case 49:
                selectedColor = palPepto['00'];
            break;
            // 2
            case 50:
                selectedColor = palPepto['01'];
            break;
            // 3
            case 51:
                selectedColor = palPepto['02'];
            break;
            //4
            case 52:
                selectedColor = palPepto['03'];
            break;
            //q
            case 81:
                selectedColor = palPepto['04'];
            break;
            //w
            case 87:
                selectedColor = palPepto['05'];
            break;        
            //e
            case 69:
                selectedColor = palPepto['06'];
            break;
            //r
            case 82:
                selectedColor = palPepto['07'];
            break;
            //a
            case 65:
                selectedColor = palPepto['08'];
            break; 
            //s
            case 83:
                selectedColor = palPepto['09'];
            break;
            //d
            case 68:
                selectedColor = palPepto['0A'];
            break;
            //f
            case 70:
                selectedColor = palPepto['0B'];
            break;
            //y
            case 89:
                selectedColor = palPepto['0C'];
            break;
            //x
            case 88:
                selectedColor = palPepto['0D'];
            break;
            //c    
            case 67:
                selectedColor = palPepto['0E'];
            break;
            //v
            case 86:
                selectedColor = palPepto['0F'];
            break;
            //o = output    
            case 79:
                saveTextAsFile(getColorCodes());
            break;
            //i = input    
            case 73:
            break;
            case 187:
            case 107:
            // + = zoom up
                changeZoom(0);
            break;
            case 189:    
            case 109:
            // + = zoom down
                changeZoom(1);
            break;
        }
        //set the color if selected Color Changed
        if(cursor.selColor !== selectedColor){
            cursor.updateSC(selectedColor);
        }
        //the curso needs that info,too
        cursor.selColor = selectedColor;
        setActiveColorBox(selectedColor);
    }
    return false;
}

function createImageData(canvas,ctx){
    cursor.removeCursor();
    iD= ctx.getImageData(0,0,1, canvas.height);
    imgData = iD.data;
    
}

//zoom
function changeZoom(dir){
    switch(dir){
        case 1:
            if(zoomLevel > 1){
                zoomLevel--;
                zoom();

            }else{
                msg('min zoomlevel reached!');    
            }
        break;
        case 0:
            //zoomup
            if(zoomLevel < maxZoom){
                zoomLevel++;
                zoom();
            }else{
                msg('max zoomlevel reached!');    
            }
        break;
    }
    
}

function newFilledArray(len, val) {
    var rv = new Array(len);
    while (--len >= 0) {
        rv[len] = val;
    }
    return rv;
}

function zoom(){
    window.removeEventListener("keydown", getChar, false);
    window.removeEventListener("keyup", resetkeyDown, false);
    D.getElementById('rastercanvas').remove();
    initCvsAndCtx();
    for(i = 0;i<lineArr.length; i++){
        C.fillStyle = hexToRGB(lineArr[i]);
        C.fillRect(0,i*zoomLevel,cvs.width,zoomLevel);
    }
    window.addEventListener("keydown", getChar, false);
    window.addEventListener("keyup", resetkeyDown, false);    
}
 
function saveTextAsFile(text){      
    //  Blob with data
    var textFileAsBlob = new Blob([text], {type:'text/plain'});
    // Specify the name of the file to be saved
    var fileNameToSaveAs = "raster.txt";
    // create a link for our script to 'click'
    var downloadLink = document.createElement("a");
    //name of the file
    downloadLink.download = fileNameToSaveAs;
    // text for the link. This will be hidden - just dummy
    downloadLink.innerHTML = "savelink";
    // for webkit & gecko
    window.URL = window.URL || window.webkitURL;
    // Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
}
 
 
//TODO!!!! get colors---- 
function getColorCodes(){
    animateFlag = false;
    cursor.setLine(cursor.realColor, cursor.y);
    var ccCodes = invert(palPepto);
    var colors = '.byte ';
    for (var i in lineArr) {
        if(i < lineArr.length-1){
            colors = colors + '$' + ccCodes[parseInt(lineArr[i])] + ',';
        }else{
            colors = colors + '$' + ccCodes[parseInt(lineArr[i])];
        }
    }
    animateFlag = true;
    return colors;
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}

function msg(msg){
    //todo change to inof place 
   console.log(msg);
}
