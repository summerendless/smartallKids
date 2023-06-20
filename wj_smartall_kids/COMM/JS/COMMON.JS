//  변수 정리

// 페이지 필요 정보
var mainPageNum = 0;
var sectionCounter = 1;
var pageWrapNum = 0; // section의 첫 페이지
var complatePage = 0; //완료페이지
var correctWords = 0;
// var pageLength = words.length;
// 페이지 Layout

var $nextvBtn = $('.next-btn');
var $doneBtn = $('.done-btn');

var activeClass = 'active';
var $paging = $('.paging');
// var $answerBtn = $('.answerbtn');
var $colorGuide = $('#colorGuide'); // 색칠하기 가이드
var $dropGuide = $('#dropGuide'); // 드래그 가이드
var $intro = $('#introBg');

var $wordWrap;
var $wordWrap2;

var $confetti = $('.confetti-wrap');
var $pagingItem = $('.pagingItem');
var $pageWrap = $('.pageWrap');

let pageWrapArr = $pageWrap.get(pageWrapNum);

let wordData = undefined;

let lockHistory = false; //Undo 히스토리
const undo_history = [];
const redo_history = [];

var introBgm = new Audio('../../COMM/MP3/INTRO.mp3'); // 인트로
var likeBgm = new Audio('../../COMM/MP3/LIKEIT.mp3'); // 좋아요
var goodjob2Bgm = new Audio('../../COMM/MP3/LASTGOODJOB.mp3'); // 마지막 잘했어요
var infoDropBgm = new Audio('../../COMM/MP3/INFO_DROP.mp3'); // 드래그앤드랍 인포
var infoColorBgm = new Audio('../../COMM/MP3/INFO_COLOR.mp3'); // 색칠 인포
var goodjobBgm = new Audio('../../COMM/MP3/GOODJOB.mp3'); // 잘했어요
var fanfareBgm = new Audio('../../COMM/MP3/FANFARE.mp3'); // 빵빠레
var dropBgm3 = new Audio('../../COMM/MP3/DROPING.mp3'); // 드래그앤드랍 시
var doneBgm3 = new Audio('../../COMM/MP3/DONE.mp3'); // 완료
var coloringBgm = new Audio('../../COMM/MP3/COLORING.mp3'); // 색칠 시

// 초기 빌드
function init() {
    var active = '1';
    reset();
    $(pageWrapArr).addClass('on');
    wordData = data.word_data; ///Load Dataset from JSON file
    itemImageLoad();
    itemImageLoad2();
    wordImageLoad();

    wordInit();
    playVid(introBgm);
    setTimeout(function () {
        colorGuide(playVid(infoColorBgm));
    }, 3200);
}

//bgm재생
// $('.btn-back , .next-btn , .prev-btn').addClass('button-bgm');
// $(document).on('click', '.button-bgm', btnBgm);

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
//     guideHtml = `
//         <div class="drag">
//             <i class="hand_icon">
//                 <img src="../../../COMM/IMG/ICON_HAND.PNG" alt="">
//             </i>
//         </div>

//     `;
//     $('<div id="guide">' + guideHtml + '</div>')
//         .appendTo('#wrap')
//         .html(guideHtml);
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

