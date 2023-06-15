//  변수 정리

// 페이지 필요 정보
var page = 0; // 첫 페이지 
var complatePage = 0; //완료페이지
var correctWords = 0;
// var pageLength = words.length;
var scaleFactor = 1;
// 페이지 Layout

var $prevBtn = $('.prev-btn');
var $nextvBtn = $('.next-btn');
var $doneBtn = $('.done-btn');

var activeClass = 'active';
var $paging = $('.paging');
var $backBtn = $('.btn-back');
var $answerBtn = $('.answerbtn');
var $guide = $('#guide');

var $wordWrap;
var $wordWrap2;

// if(type==undefined || type == null){
//     var type = "society"    
// }
// try {
//     navType;
// } catch(e) {
//    navType = 'old' ;
// }
// 초기 빌드
function init() {
     
    var active = "1";
    reset()
    // words.sort(function () { return Math.random() - .5 });

    // header pageing nav 

    // 2023-01-13 디자인 수정
    // 사회만 적용

    console.log(navType)
    if(  navType == 'newNav' ){
       pageNav(page+1)
    // 기존 과학 버전 그대로
    }else{
        for (var i = 0; i < pageLength; i++) {
            if ( i == page ){
                active = activeClass ;
            }else{
                active = "";
            }
            $('<div class="page-btn '+ active +'">' + (i+1) + '</div>').data('page-num', i).appendTo('.paging');
        }
    }

    // 하단 단어 
    var click = {
            x: 0,
            y: 0
        };
    
    if( type==='science' ){
        word(words2,2);
    }
    
    word(words,1)
    guide()
}

//bgm재생
$('.btn-back , .next-btn , .prev-btn').addClass('button-bgm');
$(document).on('click', '.button-bgm', btnBgm);

var touchBgm = new Audio('../../../COMM/MP3/CHARACTER.MP3'); // 나가기, 페이지 이동 버튼  
var touchBgm2 = new Audio('../../../COMM/MP3/OBGM.MP3'); // 정답 버튼, 정답시
var touchBgm3 = new Audio('../../../COMM/MP3/XBGM.MP3'); // 오답시

function btnBgm() {

    if ($(this).hasClass('btn-back')) {
        touchBgm.pause();
        touchBgm.currentTime = 0;
        touchBgm.play();
    } else {
        if ($(this).hasClass('active') && $(this).hasClass('next-btn') || $(this).hasClass('prev-btn')){
            playVid(touchBgm);
        }
    }
}

// 드래그 앤 드롭, 핀치줌 가이드
function guide() {
    let guideHtml;
    guideHtml  = `
        <div class="drag">
            <div>
                <div class="guide_answer answer answer-w"></div>
                <p class="desc">
                    <span class="nbsp"></span>에 들어갈 알맞은 말을<br/>
                    끌어 넣으세요.
                </p>
            </div>
        </div>
        <i class="hand_icon">
            <img src="../../../COMM/IMG/ICON_HAND.PNG" alt="">
        </i>
    `;
    $('<div id="guide" onclick="guideClose($(this))">'+guideHtml+'</div>').appendTo('#wrap').html(guideHtml);
}

function wordWrap($wordWrap, $wordWrap2) {
    $wordWrap.addClass('dimmed');
    $wordWrap2.addClass('dimmed');
}
// 가이드 닫기
function guideClose($this) {
    $this.addClass('close');
    $wordWrap.removeClass('dimmed');
    $wordWrap2.removeClass('dimmed');
}

function word(words, side){//
    let sidetype = (side == 1) ? "" : "2";
    const $answer = $('.answer' + sidetype);

    if( side == 2){
        $('#wordWrap').addClass('science-wordWrap science-wordWrap1')
        $('<div id="wordWrap2" class="science-wordWrap science-wordWrap2"/>').appendTo('#wrap');
        
    }
    // 가이드화면용 wordWrap
    $wordWrap = $('#wordWrap');
    $wordWrap2 = $('#wordWrap2');
    wordWrap($wordWrap, $wordWrap2);

    for (var i = 0; i < words.length; i++) {
        $('<div class="words-section words-section'+ sidetype +i+'"/>').appendTo('#wordWrap' + sidetype);
        let containment = (type != 'science') ? 'document': (side == 1) ? '.section'+(i+1)+' .science-left' : '.section'+(i+1)+' .science-right' ;
        // console.log(containment)
        // console.log(side);
        let containmentArea = $(containment);
        
        for (var j = 0; j < words[i].length; j++) {
            $('<div class="word'+sidetype+'">' + words[i][j] + '</div>').data('word', sidetype + String(i) + j).attr('id', 'word'+sidetype + String(i) + j).appendTo('.words-section'+sidetype+i).draggable({
                    containment: containment,
                    stack: '#wordWrap'+sidetype+' div',
                    cursor: 'move',
                    revert: true,
                    // helper: "clone",
                  //  drag: dragFix(event, aa=containmentArea),
                });
            
        }
        var len = $('.words-section'+sidetype + i).children('.word'+sidetype).length;
        
        $('.words-section'+sidetype+ i).each(function () {
            var listWrap = $(this);
            var liArr = listWrap.children('.word'+sidetype);
            liArr.sort(function () {
                var temp = parseInt(Math.random() * len);
                var temp1 = parseInt(Math.random() * len); return temp1 - temp;
            }).appendTo(listWrap);
        });
    }


    
        function dragFix(event, ui, aa) {
            console.log(event , ui , aa)
            if(type == 'science'){
                var contWidth = containmentArea.width(), contHeight = containmentArea.height();
                ui.position.left = Math.max(0, Math.min(ui.position.left / scaleFactor , contWidth - ui.helper.width()));
                ui.position.top = Math.max(0, Math.min(ui.position.top  / scaleFactor,  contHeight- ui.helper.height()));
            }
            
        }


    $answer.each(function(){
        // console.log(sidetype + '@@@@@@@@@@@@@@')
        $(this).droppable({
            accept: '#wordWrap'+sidetype+' div',
            tolerance: 'touch',  
            hoverClass: 'hover',
            drop: handleCardDrop,
        });
    })


}


