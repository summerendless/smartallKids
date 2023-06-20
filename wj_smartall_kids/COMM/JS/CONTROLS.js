

var underline = $('.font-underline'),
    linethrough = $('.font-linethrough'),
    bold = $('.font-bold'),
    italic = $('.font-italic'),
    fontLeft = $('.font-left'),
    fontCenter = $('.font-center'),
    fontRight = $('.font-right'),
    lineHeight = $('#text-line-height'),
    whiteSpace = $('#text-space'),
    objFirst = $('.obj-first'),
    objEnd = $('.obj-end'),
    objUp = $('.obj-up'),
    objDown = $('.obj-down'),
    groupBtn = $('.group'),
    ungroupBtn = $('.ungroup'),
    objFilpV = $('.obj-filp-v'),
    objFilpH = $('.obj-filp-h'),
    angle0 = $('.angle0'),
    angle90 = $('.angle90'),
    angleInput = $('.obj-angle-input'),
    mostbutton = $('.mostbutton button'),
    menu = $('.diy_menu .depth1 a.menu');

    
groupBtn.on('click', group)
ungroupBtn.on('click', ungroup)
mostbutton.on('click', function(e) {
    $('.buttonWrap').toggleClass('active');
    $(this).toggleClass('active');
});
angle0.on('click', function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        var curAngle = activeObject.angle;
        activeObject.angle = (curAngle-90);
        canvas.renderAll();
        updateModifications(true);
    }
});
angle90.on('click', function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        var curAngle = activeObject.angle;
        activeObject.angle = (curAngle+90);
        canvas.renderAll();
        updateModifications(true);
    }
});
angleInput.on('change', function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        var curAngle = activeObject.angle;
        var thisAngle = $(this).val()
        activeObject.angle = (thisAngle);
        canvas.renderAll();
        
    }
    updateModifications(true);
});

objFilpV.on('click', function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        if (!activeObject.__corner) {
            activeObject.toggle('flipX');
            canvas.renderAll();
        }
        activeObject.__corner = null;
    }
    updateModifications(true);
});
objFilpH.on('click', function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        if (!activeObject.__corner) {
            activeObject.toggle('flipY');
            canvas.renderAll();
        }
        activeObject.__corner = null;
    }
    updateModifications(true);
});

underline.on('click', function() {
    $(this).toggleClass('active');
    dtEditText('underline');
    
});
linethrough.on('click', function() {
    $(this).toggleClass('active');
    dtEditText('linethrough');
}); 
bold.on('click', function() {
    $(this).toggleClass('active');
    dtEditText('bold');
}); 
italic.on('click', function() {
    $(this).toggleClass('active');
    dtEditText('italic');
}); 
fontLeft.on('click', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
    dtEditText('left');
}); 
fontCenter.on('click', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
    dtEditText('center');
}); 
fontRight.on('click', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
    dtEditText('right');
}); 


objFirst.on('click', function() {
    var chk = $(this).hasClass('disable');
    if(!chk){
        var activeObject = canvas.getActiveObject();
        canvas.bringForward(activeObject);
    }
}); 
objEnd.on('click', function() {
    var chk = $(this).hasClass('disable');
    if(!chk){
        var activeObject = canvas.getActiveObject();
        canvas.sendToBack(activeObject);
        canvas.sendToBack( background);
        
    }
}); 
objUp.on('click', function() {
    var chk = $(this).hasClass('disable');
    if(!chk){
        var activeObject = canvas.getActiveObject();
        canvas.bringToFront(activeObject);
    }
}); 
objDown.on('click', function() {
    var chk = $(this).hasClass('disable');
    // console.log(background)
    if(!chk){
        var activeObject = canvas.getActiveObject();
        canvas.sendBackwards(activeObject);
        canvas.sendToBack( background);
        
        
    }
}); 
$(document).on('click', '.diy_menu .menu', function(e){
    e.preventDefault();
    e.stopPropagation();
    var depth2 = $('.diy_menu .depth2');
    // if( depth2.css('display') == "block"){
    //     depth2.slideUp()
    // }else{
    //     depth2.slideDown();
    // }
    $(this).toggleClass('active');
    depth2.slideToggle()
})

addHandler('text-line-height', function(obj) {
    setStyle(obj, 'lineHeight', this.value);
}, 'onchange');
  
addHandler('text-space', function(obj) {
    setStyle(obj, 'charSpacing', this.value);
}, 'onchange');