function wordInit() {
    let wordsOff = wordData[mainPageNum].itemUrls[pageWrapNum].itemOff;
    let wordsOn = wordData[mainPageNum].itemUrls[pageWrapNum].itemOn;
    // let section2ImgUrl = wordData[mainPageNum].wordUrl[pageWrapNum].url;

    //.stick-panel 내 전페이지 데이터 삭제
    if ($('.stick-panel div').length !== 0) {
        $('.stick-panel').html('');
    }
    for (var j = 0; j < wordsOff.length; j++) {
        $('<div class="answer answer' + j + '">' + '<img src="' + wordsOff[j].url + '">' + '</div>')
            .attr('data-answer', +pageWrapNum + j)
            .appendTo('.stick-panel')
            .droppable({
                accept: '#wordWrap' + ' div',
                tolerance: 'touch',
                hoverClass: 'hover',
                drop: handleCardDrop,
            });
    }
    // $('<div class="item-word"/>' + '<img src="'+section2ImgUrl+'">').appendTo('#answerWrap');

    $('<div class="words-section words-section' + pageWrapNum + '"/>').appendTo('#wordWrap');
    // const container = document.getElementById('wordWrap');
    for (var j = 0; j < wordsOn.length; j++) {
        // img.src = words[i];
        // container.appendChild(img);
        $('<div class="wordsBox wordsBox' + pageWrapNum + j + '"/>').appendTo('.words-section' + pageWrapNum);

        $('<div class="word answer-item' + '">' + '<img src="' + wordsOn[j].url + '">' + '</div>')
            .data('word', pageWrapNum + j)
            .attr('id', 'word' + pageWrapNum + j)
            .appendTo('.wordsBox' + pageWrapNum + j)
            .draggable({
                // containment: containment,
                stack: '#wordWrap' + ' div',
                cursor: 'move',
                revert: true,
                // helper: "clone",
                //  drag: dragFix(event, aa=containmentArea),
            });
    }
    /*
    for (var i = 0; i < wordsOn.length; i++) {
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
function reset() {
    $('#wordWrap').html('');
    $('.section').css('display', 'none');
    $('.section' + 1).css('display', 'block');
    $(pageWrapArr).removeClass('on');
    $('undo_history').length = 0;

    //.stick-panel 있는지 확인 후 없으면 추가 (초기만 추가하면 됨)
    if ($('.stick-panel').length === 0) {
        $('<div class="stick-panel"/>').appendTo('#answerWrap');
    }
    correctWords = 0;
}

// 캔버스 위 그림 이미지 로드 함수
function itemImageLoad() {
    let itemImageHtml = $('.section' + sectionCounter + ' #itemImg');
    console.log(itemImageHtml);
    console.log('mainPageNum', mainPageNum);
    console.log('pageWrapNum', pageWrapNum);
    console.log(wordData[mainPageNum].itemUrls[pageWrapNum].mainItem);
    $(itemImageHtml).attr('src', wordData[mainPageNum].itemUrls[pageWrapNum].mainItem);
    function cancelEvent(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    //$('<div id="itemImg' + '">' + '<img src="' + wordData[mainPageNum].itemUrls[pageWrapNum].mainItem + '">' + '</div>').appendTo('.item-img');
}

//section2 캔버스 글자 이미지 로드 함수
function itemImageLoad2() {
    let itemImageHtml2 = $('.section' + sectionCounter + ' #itemWord');
    $(itemImageHtml2).attr('src', wordData[mainPageNum].wordUrl[pageWrapNum].url);
}

// 캔버스 글자 이미지 로드 함수
function wordImageLoad() {
    let canvas = new fabric.Canvas('canvas');
    let image = new fabric.Image();
    //console.log(pageWrapNum, wordData[pageWrapNum]);
    image.setSrc(wordData[mainPageNum].wordUrl[pageWrapNum].url, () => {
        canvas.setDimensions({
            width: image.width,
            height: image.height,
            selectable: false,
            preserveObjectStacking: true,
            globalCompositeOperation: 'source-atop',
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
    let ImgUrl = wordData[mainPageNum].wordUrl[pageWrapNum].url;
    $(image).attr('src', ImgUrl[pageWrapNum]);

    function colorOption() {
        // 색상 선택 시작
        const colorOption = Array.from(document.getElementsByClassName('color-option'));
        const color = document.querySelector('#color');

        function oncolorChange(event) {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            const colorValue = event.target.dataset.color;
            console.log(event.target);
            canvas.strokeStyle = colorValue; /** 선 색상변경 */
            canvas.fillStyle = colorValue;
            color.value = colorValue; /** 변경된 색상 표시 */
            canvas.freeDrawingBrush.color = color.value;
        }
        // color.addEventListener("change", oncolorChange); /** 색상변경 함수명 */
        colorOption.forEach((color) => color.addEventListener('click', oncolorChange));
    }
    colorOption();

    // let lockHistory = false; //Undo/Redo
    // const undo_history = [];
    // const redo_history = [];

    const binBtn = document.querySelector('.bin-btn'); // 휴지통 아이콘
    const nextBtn = document.querySelector('.next-btn'); // 다음으로 가기 버튼

    // var canvas = new fabric.Canvas("canvas");

    // canvas.isDrawingMode = true;
    // canvas.freeDrawingBrush.width = 20;

    undo_history.push(JSON.stringify(canvas));

    canvas.on('object:added', function () {
        if (lockHistory) return;
        console.log('object:added');
        playVid(coloringBgm);
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
                console.log(undo_history.length);
            });
            if (undo_history.length == 1) {
                binBtn.classList.remove('active');
            }
        }
    }

    document.getElementById('undo').addEventListener('click', undo);

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
document.addEventListener('keyup', function (e) {
    console.log(e.keyCode);
    if ((e.keyCode == 8) | (e.keyCode == 46)) {
        deleteSelectedObjects();
    }
});
// //뒤로 돌리기 기능 끝

// 섹션 페이지 변경 함수
function pageMove() {
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
    console.log('sectionCounter', sectionCounter);
    itemImageLoad();
    itemImageLoad2();
    // }
    $('.section2').css('display', 'block').siblings().css('display', 'none');
    setTimeout(function () {
        playVid(infoDropBgm);
        dropGuide();
    }, 500);
}

// 드롭 이벤트
function handleCardDrop(event, ui) {
    var slotNumber = $(this).attr('data-answer');
    var cardNumber = ui.draggable.data('word');
    // var offImg = slotNumber.firstChild;
    // console.log(ui.draggable, slotNumber, cardNumber)
    if (slotNumber == cardNumber) {
        playVid(dropBgm3);
        deleteImage(ui.draggable, $(this));
        // cardNumber.find('.droppableImg').fadeOut('slow');
        // playVid(touchBgm2);
    } else {
        // playVid(touchBgm3);
    }
}

