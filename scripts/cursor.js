var cursor = {
    selColor: 0x000000,
    realColor : 0x000000,
    zoomfaktor : 1,
    y: 50,
    //selected color Methods
    initCursor : function(sc,rc){
        cvs = cvs;
        C.fillStyle = hexToRGB(rc);
        C.fillRect(0,0,cvs.width, cvs.height);
        this.selColor = sc;
        this.realColor = rc;
        this.setLine(this.selColor,this.y);
    },
    updateSC : function(color){
        this.selColor = color;
        this.setLine(this.selColor,this.y);
    },
    removeCursor : function(){
        this.setLine(this.realColor,this.y);
    },
    restartCursor :function(){
        this.setLine(this.selColor,this.y);
    },
    up : function(){
        
        this.setLine(this.realColor,this.y);
        this.go('up');
        this.setLine(this.selColor,this.y);
    },
    down : function(){
        this.setLine(this.realColor,this.y);
        this.go('down');
        this.setLine(this.selColor,this.y);
    },
    getLine : function (line){
        var imgData = C.getImageData(1,line*zoomLevel,1,1);
        return RGBTohex(imgData);
    },
    setLine : function(color,line){
        lineArr[line] = color;
        C.fillStyle=hexToRGB(color);
        C.fillRect(0,line*zoomLevel,cvs.width,1*zoomLevel);
    },
    go : function(dir){
        switch(dir){
            case 'up':
                if(!this.check4Line0()){
                    this.y = (this.y-1);
                    this.realColor = this.getLine(this.y)
                    return true;
                }else{
                    //line 0 reached // TODO EXPANDER next step
                    return false;
                }   
            break;
            case 'down':
                if(!this.check4LastLine()){
                    this.y = (this.y+1);
                    this.realColor =  this.getLine(this.y)
                    return true;
                }else{
                    // last line reached // TODO EXPANDER next step
                    return false;
                }
            break;
        }
        
    },
    check4Line0 : function(){
        switch(this.y){
            case 0:
                return true;
            break;
            default:
                return false;
            break;
        }
    },
    check4LastLine : function(){
        switch(this.y){
            case cvs.height+1:
                return true;
            break;
            default:
                return false;
            break;
        }
    },
   blink : function(){
       var d = new Date();
       var n = d.getTime();
       var tmpc = 120 + Math.floor(Math.sin(n)*100);
       this.setLine(RGBValuesTohex(tmpc,tmpc,tmpc),this.y)
   }
}