$(document).on('click', '.tamplateContents span', function(e){
    e.preventDefault();
    e.stopPropagation();
    var canvasObjects = canvas.getObjects();
    canvasObjects.forEach(function(object,index,arr2) {
        // console.log(arr2[index+1]);
        canvas.remove(arr2[index+1]);
    });
    canvas.discardActiveObject();
    let tampText = $(this).attr('data-tamp');
    let tampId = $(this).attr('data-num');
    let tamptext2;
    let $textLeft;
    let $textTop;
    let $color;
    let $fontSize;
    let $rote;
    let $url;
    let $imgLeft;
    let $imgTop;
    let $url2;
    let $img2Left;
    let $img2Top;
    let $title;
    let $id;
    $.each(tamplateJson, function(){
        let $this = $(this)[0];
        $title = $this.text;
        $id = $this.id;
        
        
        if( $id == tampId){
            tamptext2 = $title;
            $textLeft = parseInt($this.textLeft);
            $textTop = parseInt($this.textTop);
            $color = $this.color;
            $fontSize = parseInt($this.fontSize);

            $url = $this.url;
            $imgLeft = parseInt($this.imgLeft);
            $imgTop = parseInt($this.imgTop);
            if($this.url2 != undefined){
                $url2 = $this.url2;
                $img2Left = parseInt($this.im2gLeft);
                $img2Top = parseInt($this.img2Top);
            }

            if($this.rote != undefined){

                $rote = parseInt($this.rote);
            }else{
                $rote = 0
            }
        }
        
    })
    let objW = background.width + 200;
    let objH = background.height + 200;
    
    fabric.Image.fromURL($url, function(img) {
        img.set({
            // width: objW,
            // height: objH,
            originX: 'center',
            originY: 'center',
            globalCompositeOperation: 'source-atop'
           
        });
        img.scaleToWidth(objW);
        img.scaleToHeight(objH);
        img.set('selectable', false);
        canvas.add(img);
        canvas.centerObject(img);
        console.log(img.width, img.height)
        
     });
    

    // var tamplateText = new fabric.IText(tamptext2, {
    //     left: $textLeft,
    //     top: $textTop,
    //     fontSize: $fontSize,
    //     fontFamily: 'Noto Sans KR',
    //     fill: $color,
    //     lineHeight:'1',
    //     underline:false,
    //     linethrough: false,
    //     editable: false,
    //     originX: 'center',
    //     originY: 'center',
    //     globalCompositeOperation: 'source-atop'
    // });
    // canvas.add(tamplateText).setActiveObject(tamplateText);
    // tamplateText.angle = $rote;


})
$('.tamplateWrap a.close').on('click', function(e){
    e.preventDefault();
    $tamplateWrap = $('.tamplateWrap');
    if($tamplateWrap.hasClass('active')){
        $tamplateWrap.removeClass('active');
    }else{
        $tamplateWrap.addClass('active')
    }
});

function setStyle(object, styleName, value) {
    if (object.setSelectionStyles && object.isEditing) {
        var style = { };
        style[styleName] = value;
        object.setSelectionStyles(style).setCoords();
    }
    else {
        object[styleName] = value;
    }
    canvas.renderAll();
};
function  getStyle(object, styleName) {
    return (object.getSelectionStyles && object.isEditing)
    ? object.getSelectionStyles()[styleName]
    : object[styleName];
}
function addHandler(id, fn, eventName) {
    document.getElementById(id)[eventName || 'onclick'] = function() {
        var el = this;
        if (obj = canvas.getActiveObject()) {
            fn.call(el, obj);
            canvas.renderAll();
        }
    };
}  
$('#text-cont').keyup(function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
        if (!this.value) {
            return false;
        }
        else {
            activeObject.set('text', this.value);
        }
    }

    canvas.renderAll();
});
$('#text-cont').blur(function() {
    $('.text-editer').hide()
});

$('.menu-trigger').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
        $('.zoomWrap').css('width','243px');
    }else{
        $('.zoomWrap').css('width','30px');
    }
    
})


$('.color_box span' ).on('click', function(){
    var color = $(this).css('background-color');
    canvas.getActiveObject().set("fill", color);
    canvas.renderAll();
})

$('.fontWrap li a').on('click', function(e){
    e.preventDefault();
    var $this = $(this);
    
    var $num = $this.parent('li').index();

    $('.fontWrap li a').removeClass('active');
    $this.addClass('active');
    $('.fontWrap').find('> div').css('display','none')
    if( $num == 0 ){
        $('.font_box').css('display','block')
    }else{
        $('.color_box').css('display','block')
    }
});

$('.fontWrap a.close').on('click', function(e){
    e.preventDefault();
    $fontWrap = $('.fontWrap');
    if($fontWrap.hasClass('active')){
        $fontWrap.removeClass('active');
    }else{
        $fontWrap.addClass('active')
    }
});

$('.imgWrap a.close').on('click', function(e){
    e.preventDefault();
    $imgWrap = $('.imgWrap');
    if($imgWrap.hasClass('active')){
        $imgWrap.removeClass('active');
    }else{
        $imgWrap.addClass('active')
    }
});

