//  변수 정리

// 페이지 필요 정보
var mainPageNum = 0;
var sectionCounter = 1; 
var pageWrapNum = 0; // section의 첫 페이지 
var complatePage = 0; //완료페이지
var correctWords = 0;
// var pageLength = words.length;
// 페이지 Layout

var $prevBtn = $('.prev-btn');
var $nextvBtn = $('.next-btn');
var $doneBtn = $('.done-btn');

var activeClass = 'active';
var $paging = $('.paging');
// var $answerBtn = $('.answerbtn');
var $guide = $('#guide');

var $wordWrap;
var $wordWrap2;

var $confetti = $('.confetti-wrap');
var $pagingItem = $('.pagingItem');
var $pageWrap = $('.pageWrap');

let pageWrapArr = $pageWrap.get(pageWrapNum);

let wordData = undefined;

// 초기 빌드
function init() {
     
    var active = "1";
    reset()
    $(pageWrapArr).addClass('on');
    wordData = data.word_data; ///Load Dataset from JSON file
    console.log(wordData)
    itemImageLoad()
    wordImageLoad()
    // if(  navType == 'newNav' ){
    //    pageNav(page+1)
    // // 기존 과학 버전 그대로
    // }else{
    //     for (var i = 0; i < pageLength; i++) {
    //         if ( i == page ){
    //             active = activeClass ;
    //         }else{
    //             active = "";
    //         }
    //         $('<div class="page-btn '+ active +'">' + (i+1) + '</div>').data('page-num', i).appendTo('.paging');
    //     }
    // }

    // for (var i = 0; i < pageLength; i++) {
    //     if ( i == page ){
    //         active = activeClass ;
    //     }else{
    //         active = "";
    //     }
    //     $('<div class="page-btn '+ active +'">' + (i+1) + '</div>').data('page-num', i).appendTo('.paging');
    // }

    // 하단 단어 
    var click = {
            x: 0,
            y: 0
        };
       
    wordInit();
    // guide()
}

//bgm재생
// $('.btn-back , .next-btn , .prev-btn').addClass('button-bgm');
// $(document).on('click', '.button-bgm', btnBgm);

var likeBgm = new Audio('../../../COMM/MP3/LIKEIT.MP3'); // 좋아요
var goodjob2Bgm = new Audio('../../../COMM/MP3/LASTGOODJOB.MP3'); // 마지막 잘했어요
var introBgm = new Audio('../../../COMM/MP3/INTRO.MP3'); // 인트로
var infoDropBgm = new Audio('../../../COMM/MP3/INFO_DROP.MP3'); // 드래그앤드랍 인포
var infoCOlorBgm = new Audio('../../../COMM/MP3/INFO_COLOR.MP3'); // 색칠 인포
var goodjobBgm = new Audio('../../../COMM/MP3/GOODJOB.MP3'); // 잘했어요
var fanfareBgm = new Audio('../../../COMM/MP3/FANFARE.MP3'); // 빵빠레
var dropBgm3 = new Audio('../../../COMM/MP3/DROPING.MP3'); // 드래그앤드랍 시
var doneBgm3 = new Audio('../../../COMM/MP3/DONE.MP3'); // 완료
var coloringBgm = new Audio('../../../COMM/MP3/COLORING.MP3'); // 색칠 시

// function btnBgm() {

//     if ($(this).hasClass('btn-back')) {
//         touchBgm.pause();
//         touchBgm.currentTime = 0;
//         touchBgm.play();
//     } else {
//         if ($(this).hasClass('active') && $(this).hasClass('next-btn') || $(this).hasClass('prev-btn')){
//             playVid(touchBgm);
//         }
//     }
// }

// 드래그 앤 드롭, 핀치줌 가이드
// function guide() {
//     let guideHtml;
//     guideHtml  = `
//         <div class="drag">
//             <div>
//                 <div class="guide_answer answer answer-w"></div>
//                 <p class="desc">
//                     <span class="nbsp"></span>에 들어갈 알맞은 말을<br/>
//                     끌어 넣으세요.
//                 </p>
//             </div>
//         </div>
//         <i class="hand_icon">
//             <img src="../../../COMM/IMG/ICON_HAND.PNG" alt="">
//         </i>
//     `;
//     $('<div id="guide" onclick="guideClose($(this))">'+guideHtml+'</div>').appendTo('#wrap').html(guideHtml);
// }

