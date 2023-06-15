// 
const section1 = $('.section1');
const section2 = $('.section2');
const section3 = $('.section3');
const section3_1 = $('.section3-1');
const section4 = $('.section4');

const bgm = "#bgm";
function playVid(el) { 
    el = $(el)[0];
    el.play(); 
} 

// $(document).ready(function() {
//     $(bgm)[0].volume = 0.3;
// });

function contractBridge(){
    window.javascript_object.getContractNum();
}
function customerBridge(){
    window.javascript_object.getCustomerNum();
}
function popKorDictDetail(dictSeq , searchWord ) {
	var korDictUrl = "https://wjdict.wjthinkbig.com/wjdict/searchMain";
	var popUrl = korDictUrl + "?" + "DICT_SEQ=" + dictSeq ;
	popUrl += "&VIEW_DICT_NM=kor" ;
	popUrl += "&SEARCH_WORD=" + searchWord ;
	popUrl += "&EXHIBITION_TP=CHNSTUDY";
	window.open(popUrl) ; // 팝업 설정은 여기서 변경
}

const fill = document.querySelector(".fill");
const empties = document.querySelectorAll(".empty");

function dragOver(e){
    e.preventDefault(); // 드랍을 허용하도록 preventDefault() 호출
}
function dragDrop(){
    this.append(fill);
}

empties.forEach((empty)=>{
    empty.addEventListener('dragover', dragOver); 
    empty.addEventListener('drop', dragDrop);   
    
})



$(function(){
    const dd = $("#draggable").data("target");
    const $target = $('.droppable[data-accept="' + dd + '"]');

    // $(window).on('load', function(){
    //     setTimeout(function(){
    //         section1.fadeOut('slow');
    //         section2.fadeIn('slow', function(){
    //             firstDisplay();
    //         });
    //     },2000);

    // })

    // if(section2.show()){
    //     function firstDisplay() {
    //         $('.circle'+page+' .left_map_center').stop().fadeIn(function(){
    //             $('.circle'+page).find('.left_map_out').fadeIn(function(){
    //                 if( !$('.circle'+page).hasClass('noAction')){
    //                     $('.circle'+page).find('.left_map_out').addClass('guide');
    //                 }
                    
    //                 // $('.circle'+page).find('.center_word_wrap').stop().fadeIn(100,function(){
    //                 $('.circle'+page).find('.center_word_wrap').animate({ 'opacity' : 1}, function(){
    //                     displayStepWords();
    //                     setTimeout(function(){
    //                         $('.circle'+page).find('.left_map_out').removeClass('guide');
    //                         setTimeout(function(){
    //                         //    displayStepWords();
    //                            $('.circle' + page).addClass('noAction');
    //                         }, 200)
    //                     }, 1000)
                        
    //                 });
    //             });
    //         });
    //     }

    //     function drop_on (){
    //         $('.drop_place').addClass('drop_on').delay(1000).queue(function(next ){
    //             $(this).removeClass('drop_on');
    //             next();
    //         })
    //     }

    //     btnSketchWrap.find("li").hide();

    //     function fadeInF (e, index){
    //         $('.circle'+page+' .left_map .left_map_out img.out'+(index+1)).fadeIn(function(){
    //             $(e).fadeIn("slow", function(){
    //                 if(index == 2 && page == 1){
    //                     if(startMotion) exampleMotion();
    //                 }
    //                 if(page != 1){
    //                     $( ".drag" ).draggable({ disabled: false });
    //                 }
    //             });
    //         })
    //     }

    //     function displayStepWords() {
            
    //         $('.circle'+page).find('.left_map_out').fadeIn(function(){
    //             $('.circle'+page).find("ul.btn_sketch li").each(function(i) {
    //                 let showup = $(this);
    //                 setTimeout( function(){fadeInF(showup, i);}, 600 * i );
    //             })
    //         })
    //     }

    //     function exampleMotion(){
    //         startMotion = false;
    //         hand.show().addClass('active');
    //         exWord.show().addClass('active');

    //         setTimeout(function(){
    //             hand.fadeOut(200,function(){
    //                 $( ".drag" ).draggable({ disabled: false });
    //                 setTimeout(function(){
    //                     exWord.hide();
    //                     exampleA.addClass('on').find('.drop_wrap').hide();

    //                 },100)
    //                 setTimeout(function(){
    //                     exWord.hide();
    //                     $('.right_sketch').fadeIn('slow', function(){  });
    //                 },400)
    //             });
    //             setTimeout(function(){
    //                 drop_on();
    //             },1300);
    //         },1200);
    //     }
    // }

    $(".drag").draggable({
        revert: true , 
        disabled: true,
        containment : "dnd_target_wrap",
        helper:function(e){
            return $("<img src='IMG/logo_icon2.PNG' style='width:57.6px'/>"); 
        } ,
        revertDuration: 0,
        start: function(event, ui){
            $(this).draggable('instance').offset.click = {
                left: Math.floor(ui.helper.width() / 2),
                top: Math.floor(ui.helper.height() / 2)
            }; 
        },
        stop: function(){ }
    });        
});

////////////////////////////////////////////////////////////////////////////////////////

window.onload = function() {
    // find the element that you want to drag.
    var box = document.getElementById('box');
    
    /* listen to the touchMove event,
    every time it fires, grab the location
    of touch and assign it to box */
    
    box.addEventListener('touchmove', function(e) {
      // grab the location of touch
      var touchLocation = e.targetTouches[0];
      
      // assign box new coordinates based on the touch.
      box.style.left = touchLocation.pageX + 'px';
      box.style.top = touchLocation.pageY + 'px';
    })
    
    /* record the position of the touch
    when released using touchend event.
    This will be the drop position. */
    
    box.addEventListener('touchend', function(e) {
      // current box position.
      var x = parseInt(box.style.left);
      var y = parseInt(box.style.top);
    })
    
  }


  ////////////////////////////////////////////////////////////////////////////////

const wrapper = document.querySelector('.wrapper');
const empty = Array.from(document.querySelectorAll('.empty'));
const drag = document.querySelector('.drag');

drag.addEventListener('touchmove', touchMove);
drag.addEventListener('touchend', touchEnd);

let itemAppend;
// ------------------------ touchMove
function touchMove(event) {
    event.preventDefault();

    let touch = event.targetTouches[0];
    drag.style.top = `${touch.pageY - (wrapper.offsetTop) - (drag.offsetWidth / 2)}px`;
    drag.style.left = `${touch.pageX - (wrapper.offsetLeft) - (drag.offsetHeight / 2)}px`;

    empty.map(item => {
        if (
            drag.getBoundingClientRect().top + drag.offsetWidth / 2 < item.getBoundingClientRect().bottom &&
            drag.getBoundingClientRect().right - drag.offsetWidth / 2 > item.getBoundingClientRect().left &&
            drag.getBoundingClientRect().bottom - drag.offsetWidth / 2 > item.getBoundingClientRect().top &&
            drag.getBoundingClientRect().left + drag.offsetWidth / 2 < item.getBoundingClientRect().right
        ) {
            // item.classList.add('active');
            itemAppend = item;
        }
        else {
            // item.classList.remove('active');
        }
    });
}


function touchEnd(element) {
    if (itemAppend.classList.contains('active')) {
        itemAppend.append(this);
        this.style.top = `${itemAppend.offsetTop}px`;
        this.style.left = `${itemAppend.offsetLeft}px`;
    }
    else {
        this.style.top = `${itemAppend.offsetTop}px`;
        this.style.left = `${itemAppend.offsetLeft}px`;
    }
}