var savetext; //입력값 저장
$('.text-editer-controlr').on('click', function(){
    $('.fontWrap').removeClass('active')
    savetext = canvas.getActiveObject().get('text');
    $('#text-cont').css('height', 'auto' );
    $('#text-cont').val(savetext);
    
    $('.text-editer').show().find('#text-cont').focus();
    $('.text-editer').find( 'textarea' ).keyup();
    var scHeight = $('#text-cont').prop('scrollHeight');
    $('#text-cont').height( scHeight);
    $('#text-cont').focus();

})
$('.text-editer .bottom_area .close').on('click', function(e){
    e.preventDefault();
    var activeObject = canvas.getActiveObject();
    $('#text-cont').val(savetext);
    activeObject.set('text', savetext);
    canvas.renderAll();
    $('.text-editer').hide();
    
})
$('.text-editer .bottom_area .chk').on('click', function(e){
    e.preventDefault();
    $('.text-editer').hide()
})


$('.font-style-controlr').on('click', function(){
    $('.fontWrap').addClass('active');
    $('.buttonWrap ').removeClass('active');
    $('.mostbutton button ').removeClass('active');
    $('.fontWrap').find('> div').css('display','none');
    $('.font_box').css('display','block');
    $('.fontWrap li a').removeClass('active');
    $('.fontWrap li a.first').addClass('active');
})
$('.font-family-choice').on('click', function(){
    $('#font-family').animate({'left' : "0px"} , 500)
})
$('#font-family h2 a.font-close').on('click', function(e){
    e.preventDefault();
    $('#font-family').animate({'left' : "-100%"} , 500);
})
$('.img-style-controlr').on('click', function(){
    $('.imgWrap').addClass('active');
    $('.buttonWrap ').removeClass('active');
    $('.mostbutton button ').removeClass('active')
})




$('.phoneChangeChange .phoneChangeChange_inner a').on('click', function(e){
    e.preventDefault();
    canvas.clear()
    let $this = $(this);
    let dataN_C = $this.attr('data-set');
    let phoneUrl, phoneUrl2;
    phoneData = mydata[dataN_C];
    phoneUrl = mydata[dataN_C].url;
    phoneUrl2 = mydata[dataN_C].url2;
    phoneColor()
    // $.each(mydata[dataN_C] ,function(key, value){
    //     if(dataN_C === mydata[dataN_C].url){
    //         phoneUrl = mydata[dataN_C].url;
    //     }
    // })
    // console.log(phoneUrl)
    clipingRect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width:600,
        fill:"rgba(255,255,255,0)",
        stroke: 0, 
        strokeWidth: 1, 
    });
    var mainIMG = new fabric.Image.fromURL(phoneUrl, function (objects, options) {
        background = objects;
        let objW = objects.width + 200;
        let objH = objects.height + 200;
        ratio = objects.width / objects.height  ;
        background.set({
            originX: 'center',
            originY: 'center',
            selectable: false,
            preserveObjectStacking:true,
            centeredScaling: true ,
        });
        canvas.add(background);
        canvas.centerObject(background);
        canvas.renderAll();
        updateModifications(true);

        clipingRect.set('width', objW).set('height', objH);
        canvas.centerObject(clipingRect);

        canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), zoomLevel);
        canvas.setZoom(zoomLevel);
    }, { crossOrigin: 'anonymous' });
    let bg =  canvas.setBackgroundImage(clipingRect , canvas.renderAll.bind(canvas), {
        originX: 'center',
        originY: 'center',
        left: center.left,
        top: center.top
    });

    
    topimg = canvas.setOverlayImage(phoneUrl2, function() {
        canvas.centerObject(canvas.overlayImage);
        canvas.renderAll()
    }, {
        originX: 'left',
        originY: 'top',
        crossOrigin: 'anonymous'
    });

    $('.phoneChangeChange ').removeClass('active');


    
})