// function wordWrap($wordWrap, $wordWrap2) {
//     $wordWrap.addClass('dimmed');
//     $wordWrap2.addClass('dimmed');
// }
// // 가이드 닫기
// function guideClose($this) {
//     $this.addClass('close');
//     $wordWrap.removeClass('dimmed');
//     $wordWrap2.removeClass('dimmed');
// }

function wordReplace() {
    let wordsOff = wordData[mainPageNum].itemUrls[pageWrapNum].itemOff;
    let wordsOn = wordData[mainPageNum].itemUrls[pageWrapNum].itemOn;


    for (var j = 0; j < wordsOn.length; j++){
        let answerItem = $('.answer-item')[j];
        let wordSection = $('.answer-item img')[j];
        $(wordSection).attr('src', wordsOn[j].url);

        $(answerItem).css('left', '');
        $(answerItem).css('top', '');
        //$(answerItem).appendTo('#wordWrap');
    }

    $('.answer-item').appendTo('#wordWrap');
    // $('.answer-item').draggable({ disabled: true });   
    // $(this).css({'position':'relative','top':'','left':''});
    // $("span.spread").dblclick(function () {
    //         $(this).toggleClass("draggable");
    //         if($(this).hasClass('draggable')){
    //             $("span.spread").draggable({disabled:false});
    //             }else{
    //             $("span.spread").draggable({disabled:true});
    //             $(this).css({'position':'relative','top':'','left':''});
    //         };
    //     }); 
    // })
    
    for (var j = 0; j < wordsOff.length; j++) {
        let stickPannel = $('.stick-panel');
        let answerID = '.answer' + j + ' img';
        let ReplacewordsOff = $(stickPannel).find(answerID)[0];
        console.log("replaceOff", ReplacewordsOff);
        $(ReplacewordsOff).attr('src', wordsOff[j].url);
        // $('<div class="answer answer'+j+'">' + '<img src="'+ wordsOff[j].url + '">' + '</div>').attr('data-answer', + pageWrapNum + j).appendTo('.stick-panel')
    
    }

    // $(ReplacewordsOff).attr('src', wordsOff);

    // let ReplacewordsOn = $('.word answer-item img').attr('id', 'word'+ pageWrapNum + j);
    // $(ReplacewordsOn).attr('src', wordsOn);

}

