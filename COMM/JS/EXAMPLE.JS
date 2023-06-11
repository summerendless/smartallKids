

    $(function(){
        $("input[type=range]").rangeslider({
        polyfill: false,
        onSlideEnd: function(position, value){
        }
    });
    
        $('.text-editer').on( 'keyup', 'textarea', function (e){
            $(this).css('height', 'auto' );
            $(this).height( this.scrollHeight );
            // console.log($('textarea').prop('scrollHeight'))
          });
          $('.text-editer').find( 'textarea' ).keyup();
    })
    
    // 캔버스 개발 
    fabric.Object.prototype.objectCaching = false;
    fabric.Object.prototype.targetFindTolerance = 2;
    fabric.Canvas.prototype.orderObjects = function(compare) {
       this._objects.sort(compare);
       this.renderAll();
    }
    
    
    
    
    var objleft = 20;
    var objtop = 200;
    var objFontSize = 100;
    
    var state = [];
    var mods = 0;
    
    //phone 
    var background, backgroundBG;
    var overlay; 
    var w = $('#canvasContainer').width();
    var h = $('#canvasContainer').height();
    let ratio;
    let dataN;
    if(dataN == undefined){
        dataN = "galaxy21";
    }
    
    // var center = {x:w / 2, y:h / 2);
        let center =canvas.getCenter();
        var clipingRect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            width:600,
            // rx: 100,
            // ry: 100,
            fill:"rgba(255,255,255,0)",
            //strokeDashArray: [5, 5],
            stroke: 10, 
            strokeWidth: 1, 
        });
        
        var mainIMG = new fabric.Image.fromURL(phonUrl, function (objects, options) {
            background = objects;
            let objW = objects.width + 36;
            let objH = objects.height + 36;
            ratio = objects.width / objects.height  ;
            background.set({
                originX: 'center',
                originY: 'center',
                selectable: false,
                preserveObjectStacking:true,
                centeredScaling: true ,
            });
            //this.__canvases.push(canvas);
            //background.scaleToHeight(200);
            //background.scaleToWidth(200);
            canvas.add(background);
            canvas.centerObject(background);
            canvas.renderAll();
            updateModifications(true);
    
            clipingRect.set('width', objW).set('height', objH);
            //// clipingRect.scaleToHeight(200);
            //clipingRect.scaleToWidth(250);
            canvas.centerObject(clipingRect);
               
    
        }, { crossOrigin: 'anonymous' });
             
        // console.log( (canvas.width / 2) - (clipingRect.width/2 ) +330)
        let bg =  canvas.setBackgroundImage(clipingRect , canvas.renderAll.bind(canvas), {
            originX: 'center',
            originY: 'center',
            left: center.left,
            top: center.top
        });
        
    undo = function undo() {
        if (mods+1 < state.length) {
            // console.log(mods)
            // console.log(state)
            canvas.clear().renderAll();
            canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods-1));
            //console.log("state " + state.length);
            mods += 1;
            //console.log("mods " + mods);
        }
    }
    
    redo = function redo() {
        if (mods > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
            canvas.renderAll();
            //console.log("geladen " + (state.length-1-mods+1));
            mods -= 1;
            //console.log("state " + state.length);
            //console.log("mods " + mods);
        }
    }
       
   function text(){
        var textbox = new fabric.IText('TEXT', {
            left: objleft,
            top: objtop,
            fontSize: objFontSize,
            fontFamily: 'Noto Sans KR',
            fill: 'black',
            lineHeight:'1',
            underline:false,
            linethrough: false,
            editable: false,
            originX: 'center',
            originY: 'center',
            globalCompositeOperation: 'source-atop'
        });
        canvas.add(textbox).centerObject(textbox).setActiveObject(textbox);
    
        updateModifications(true);
    
    }
    
    // // controlr img
    // var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    // var img = document.createElement('img');
    // img.src = deleteIcon;
    // controlr option 
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = '#A0CEFF';
    fabric.Object.prototype.cornerStrokeColor ="#1A89FF";
    fabric.Object.prototype.borderColor = "#1A89FF";
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.cornerSize = "15";
    
    fabric.Object.prototype.setControlsVisibility({
        mt: false, // middle top disable
        mb: false, // midle bottom
        ml: false, // middle left
        mr: false, // I think you get it
    });
    
    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size/2, -size/2, size, size);
        ctx.restore();
      }
    
      
    //button 
        
    // function deleteObject() {
        
    //     if( !($(this).hasClass('disable'))){
    //     var activeObject = canvas.getActiveObjects();
        
    //     if (activeObject) {
    //         activeObject.forEach(function(object) {
    //         canvas.remove(object);
    //     });
    //         canvas.discardActiveObject();
    //     }
    //     canvas.renderAll();
    //     }
    
    // }
    
    window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            var w = $('#canvasContainer').width();
            var h = $('#canvasContainer').height();
            canvas.setDimensions({
                width: w,
                height: h
            });
            
            // canvas.forEachObject(function(obj){
            //     obj.set({
            //         left:(w/2) - (obj.get('left')),
            //         top : (obj.get('top')),
            //     });
            //     obj.setCoords();
    
            // });
            
            // var topimg = canvas.setOverlayImage('../images/diy/galaxy21-4.png', canvas.renderAll.bind(canvas), {
            //     scaleY:0.4,
            //     scaleX: 0.4,
            //     originX: 'left',
            //     originY: 'top',
            //     left:(w/2) - 141,
            //     top:(h/2) - 272,
            //     width:200
            // });
    
                // TEST 떄문에 숨김
                var topimg = canvas.setOverlayImage(phonUrl2, function() {
                //canvas.overlayImage && canvas.overlayImage.scaleToWidth(200);
                canvas.centerObject(canvas.overlayImage);
                canvas.renderAll()
            }, {
                // Needed to position overlayImage at 0/0
                originX: 'center',
                originY: 'center',
                crossOrigin: 'anonymous'
            });
    
    
            // var topimg2 = canvas.setOverlayImage('../images/diy/1.png', canvas.renderAll.bind(canvas), {
            //     scaleY:0.3,
            //     scaleX: 0.3,
            //     originX: 'left',
            //     originY: 'top',
            //     left:(w/2) - 141,
            //     top:(h/2) - 272,
            // });
            if(background != undefined ){
                canvas.centerObject(background);
            }
      
          // obj.setCoords();
    
             canvas.centerObject(clipingRect);
            //  console.log(background.width)
    
            
    
        }
        resizeCanvas();
    