// event 
let dragMode = true;
const STATE_IDLE = 'idle';
const STATE_PANNING = 'panning';
var pausePanning = false ;
var objPanning = false;
let currentX
let currentY
let lastX;
let lastY;
canvas.on({
    'touch:gesture': function(e) {
        var activeObj = canvas.getActiveObjects();
       if(objPanning == false){
            if(pausePanning == false){
                if (e.e.touches && e.e.touches.length == 2) {
                    
            
                    
                    canvas.selection = false;
                    pausePanning = true;
                    var point = new fabric.Point(e.self.x, e.self.y);
                    if (e.self.state == "start") {
                        zoomStartScale = canvas.getZoom();

                        $('.zoomWrap').show();
                    }
                    var delta = zoomStartScale * e.self.scale;

                    if (delta > 0.5) {delta = 0.5}
                    if (delta < 0.1) {
                        delta = 0.1;
                    }
                    canvas.zoomToPoint(new fabric.Point(e.self.x, e.self.y), delta);
                    pausePanning = false;
                    
                    
                    if (pausePanning == false && undefined != e.self.x && undefined != e.self.y) {
                        currentX = e.self.x;
                        currentY = e.self.y;
                        xChange = currentX - lastX;
                        yChange = currentY - lastY;
                        //    console.log(1)
                        if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                            var delta = new fabric.Point(xChange, yChange);
                            canvas.relativePan(delta);
                        }

                        lastX = e.self.x;
                        lastY = e.self.y;
                        if (e.self.state == "start") {
                            canvas.selection = true;
                        }
                    }
                    e.target.set({
                        lockMovementX: true,
                        lockMovementY: true,
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true
                    });

                }else{
                    canvas.selection = true;
                   
                }
            }


            
        }else{
          //canvas.getActiveObject().isTouchSupported == false
          e.target.set({
            lockMovementX: false,
            lockMovementY: false,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false
        });

        }
    },
    'touch:drag': function(e) {
    
     
    },
    'touch:orientation': function() {
      var text = document.createTextNode(' Orientation ');
     
    },
    'touch:shake': function() {
      var text = document.createTextNode(' Shaking ');
     
    },
    'touch:longpress': function() {
      var text = document.createTextNode(' Longpress ');
     
    },
  
    'selection:created':function(e){
        var activeObj = canvas.getActiveObjects();
        clipingRect.set({"fill" : 'rgba(255,255,255,0.2)' , "stroke": "#F0AE84" });
        $('.infoBox').fadeIn();
        // canvas.backgroundColor = 'rgba(255,255,255,0.2)';
        // pausePanning = true;
        $('.del-btn').removeClass('disable');
        $('.obj-z').removeClass('disable');
        $('.group').addClass('disable');
        $('.ungroup').addClass('disable');
        $('.unselect').removeClass('disable');
        $('.obj-filp-v, .obj-filp-h').removeClass('disable');
        $('.angle90, .angle180, .angle270, .angle360').removeClass('disable');

    //   $('.buttonWrap').addClass('active');
    //   $('.lock-btn-lock').removeClass('disable');
      objAlign(e);
      text_selection(e);


      
     if(activeObj.length >= 2) {
        $('.group').removeClass('disable');
      }
      if (canvas.getActiveObject().type == 'group') {
        $('.ungroup').removeClass('disable');
      }
      e.target.set({
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: false,
        lockScalingY: false,
        lockRotation: false
    });
    },
    'selection:updated':function(e){
        var activeObj = canvas.getActiveObjects();
       // pausePanning = true;
        canvas.selection = true;

      $('.del-btn').removeClass('disable');
      $('.obj-z').removeClass('disable');
    //   $('.buttonWrap').addClass('active');
      $('.lock-btn-lock').removeClass('disable');

        $('.group').addClass('disable');
        $('.ungroup').addClass('disable');
        $('.unselect').removeClass('disable');
        $('.obj-filp-v, .obj-filp-h').removeClass('disable');
        $('.angle90, .angle180, .angle270, .angle360').removeClass('disable');


     if(activeObj.length >= 2) {
        $('.group').removeClass('disable');
      }
      if (canvas.getActiveObject().type == 'group') {
        $('.ungroup').removeClass('disable');
      }


      group_selection()
      text_selection(e);
      objAlign(e);
      
      e.target.set({
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: false,
        lockScalingY: false,
        lockRotation: false
    });
    },
    'object:selected': function() {
        pausePanning = true;
    },
    'selection:cleared':function(e){
      $('.change-wrap, .create-obj').addClass('active')
      pausePanning = false;
      canvas.selection = true;
      clipingRect.set({"fill" : 'rgba(255,255,255,0)' , "stroke": 0 });
      $('.infoBox').fadeOut();
    //   canvas.backgroundColor = 'rgba(255,255,255,0)';
      group_selection()
      //$('.buttonWrap').removeClass('active');
      $('.del-btn').addClass('disable');
      $('.obj-z').addClass('disable');
      $('.lock-btn-lock').addClass('disable');

        $('.ungroup').addClass('disable');
        $('.unselect').addClass('disable');
        $('.obj-filp-v, .obj-filp-h').addClass('disable');
        $('.angle90, .angle180, .angle270, .angle360').addClass('disable');


      $('#font-family').stop().animate({'left' : "-100%"} , 200, function(){
        $('.text-controlr, .fontWrap ,.img-controlr,  .imgWrap').removeClass('on active');
      });
    },
  //  'object:modified' : function () {
  //     updateModifications(true);
  //     console.log(state)
  //  },
  //  'object:added' : function () {
  //     updateModifications(true);
  //     console.log(state)
  //   }
  });
  
  canvas.on('object:selected',function(e){
          $('.del-btn').removeClass('disable');
         
  });
  canvas.on(
      'object:modified', function () {
      updateModifications(true);
  },
      'object:added', function () {
      updateModifications(true);
  });
  var popCheck = true;
  canvas.on('object:scaling', onObjectScaled);
  function onObjectScaled(e)
  {
      var scaledObject = e.target;
      if(scaledObject.type == "image"){
          console.log(scaledObject.scaleX)
          if(scaledObject.scaleX >= 2){
            if(popCheck){
                $('.megPop2').fadeIn();
            }
            
          }
      }
      
  }