function wordInit(){//
    // const $answer = $('.answer');
    // 가이드화면용 wordWrap
    // $wordWrap = $('#wordWrap');
    // $wordWrap2 = $('#wordWrap2');
    // wordWrap($wordWrap, $wordWrap2);
    let wordsOff = wordData[mainPageNum].itemUrls[pageWrapNum].itemOff;
    let wordsOn = wordData[mainPageNum].itemUrls[pageWrapNum].itemOn;

    $('<div class="stick-panel"/>').appendTo('#answerWrap');
    for (var j = 0; j < wordsOff.length; j++) {
        $('<div class="answer answer'+j+'">' + '<img src="'+ wordsOff[j].url + '">' + '</div>').attr('data-answer', + pageWrapNum + j).appendTo('.stick-panel').droppable({
            accept: '#wordWrap'+' div',
            tolerance: 'touch',  
            hoverClass: 'hover',
            drop: handleCardDrop,
        });
    }

    $('<div class="words-section words-section' + pageWrapNum + '"/>').appendTo('#wordWrap');
    // const container = document.getElementById('wordWrap');
    for (var j = 0; j < wordsOn.length; j++) {
        // img.src = words[i];
        // container.appendChild(img);

        $('<div class="word answer-item'+'">' + '<img src="'+ wordsOn[j].url + '">' + '</div>').data('word', pageWrapNum + j).attr('id', 'word'+ pageWrapNum + j).appendTo('.words-section'+pageWrapNum).draggable({
            // containment: containment,
            stack: '#wordWrap'+' div',
            cursor: 'move',
            revert: true,
            // helper: "clone",
            //  drag: dragFix(event, aa=containmentArea),
        });
    }
    /*
    for (var i = 0; i < wordsOn.length; i++) {
        
        // let containment = (type != 'science') ? 'document': (side == 1) ? '.section'+(i+1)+' .science-left' : '.section'+(i+1)+' .science-right' ;
        // console.log(containment)
        // console.log(side);
        // let containmentArea = $(containment);
        // for (let i = 0; i < words.length; i++) {
        //     const img = document.createElement('img');
        //     img.src = words[i];
        //     container.appendChild(img);
        // }
        

        var len = $('.words-section'+ i).children('.word').length;
        
        // $('.words-section'+ i).each(function () {
        //     var listWrap = $(this);
        //     var liArr = listWrap.children('.word');
        //     liArr.sort(function () {
        //         var temp = parseInt(Math.random() * len);
        //         var temp1 = parseInt(Math.random() * len); return temp1 - temp;
        //     }).appendTo(listWrap);
        // });
    }*/


    
    function dragFix(event, ui, aa) {
        // if(type == 'science'){
        //     var contWidth = containmentArea.width(), contHeight = containmentArea.height();
        //     ui.position.left = Math.max(0, Math.min(ui.position.left / scaleFactor , contWidth - ui.helper.width()));
        //     ui.position.top = Math.max(0, Math.min(ui.position.top  / scaleFactor,  contHeight- ui.helper.height()));
        // }
        
    }


    // $answer.each(function(){
    //     // console.log(sidetype + '@@@@@@@@@@@@@@')
    //     $(this).droppable({
    //         accept: '#wordWrap'+' div',
    //         tolerance: 'touch',  
    //         hoverClass: 'hover',
    //         drop: handleCardDrop,
    //     });
    // })


}


// 초기화 함수
function reset(){
    $('#wordWrap').html('');
    $('.section').css('display','none');
    $('.section' + (1)).css('display', 'block');
    $(pageWrapArr).removeClass('on');
    // $(pageWrapArr+1).addClass('on');
}

// 캔버스 위 이미지 로드 함수 
function itemImageLoad() {
    let itemImageHtml = $('.section' + sectionCounter+' #itemImg');
    console.log(itemImageHtml);
    console.log("mainPageNum", mainPageNum)
    console.log("pageWrapNum", pageWrapNum)
    console.log(wordData[mainPageNum].itemUrls[pageWrapNum].mainItem)
    $(itemImageHtml).attr('src', wordData[mainPageNum].itemUrls[pageWrapNum].mainItem);

    //$('<div id="itemImg' + '">' + '<img src="' + wordData[mainPageNum].itemUrls[pageWrapNum].mainItem + '">' + '</div>').appendTo('.item-img');
}