// 초기화 함수
function reset(){
    $('#wordWrap').html('');
    $paging.html('');
    $('.section').css('display','none');
    $('.section' + (page+1) ).css('display', 'block');
}

// 페이지 변경 함수
function pageMove (pageNum){
    // console.log(pageNum)
    page = pageNum;
    
    correctWords = 0;

    if (page == 0) {
        $prevBtn.css('display', "none");
    } else {
        $prevBtn.show();
    }

    if ((page + 1) >= pageLength) {
        $nextvBtn.removeClass(activeClass);
        $nextvBtn.css('display', "none");
        if ((page + 1) != complatePage) {
            $answerBtn.removeClass(activeClass);
        }
    } else if (page < complatePage) {
        $nextvBtn.show();
        $nextvBtn.addClass(activeClass);
        $answerBtn.addClass(activeClass);
    } else {
        $nextvBtn.removeClass(activeClass);
        $answerBtn.removeClass(activeClass);

    }


    // $('.paging div').eq(complatePage - 1).addClass('complate');
    $('.paging div').eq(page).addClass(activeClass).siblings().removeClass(activeClass);
    $('.section'+(page+1)).css('display', 'block').siblings().css('display', 'none');
    $('.words-section'+page).css('display', 'flex').siblings().css('display', 'none');
    if(type =='science'){
        $('.words-section2'+page).css('display', 'flex').siblings().css('display', 'none');
    }
}

// 드롭 이벤트
function handleCardDrop(event, ui) {
    var slotNumber = $(this).attr('data-answer');
    var cardNumber = ui.draggable.data('word');
    // console.log(ui.draggable, slotNumber, cardNumber)
    if (slotNumber == cardNumber) {
        deleteImage( ui.draggable , $(this));
        playVid(touchBgm2);
    } else {
        playVid(touchBgm3);
    }

    
}

// 삭제
function deleteImage($item, $drop) {
    var allchk = 0;
    if(type == 'science'){
        allchk =  words2[page].length
    }
    $item.addClass('correct');
    $item.draggable('disable');
    $drop.droppable('disable');
    setTimeout(function(){ $drop.addClass('answer-complate'); },100)
    
    $item.position({ of: $(this), my: 'center center', at: 'center center' });
    $item.draggable('option', 'revert', false);
    correctWords++;
    
    $drop.append($item);

    if (correctWords == words[page].length + allchk) {

        complatePage++;
        // console.log( complatePage, page, pageLength)
        $answerBtn.addClass(activeClass);
        if (complatePage == pageLength) {
            complate();
        } else {
            $nextvBtn.addClass(activeClass);    
        }
       
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
        if ((page + 1) >= pageLength) { return }
        page = page + 1;
        pageMove(page);
        if ( navType == "newNav")pageNav(page+1)
    }
}
function pageNav (pageNum){
    $('.paging').html(`
        <div class='new-page'>
            <span>${pageNum}</span> / ${pageLength}
        </div>

    `)
}
// 완료 함수
function complate(){
    //종료함수 작성
    callFinish();
}

//종료 함수
function callFinish(){
    window.javascript_object.callFinish();
}

// 나가기 함수
// function closeWindow() {
//     var html, text;
//     text = (complatePage == pageLength) ? "종료할까요?" : "아직 확인하지 않은 정답이 있습니다.<br> 종료할까요?";
//     html = `
//         <h1 class="pop-tit">알림</h1>
//         <div class="pop-inner">
//             <p>`+ text + `<p>

//             <div class="btn-wrap">
//                 <button class="btn btn1" onclick="remove();">아니오</button>
//                 <button class="btn btn2" onclick="window.javascript_object.closeWindow();">네</button>
//             </div>
//         </div>
//     `;
//     $('<div class="pop-wrapBg"/>').appendTo('#wrap');
//     $('<div class="pop-wrap"/>').appendTo('#wrap').html(html);
// }
// $backBtn.click(function() {
//     closeWindow();
// })

function remove() {
    $('.pop-wrap').remove();
    $('.pop-wrapBg').remove();
}

function result(e) {
    if ( $answerBtn.hasClass(activeClass)){
        return;
    }
    playVid(touchBgm2);
    $answerBtn.addClass(activeClass);
    
    if(type == 'science'){
        resultEvent(2)
    }
    
    resultEvent("")
}
function resultEvent(sideType){
    $('.words-section'+sideType + page + ' .word'+sideType).each(function (index) {
        var data = $(this).data('word')
        // console.log(data)
        deleteImage($(this), $('.answer'+sideType+'[data-answer="'+data+'"]') )
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
    

    const parent = element.parentElement
    parent.addEventListener('wheel', function(event) {
        zoom.zoomWithWheel(event);
        scaleFactor = zoom.getScale();
        // $(".title").text(scaleFactor)
        // console.log(scaleFactor)
    })
    element.addEventListener('panzoomend', function(event) {
        scaleFactor = zoom.getScale();
    })
})