$('.megPop2 button').on('click', function(){
    popCheck = false;
    $('.megPop2').fadeOut();
})
 // Functions
 var lockArr = [];
 function lock () { 
    var activeObject = canvas.getActiveObject();
  
    if(activeObject.type === 'activeSelection'){
      
      activeObject._objects.forEach(function(item) {
          lockArr.push( item );
          item.selectable = false; 
          item.evented = false
          item.hoverCursor= 'pointer';
      });
      
    }else{
      
        activeObject.selectable =  false;
        activeObject.evented = false
        activeObject.hoverCursor= 'default';
        activeObject.push( item );
    }
    $('.lock-btn span').text(lockArr.length);
    $('.unlock-btn').removeClass('disable');
    canvas.discardActiveObject().renderAll();
}
function unlockAll() {
    $('.lock-btn span').text(0);
    $('.unlock-btn').addClass('disable');
    var items = canvas.getObjects(); 
   
    if(!items){
      return;
    }
    
    items.forEach(function(item , index) {
        // console.log(index)
          if(item.selectable == false){
            if(index != 0){
              item.selectable = true; 
              item.hoverCursor= 'move';
              item.evented = true;
            }
        }
    });
    lockArr = []
    canvas.discardActiveObject().renderAll();

}

 function gesture () { 
  //  if (canvas.getActiveObject()) {
        $('.gesture-btn').toggleClass('disable');
        if( objPanning ){
            objPanning = false;
        }else{
            objPanning = true;
        }
 //   }
    canvas.requestRenderAll();
}
 
 function group () {
    if (!canvas.getActiveObject()) {
    return;
    }
    if (canvas.getActiveObject().type !== 'activeSelection') {
    return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
    $('.ungroup').removeClass('disable');
    $('.group').addClass('disable');
}

function ungroup () {
    if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== 'group') {
        return;
      }
      
      canvas.getActiveObject().toActiveSelection();
      canvas.requestRenderAll();
      $('.group').removeClass('disable');
      $('.ungroup').addClass('disable');
      $('.del-btn').removeClass('disable');
        $('.obj-z').removeClass('disable');
        $('.group').addClass('disable');
        $('.ungroup').addClass('disable');
        $('.unselect').removeClass('disable');
        $('.obj-filp-v, .obj-filp-h').removeClass('disable');
        $('.angle90, .angle180, .angle270, .angle360').removeClass('disable');
      group_selection()   
}


function group_selection(){
    
    var activeObj = canvas.getActiveObjects();
      if(activeObj.length <= 1){
        $('.objectAlign').addClass('disable');
        $('.group').addClass('disable');
      }else{
        $('.objectAlign').removeClass('disable');
        $('.group').removeClass('disable');
        
      }
}
function objAlign(e){

  var activeObj = canvas.getActiveObjects();

//    console.log(activeObj.length)
  if(activeObj.length >= 2) {
    var groupWidth = e.target.getWidth();
    var groupHeight = e.target.getHeight();
    
    $('.objectAlign').removeClass('disable');
    
    e.target.forEachObject(function(obj) {
      var itemWidth = obj.getBoundingRect().width;
      var itemHeight = obj.getBoundingRect().height;
      
    
      $('#objAlignLeft').on('click',function() {
          obj.set({
            left: -(groupWidth / 2),
            originX: 'left'
          });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });
     
      $('#objAlignCenter').on('click',function() {
          obj.set({
            left: (0 - itemWidth/2),
            originX: 'left'
          });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });
     
      $('#objAlignRight').on('click',function() {
          obj.set({
            left: (groupWidth/2 - itemWidth/2),
            originX: 'center'
          });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });

      $('#objAlignTop').on('click',function() {
        obj.set({
            top: -(groupHeight / 2),
            originY: 'top'
          });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });
      $('#objAlignMiddle').on('click',function() {
        obj.set({
          top: (0 - itemHeight/2),
          originY: 'top'
        });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });

      $('#objAlignBottom').on('click',function() {
        obj.set({
          top: (groupHeight/2 - itemHeight/2),
          originY: 'center'
        });
        obj.setCoords();
        canvas.renderAll();
        updateModifications(true);
      });
      
      
    });
        
    }else{
        $('#objAlignLeft').off('click')
        $('#objAlignCenter').off('click')
        $('#objAlignRight').off('click')
        $('#objAlignTop').off('click')
        $('#objAlignMiddle').off('click')
        $('#objAlignBottom').off('click')
    }
}
 