// 캔버스 이미지 로드 함수
function wordImageLoad() {
    const canvas = new fabric.Canvas('canvas');
    const image = new fabric.Image();
    //console.log(pageWrapNum, wordData[pageWrapNum]);
    image.setSrc(wordData[mainPageNum].wordUrl[pageWrapNum].url, () => {
        canvas.setDimensions({
        width: image.width,
        height: image.height,
        selectable: false,
        });

        canvas.add(image);
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = 'black';
        canvas.freeDrawingBrush.width = 10;
        canvas.clipPath = new fabric.Rect({
        left: 0,
        top: 0,
        width: image.width,
        height: image.height,
        absolutePositioned: true,
        });
    });
    
    function colorOption() {
    // 색상 선택 시작
    const colorOption = Array.from(document.getElementsByClassName("color-option"));
    const color = document.querySelector("#color");

    function oncolorChange(event) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        const colorValue = event.target.dataset.color;
        console.log(event.target)
        canvas.strokeStyle = colorValue; /** 선 색상변경 */
        canvas.fillStyle = colorValue;
        color.value = colorValue; /** 변경된 색상 표시 */
        canvas.freeDrawingBrush.color = color.value;
    }
    // color.addEventListener("change", oncolorChange); /** 색상변경 함수명 */
    colorOption.forEach((color) => color.addEventListener("click", oncolorChange));
    }

    let lockHistory = false; //Undo/Redo
    const undo_history = [];
    const redo_history = [];

    const binBtn = document.querySelector(".bin-btn"); // 휴지통 아이콘
    const nextBtn = document.querySelector(".next-btn"); // 다음으로 가기 버튼

    // var canvas = new fabric.Canvas("canvas");

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 20;

    undo_history.push(JSON.stringify(canvas));

    canvas.on("object:added", function () {
        if (lockHistory) return;
        console.log("object:added");
        binBtn.classList.add('active');
        nextBtn.classList.add('active');
        undo_history.push(JSON.stringify(canvas));
        redo_history.length = 0;
        console.log(undo_history.length);
    });

    function undo() {
        if (undo_history.length > 0) {
            lockHistory = true;
            if (undo_history.length > 1) redo_history.push(undo_history.pop());
            const content = undo_history[undo_history.length - 1];
            canvas.loadFromJSON(content, function () {
            canvas.renderAll();
            lockHistory = false;
            console.log(undo_history.length)
            });
            if (undo_history.length == 1) {
            binBtn.classList.remove("active");
            }
        }
    }

    document.getElementById("undo").addEventListener("click", undo);

    function deleteSelectedObjects() {
        lockHistory = true;
        canvas.getActiveObjects().forEach((element) => {
            canvas.remove(element);
        });
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        undo_history.push(JSON.stringify(canvas)); //UNDO
        lockHistory = false;
    }

}


  //Detele
  document.addEventListener("keyup", function (e) {
    console.log(e.keyCode);
    if ((e.keyCode == 8) | (e.keyCode == 46)) {
      deleteSelectedObjects();
    }
  });
  // //뒤로 돌리기 기능 끝

// 페이지 변경 함수
function pageMove (){
    // console.log(pageNum)
    //wordImageLoad()
    // correctWords = 0;

    // if (page == 0) {
    //     $prevBtn.css('display', "none");
    // } else {
    //     $prevBtn.show();
    // }

    // if ((page + 1) >= pageLength) {
    //     $nextvBtn.removeClass(activeClass);
    //     $nextvBtn.css('display', "none");
    //     if ((page + 1) != complatePage) {
    //         $answerBtn.removeClass(activeClass);
    //     }
    // } else if (page < complatePage) {
    //     $nextvBtn.show();
    //     $nextvBtn.addClass(activeClass);
    //     $answerBtn.addClass(activeClass);
    // } else {
    //     $nextvBtn.removeClass(activeClass);
    //     $answerBtn.removeClass(activeClass);
    sectionCounter = sectionCounter + 1;
    console.log("sectionCounter", sectionCounter);
    itemImageLoad();
    // }
    // $('.paging div').eq(complatePage - 1).addClass('complate');
    // $('.paging div').eq(page).addClass(activeClass).siblings().removeClass(activeClass);
    $('.section2').css('display', 'block').siblings().css('display', 'none');
    // $('.words-section'+page).css('display', 'flex').siblings().css('display', 'none');
    // if(type =='science'){
    //     $('.words-section2'+page).css('display', 'flex').siblings().css('display', 'none');
    // }
}

// 드롭 이벤트
function handleCardDrop(event, ui) {
    var slotNumber = $(this).attr('data-answer');
    var cardNumber = ui.draggable.data('word');
    var offImg = slotNumber.firstChild;
    // console.log(ui.draggable, slotNumber, cardNumber)
    if (slotNumber == cardNumber) {
        deleteImage( ui.draggable , $(this));
        cardNumber.find('.droppableImg').fadeOut('slow');
        // playVid(touchBgm2);
    } else {
        // playVid(touchBgm3);
    }
}