// 삭제
function deleteImage($item, $drop) {
    var allchk = 0;
    let wordVocie = wordData[mainPageNum].wordUrl[pageWrapNum].answerVoice;
    var wordAnswerBgm = new Audio(wordVocie); // 정답 단어
    // $item.addClass('correct');
    // $item.draggable('disable');
    // $drop.droppable('disable');
    $drop.find('.droppableImg').fadeOut('slow');
    // $item.position({ of: $(this), my: 'center center', at: 'center center' });
    //$item.draggable('option', 'revert', false);
    correctWords++;

    $drop.append($item);
    if (correctWords == 4 + allchk) {
        complatePage++;
        pageWrapNum++;
        console.log(pageWrapNum);
        playVid(wordAnswerBgm); // 정답 단어
        $confetti.addClass('animation');
        playVid(fanfareBgm); // 빵빠레
        setTimeout(function () {
            playVid(goodjobBgm);
        }, 1000);
        setTimeout(function () {
            $confetti.removeClass('animation');
        }, 1500);
        setTimeout(function () {
            sectionCounter = 1;
            let vars = $pagingItem.get(pageWrapNum - 1);
            $(vars).addClass('on');
            let pageWrapArr = $pageWrap.get(pageWrapNum);
            $(pageWrapArr).addClass('on');

            //임시 :::: 1번만하고 최종 카드 보이기
            // if (complatePage < 4) {
            //     itemImageLoad();
            //     itemImageLoad2();
            //     wordImageLoad();
            //     reset();
            //     wordInit();
            // } else {
            //     $('.section3').css('display', 'block').siblings().css('display', 'none');
            //     $('header').css('display', 'none');
            // }
            $('.section3').css('display', 'block').siblings().css('display', 'none');
            $('header').css('display', 'none');
            // $('.answer-item').draggable();
            // $item.draggable();
            // $drop.droppable('enable');
            // $item.removeClass('correct');
        }, 1700);

        // if (complatePage == pageLength) {
        //     complate();
        // } else {
        //     $nextvBtn.addClass(activeClass);
        // }
    }
}

// 다음버튼
$(document).on('click', '.next-btn', next);
function next(e) {
    var $this = $(this);
    if ($this.hasClass(activeClass)) {
        pageMove();
    }
}

// 완료 함수
$(document).on('click', '.done-btn', complate);
function complate() {
    console.log('학습 완료');

    //낱말카드 저장 팝업 함수
    complatePop();
    //종료함수 작성
    callFinish();
}

//낱말카드 저장 함수
function complatePop() {
    var html, html2, saveImg, endImg;
    saveImg = '../../COMM/IMG/CARD_SAVE.png';
    endImg = '../../COMM/IMG/END.png';
    html =
        `
        <div class="pop-inner">
            <img src=` +
        saveImg +
        ` alt="낱말 카드 저장 팝업"/>
        </div>
    `;
    html2 =
        `
        <div class="pop-inner">
            <img src=` +
        endImg +
        ` alt="참잘했어요 팝업"/>
        </div>
    `;
    $('<div class="pop-wrap"/>').appendTo('#wrap').html(html);

    setTimeout(function () {
        $('.pop-wrap').addClass('end-pop').html(html2);
    }, 2000);
}

//종료 함수
function callFinish() {
    window.javascript_object.callFinish();
}

// function remove() {
//     $('.pop-wrap').remove();
//     $('.pop-wrapBg').remove();
// }

// function result(e) {
//     if ( $answerBtn.hasClass(activeClass)){
//         return;
//     }
//     playVid(touchBgm2);
//     $answerBtn.addClass(activeClass);
//     resultEvent("")
// }

// function resultEvent(){
//     $('.words-section'+ sectionNum + ' .word').each(function (index) {
//         var data = $(this).data('word')
//         deleteImage($(this), $('.answer'+'[data-answer="'+data+'"]') )
//     })
// }
function playVid(el) {
    el.muted = true;
    el.pause();
    el.currentTime = 0;
    el.muted = false;
    el.play();
}
function pauseAll() {
    $('audio.audio').each(function (i) {
        i = i + 1;
        $('#cardAudio' + i)[0].pause();
        $('#cardAudio' + i)[0].currentTime = 0;
    });
}

function colorGuide() {
    let colorGuide;
    colorGuide = `
        <div class="colorGuide">
            <img src="../../COMM/IMG/ICON_HAND.PNG" alt="가이드 아이콘"/>
        </div>`;
    $('<div id="colorGuide" onclick="guideClose($(this))">' + colorGuide + '</div>')
        .appendTo('#wrap')
        .html(colorGuide);
}

function guideClose($this) {
    $this.addClass('close');
}

function dropGuide() {
    let dropGuide;
    dropGuide = `
        <div class="dropGuide">
            <img src="../../COMM/IMG/ICON_HAND.PNG" alt="가이드 아이콘"/>
        </div>`;
    $('<div id="dropGuide" onclick="guideClose($(this))">' + dropGuide + '</div>')
        .appendTo('#wrap')
        .html(dropGuide);
}

function guideClose($this) {
    $this.addClass('close');
}

// 시작
$(function () {
    init();
    $intro.show();
    setTimeout(function () {
        $intro.fadeOut('slow');
    }, 3000);
});