function text_selection(e){
    $('.img-controlr').removeClass('active');
    $('.text-controlr').removeClass('active');;
    // console.log(e.target.type)
    $('.change-wrap, .create-obj').removeClass('active');
    if(e.target && e.target.type === "image"){
        $('.img-controlr').addClass('active');
        
    }else if(e.target && e.target.type === "i-text"){
        
        textChk()
        $('.text-controlr').addClass('active');
    }
}
function tamplate(){
    $('.tamplateWrap').addClass('active')
}

function textChk(){
    var textStyle = canvas.getActiveObject();
    var active = 'active';
    var fontSpan = $('#font-family .swiper-slide');
    var fontChoice = $(".font-family-choice span");
    var alignButton = $(".font-align button");

    var boldChk = (textStyle.fontWeight != 'normal') ? bold.addClass(active) : bold.removeClass(active);
    var fontStyleChk = (textStyle.fontStyle != 'normal') ? italic.addClass(active) : italic.removeClass(active);
    var underlinechk = (textStyle.underline ) ? underline.addClass(active) : underline.removeClass(active);
    var linethroughchk = (textStyle.linethrough ) ? linethrough.addClass(active) : linethrough.removeClass(active);
    
    var fontFamilyChk = textStyle.fontFamily;
    fontChoice.text(fontFamilyChk).css('font-family', fontFamilyChk);
    fontSpan.removeClass('active');
    fontSpan.each(function(){
        var fontF = $(this).css('font-family');
        var Font = fontF.replace(/\"/g,'').toLowerCase();
        
        // console.log(Font)

        if( Font ==  fontFamilyChk.replace(/\"/g,'').toLowerCase()){
            $(this).addClass('active');
        }
    });

    alignButton.removeClass('active');

    if(textStyle.textAlign == 'left'){
        fontLeft.addClass('active');
    }else if(textStyle.textAlign == 'center'){
        fontCenter.addClass('active');
    }else{
        fontRight.addClass('active');
    }
}

function dtEditText(action) {
    var a = action;
    var o = canvas.getActiveObject();
    var t;
    if (o) {
        t = o.get('type');
    }

    if (o && t === 'i-text') {
        switch(a) {
            case 'bold':				
                var isBold = dtGetStyle(o, 'fontWeight') === 'bold';
                dtSetStyle(o, 'fontWeight', isBold ? '' : 'bold');
            break;

            case 'italic':
                var isItalic = dtGetStyle(o, 'fontStyle') === 'italic';
                dtSetStyle(o, 'fontStyle', isItalic ? '' : 'italic');
            break;

            case 'underline':
                var isUnderline = dtGetStyle(o, 'underline') === 'underline';
                dtSetStyle(o, 'underline', isUnderline ? '' : 'underline');
            break;

            case 'linethrough':
                var isLinethrough = dtGetStyle(o, 'linethrough') === 'linethrough';
                dtSetStyle(o, 'linethrough', isLinethrough ? '' : 'linethrough');
            break;

            case 'left':
                var isFontLeft = dtGetStyle(o, 'textAlign') === 'left';
                dtSetStyle(o, 'textAlign', isFontLeft ? '' : 'left');
            break;

            case 'center':
                var isFontCenter = dtGetStyle(o, 'textAlign') === 'center';
                dtSetStyle(o, 'textAlign', isFontCenter ? '' : 'center');
            break;

            case 'right':
                var isFontRight = dtGetStyle(o, 'textAlign') === 'right';
                dtSetStyle(o, 'textAlign', isFontRight ? '' : 'right');
            break;
            canvas.renderAll();
        }
        updateModifications(true);
    }
}

// Get the style
function dtGetStyle(object, styleName) {
    return object[styleName];
}

// Set the style
function dtSetStyle(object, styleName, value) {
    object[styleName] = value;
    object.set({dirty: true});
    canvas.renderAll();
    updateModifications(true);
}    


download_img = function(el, type) {
    img_all(el, type);
    function img_all(el, type){
        var scaleMultiplier = clipingRect.height / canvas.height ;
        var objects = canvas.getObjects();
        var canvasW = canvas.width;
        var canvasH = canvas.height;
        
        if (canvas.height != clipingRect.height) {
            
            for (let i = 1 ; i < objects.length ; i++) {
                if(i >= 1){
                    objects[i].top = objects[i].top +((clipingRect.height - canvasH )/2 ) ;
                    objects[i].left = objects[i].left +((clipingRect.width - canvasW )/2 ) ;
                    // objects[i].top = objects[i].top +((clipingRect.height - canvas.height )/2 ) ;
                    // objects[i].left = objects[i].left +((canvasH - canvasW )/2 ) ;
                    objects[i].setCoords();
                }
    
            }
        }

        resetZoom();

        canvas.zoomToPoint(new fabric.Point( canvas.width / 2, canvas.height / 2), 1);
        canvas.setZoom(1);
        
        canvas.setDimensions({width: clipingRect.width , height : clipingRect.height })
        

        canvas.centerObject(background);
        canvas.centerObject(canvas.overlayImage);
        canvas.centerObject(clipingRect);
        
        canvas.calcOffset();

        clipingRect.set({"fill" : 'rgba(255,255,255,0)' , "stroke": "#F0AE84" });
        var image = canvas.toDataURL({format: 'png', multiplier: 1});
        // clipingRect.set({"fill" : "rgba(255,255,255,1)" , "stroke": "#F0AE84" });

        canvas.remove(background);
        canvas.remove(clipingRect);
        ttmainIMG = new fabric.Image.fromURL('../images/diy/opa2.png', function (objects) {
            backgroundBG = objects;
            backgroundBG.set({
                originX: 'center',
                originY: 'center',
                width: canvas.width,
                height: canvas.height,
                selectable: false,
                preserveObjectStacking:true,
                centeredScaling: true ,
            });
            canvas.add(backgroundBG);
            canvas.centerObject(backgroundBG);
            canvas.sendToBack( backgroundBG);

            canvas.renderAll();
            
        }, { crossOrigin: 'anonymous' });
        canvas.setOverlayImage(null);
        canvas.getObjects().forEach(function(o) {
            o.set({globalCompositeOperation: 'source-over'})
            
        })
        var image2 = canvas.toDataURL({format: 'png', multiplier: 1});
        canvas.remove(backgroundBG);

        if(type == 1){
            el.href = image;
        }else{
            el.href = image2;
        }
        
        canvas.getObjects().forEach(function(o) {
            o.set({globalCompositeOperation: 'source-atop'})
            
        })
        // 서버 전송
        // $.ajax({
        //     type: "POST",
        //     //url: "script.php",
        //     data: { 
        //        imgBase64: image
        //     }
        //   }).done(function(o) {
        //     console.log('saved'); 
        //   });
        clipingRect.set({"fill" : 'rgba(255,255,255,0)'  });
        if (canvas.height == clipingRect.height) {
            
            for (let i = 1 ; i < objects.length ; i++) {
               
                if(i >= 1){
                    objects[i].top = objects[i].top +((canvasH - clipingRect.height  )/2 ) ;
                    objects[i].left = objects[i].left +((canvasW - clipingRect.width )/2 ) ;
                    objects[i].setCoords();
                }
                
            }
        }

        mainIMG = new fabric.Image.fromURL(phonUrl, function (objects, options) {
            background = objects;
            let objW = objects.width + 200;
            let objH = objects.height + 200;
            ratio = objects.width / objects.height  ;
            background.set({
                originX: 'center',
                originY: 'center',
                selectable: false,
                preserveObjectStacking:true,
                centeredScaling: true ,
            });
            canvas.add(background);
            canvas.centerObject(background);
            canvas.sendToBack( background);
            canvas.renderAll();
            updateModifications(true);
    
            clipingRect.set('width', objW).set('height', objH);
            canvas.centerObject(clipingRect);
    
    
            
            var canvasWidth = $(window).width() * zoomLevel;
            var canvasHeight = $(window).height() * zoomLevel
            canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), zoomLevel);
            canvas.setZoom(zoomLevel);
    
    
        }, { crossOrigin: 'anonymous' });
        canvas.setOverlayImage(phonUrl2, function() {
            canvas.centerObject(canvas.overlayImage);
            canvas.renderAll()
        }, {
            originX: 'center',
            originY: 'center',
            crossOrigin: 'anonymous'
        });
        canvas.zoomToPoint(new fabric.Point(canvasW / 2, canvasH / 2), zoomLevel);
        canvas.setZoom(zoomLevel);
    
        
        canvas.setDimensions({
            width: w,
            height: h
        });
    
      
        
        // canvas.centerObject(background);
        // canvas.centerObject(canvas.overlayImage);
        // canvas.centerObject(clipingRect);
    }
    

};