// 삭제
function deleteImage($item, $drop) {
    var allchk = 0;
    // if(type == 'science'){
    //     allchk =  words2[page].length
    // }
    // $item.addClass('correct');
    // $item.draggable('disable');
    // $drop.droppable('disable');
    $drop.find('.droppableImg').fadeOut('slow');
    // setTimeout(function(){ $drop.addClass('answer-complate'); },100)
    
    // $item.position({ of: $(this), my: 'center center', at: 'center center' });
    //$item.draggable('option', 'revert', false);
    correctWords++;
    
    $drop.append($item);
    // console.log(words[page])
    if (correctWords == 4 + allchk) {
        complatePage++;
        pageWrapNum++;
        console.log(pageWrapNum)
        // console.log( complatePage, page, pageLength)
        // $answerBtn.addClass(activeClass);
        $confetti.addClass('animation');
        setTimeout(function(){ $confetti.removeClass('animation'); },1500)

        console.log('다음으로')
        setTimeout(function () {
            sectionCounter = 1;
            let vars = $pagingItem.get(pageWrapNum-1);
            $(vars).addClass('on');
            let pageWrapArr = $pageWrap.get(pageWrapNum);
            $(pageWrapArr).addClass('on');
            itemImageLoad();
            wordImageLoad();
            // $item.draggable( "instance" );
            // $drop.droppable('enable');
            // $item.removeClass('correct');


            // let pageWrap = $pageWrap.get(pageWrapNum);
            // $(pageWrap).addClass('on');
            // //vars.classList.add('on');
            // console.log(page, pageWrapNum)
            reset();
            // wordInit();
            wordReplace();
            $item.draggable( 'enable' );
            $drop.droppable('enable');
            $item.removeClass('correct');
            // $('.pageWrap'+(pageWrapNum+1)).css('display', 'block').siblings().css('display', 'none');
        }, 1700)

        // if (complatePage == pageLength) {
        //     complate();
        // } else {
        //     $nextvBtn.addClass(activeClass);    
        // }
       
    }
}
    
// 이전버튼
// $(document).on('click', '.prev-btn', prev); 
$(document).on('click', '.next-btn', next);
// function prev(e) {
//     var $this = $(this);
//     if(page == 0){return}
//     page = page - 1;
//     pageMove(page);
//     if ( navType == "newNav")pageNav(page+1)

// }
// 다음버튼
function next(e) {
    var $this = $(this);
    if ($this.hasClass(activeClass)) {
        // if ((page + 1) >= pageLength) { return }
        pageMove();
        // if ( navType == "newNav")pageNav(page+1)
    }
}
// function pageNav (pageNum){
//     $('.pagingInner').html(`
//         <div class='new-page'>
//             <span>${pageNum}</span> / ${pageLength}
//         </div>

//     `)
// }
// 완료 함수
function complate(){
    //종료함수 작성
    callFinish();
}

//종료 함수
function callFinish(){
    window.javascript_object.callFinish();
}

function remove() {
    $('.pop-wrap').remove();
    $('.pop-wrapBg').remove();
}

function result(e) {
    // if ( $answerBtn.hasClass(activeClass)){
    //     return;
    // }
    // playVid(touchBgm2);
    // $answerBtn.addClass(activeClass);

    resultEvent("")
}

function resultEvent(){
    $('.words-section'+ sectionNum + ' .word').each(function (index) {
        var data = $(this).data('word')
        // console.log(data)
        deleteImage($(this), $('.answer'+'[data-answer="'+data+'"]') )
    })
}
function playVid(el) { 
    el.pause(); 
    el.currentTime = 0;
    el.play(); 
} 
function pauseAll() {
    $('audio.audio').each(function(i){
        i = i+1;
        $('#cardAudio' + i)[0].pause();
        $('#cardAudio' + i)[0].currentTime = 0;
    })
}

// 시작
$(function(){
    init();
    // var element = document.querySelector('.zoomInner')

    // // And pass it to panzoom
    // var zoom = Panzoom(element, {
    //     contain: 'outside',
    //     minScale: 1,
    //     maxScale: 2,
    //     disablePan: false,
    //     disableZoom: false,
    //     zoom: true,
      
    // })
    //  scaleFactor = zoom.getScale();
    

    // const parent = element.parentElement
    // parent.addEventListener('wheel', function(event) {
    //     zoom.zoomWithWheel(event);
    //     scaleFactor = zoom.getScale();
    //     // $(".title").text(scaleFactor)
    //     // console.log(scaleFactor)
    // })
    // element.addEventListener('panzoomend', function(event) {
    //     scaleFactor = zoom.getScale();
    // })
})