function upload_all(el){
    var scaleMultiplier = clipingRect.height / canvas.height ;
    var objects = canvas.getObjects();
    var canvasW = canvas.width;
    var canvasH = canvas.height;
    
    if (canvas.height != clipingRect.height) {
        
        for (let i = 1 ; i < objects.length ; i++) {
            if(i >= 1){
                objects[i].top = objects[i].top +((clipingRect.height - canvasH )/2 ) ;
                objects[i].left = objects[i].left +((clipingRect.width - canvasW )/2 ) ;
                objects[i].setCoords();
            }

        }
    }

    resetZoom();

    canvas.zoomToPoint(new fabric.Point( canvas.width / 2, canvas.height / 2), 1);
    canvas.setZoom(1);
    
    canvas.setDimensions({width: clipingRect.width , height : clipingRect.height })
    

    canvas.centerObject(background);
    canvas.centerObject(canvas.overlayImage);
    canvas.centerObject(clipingRect);
    
    canvas.calcOffset();
    
    clipingRect.set({"fill" : 'rgba(255,255,255,0)' , "stroke": "#F0AE84" });
    var image = canvas.toDataURL({format: 'png', multiplier: 1});
    clipingRect.set({"fill" : 'rgba(255,255,255,1)' , "stroke": "#F0AE84" });
    canvas.remove(background);
    canvas.setOverlayImage(null);

    var image2 = canvas.toDataURL({format: 'png', multiplier: 1});
    //el.href = image;
    


    const decodImg = atob(image.split(',')[1]);
    const decodImg2 = atob(image2.split(',')[1]);
  
    let array = [];
    let array2 = [];
    for (let i = 0; i < decodImg .length; i++) {
      array.push(decodImg .charCodeAt(i));
      array2.push(decodImg2 .charCodeAt(i));
    }
  
    const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
    const file2 = new Blob([new Uint8Array(array2)], {type: 'image/png'});
    const fileName = 'canvas_img_crop_' + new Date().getMilliseconds() + '.png';
    const fileName2 = 'canvas_img_only_' + new Date().getMilliseconds() + '.png';
    let formData = new FormData();
    let formData2 = new FormData();
    formData.append('file', file, fileName);
    formData.append('file', file2, fileName2);
    
    let dataBase = [formData, formData2]
    console.log(dataBase)
    
    // 서버 전송
    $.ajax({
        type: 'post',
        url: '/upload/', //data 주소
        cache: false,
        data: dataBase, //데이터 
        processData: false,
        contentType: false,
        success: function (data) {
          alert('Uploaded !!')
        }
      })
  
}



var zoomMax = 2;
var SCALE_FACTOR = 1.2;

// button Zoom In
$("#btnZoomIn").click(function(){
    zoomIn();
});
// button Zoom Out
$("#btnZoomOut").click(function(){
    zoomOut();
});

// button Reset Zoom
$("#btnResetZoom").click(function(){
    resetZoom();
    $('.zoomWrap').hide();
    // var getZoom = canvas.getZoom() ;
    // console.log(canvas.width / 2 * zoomLevel, canvas.height / 2 * zoomLevel)
    // var delta = new fabric.Point( -(canvas.width / 2 ), -(canvas.height / 2));
    // canvas.relativePan(delta);
    
});

// Zoom In
function zoomIn() {
    var getZoom = canvas.getZoom()*SCALE_FACTOR;
    if(canvas.getZoom().toFixed(5) > zoomMax){
        // console.log("zoomIn: Error: cannot zoom-in anymore");
        return;
    }
    
    canvas.zoomToPoint(new fabric.Point( canvas.width / 2, canvas.height / 2),getZoom );
    canvas.setZoom(getZoom);
    canvas.renderAll();
}

// Zoom Out

function zoomOut() {
    var getZoom = canvas.getZoom()/SCALE_FACTOR;
    if( canvas.getZoom().toFixed(5) <=0.1 ){
        // console.log("zoomOut: Error: cannot zoom-out anymore");
        return;
    }
    canvas.zoomToPoint(new fabric.Point(-(canvas.width / 2), canvas.height / 2), getZoom);
    canvas.setZoom(getZoom);
    canvas.centerObject(background);
       // canvas.centerObject(canvas.overlayImage);
        canvas.centerObject(clipingRect);
    // canvas.setHeight(canvas.getHeight() / SCALE_FACTOR);
    // canvas.setWidth(canvas.getWidth() / SCALE_FACTOR);
    canvas.renderAll();
}

// Reset Zoom
function resetZoom() {

    let zoom = canvas.getZoom()
    panX = ((canvas.getWidth() / zoomLevel / 2.44)) * zoomLevel
    panY = ((canvas.getHeight() / zoomLevel / 2.44) ) * zoomLevel
    console.log(zoom, zoomLevel, panX ,panY)
    canvas.setViewportTransform([zoomLevel, 0, 0, zoomLevel, panX, panY])
    canvas.setZoom(zoomLevel);

        canvas.renderAll();
}

