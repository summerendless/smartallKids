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
const ImgArr = [];

var introBgm = new Audio('../../../COMM/MP3/INTRO.mp3'); // 인트로
var likeBgm = new Audio('../../../COMM/MP3/LIKEIT.mp3'); // 좋아요
var goodjob2Bgm = new Audio('../../../COMM/MP3/LASTGOODJOB.mp3'); // 마지막 잘했어요
var infoDropBgm = new Audio('../../../COMM/MP3/INFO_DROP.mp3'); // 드래그앤드랍 인포
var infoColorBgm = new Audio('../../../COMM/MP3/INFO_COLOR.mp3'); // 색칠 인포
var goodjobBgm = new Audio('../../../COMM/MP3/GOODJOB.mp3'); // 잘했어요
var fanfareBgm = new Audio('../../../COMM/MP3/FANFARE.mp3'); // 빵빠레
var dropBgm3 = new Audio('../../../COMM/MP3/DROPING.mp3'); // 드래그앤드랍 시
var doneBgm3 = new Audio('../../../COMM/MP3/DONE.mp3'); // 완료
var coloringBgm = new Audio('../../../COMM/MP3/COLORING.mp3'); // 색칠 시
var endBgm = new Audio('../../../COMM/MP3/END.mp3'); // 단어카드 완료
var finishBgm = new Audio('../../../COMM/MP3/GOOD.mp3'); // 마지막 참 잘했어요

const binBtn = document.querySelector('.bin-btn'); // 휴지통 아이콘
const nextBtn = document.querySelector('.next-btn'); // 다음으로 가기 버튼
const endBtn = document.querySelector('.done-btn'); // 완료 버튼

const randomColor = ['random', '#ff0000', '#ff8c00', '#ffff00', '#008000', '#0000ff', '#800080'];
// 잘했어요 음원 리스트
const goodjobBgmList = [
    '../../../COMM/MP3/GOODJOB.mp3',
    '../../../COMM/MP3/BEST.mp3',
    '../../../COMM/MP3/BRAVO.mp3',
    '../../../COMM/MP3/LIKEIT.mp3',
];
// 초기 빌드
function init() {
    var active = '1';
    reset();
    $(pageWrapArr).addClass('on');
    // wordData = data.word_data; ///Load Dataset from JSON file
    wordData = mydata; //각 차시별 데이터
    itemImageLoad();
    itemImageLoad2(wordData.itemUrls[pageWrapNum].wordItem);
    // wordImageLoad();
    wordTest();

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
//                 <img src="../../../../COMM/IMG/ICON_HAND.PNG" alt="">
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
    let wordsOff = wordData.itemUrls[pageWrapNum].itemOff;
    let wordsOn = wordData.itemUrls[pageWrapNum].itemOn;
    // let section2ImgUrl = wordData.itemUrls[pageWrapNum].wordItem;

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

    let aa = randomColor.map((color, idx) => {
        let colorImg = '';
        let html = '';

        if (idx == 0) {
            colorImg = 'BV';
        } else if (idx == 1) {
            colorImg = 'RD';
        } else if (idx == 2) {
            colorImg = 'OR';
        } else if (idx == 3) {
            colorImg = 'YL';
        } else if (idx == 4) {
            colorImg = 'GN';
        } else if (idx == 5) {
            colorImg = 'BL';
        } else if (idx == 6) {
            colorImg = 'PR';
        }

        html += `<div class="controls__color color-option color-red">
                        <img src="../../../COMM/IMG/CRAYON_${colorImg}.png" data-color="${color}" alt="랜덤" />
                    </div>`;
        return html;
    });
    $('#jsColors').html(aa);

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
    console.log(wordData.itemUrls[pageWrapNum].mainItem);
    $(itemImageHtml).attr('src', wordData.itemUrls[pageWrapNum].mainItem);
    // function cancelEvent(event) {
    //     if (event.preventDefault) {
    //         event.preventDefault();
    //     } else {
    //         event.returnValue = false;
    //     }
    // }

    //$('<div id="itemImg' + '">' + '<img src="' + wordData.itemUrls[pageWrapNum].mainItem + '">' + '</div>').appendTo('.item-img');
}

//section2 캔버스 글자 이미지 로드 함수
function itemImageLoad2(src) {
    console.log(src);
    let itemImageHtml2 = $('.section' + sectionCounter + ' #itemWord');
    $(itemImageHtml2).attr('src', src);
}

//캔버스 이미지 테스트
function wordTest() {
    let canvas = document.getElementById('myCanvas');
    let cPushArray = new Array();

    let ctx = canvas.getContext('2d');
    let isDraw = false;
    let pDraw = $('#myCanvas').offset();
    let currP = null;
    let drawImage = new Image();

    var cStep = -1;

    let brushColor = '';
    let brushSize = 20;
    let brushlineCap = 'round';

    let pattern;
    let imgUrl = wordData.itemUrls[pageWrapNum].wordItem;

    drawImage.src = imgUrl;
    drawImage.onload = () => {
        canvas.width = drawImage.width;
        canvas.height = drawImage.height;
        ctx.drawImage(drawImage, 0, 0);

        ctx.globalCompositeOperation = 'source-atop';
        pattern = ctx.createPattern(drawImage, 'no-repeat');
    };

    // var getPosition = function(e) {
    //     var x, y;
    //     if(e.type.indexOf("mouse") > -1) {
    //         x = e.offsetX;
    //         y = e.offsetY;
    //     } else {
    //         var rect = e.target.getBoundingClientRect();
    //         x = e.changedTouches[0].clientX - rect.x;
    //         y = e.changedTouches[0].clientY - rect.y;
    //     }
    //     return {x:x, y:y};
    // };

    // Event (마우스)
    $('#myCanvas').bind('mousedown', function (e) {
        if (e.button === 0) {
            e.preventDefault();
            ctx.beginPath();
            isDraw = true;
        }
    });

    $('#myCanvas').bind('mousemove', function (e) {
        var event = e.originalEvent;
        e.preventDefault();
        currP = { X: event.offsetX, Y: event.offsetY };
        if (isDraw) draw_line(currP);
    });

    $('#myCanvas').bind('mouseup', function (e) {
        e.preventDefault();
        isDraw = false;
    });
    $('#myCanvas').bind('mouseleave', function (e) {
        isDraw = false;
    });

    // Event (터치스크린)
    $('#myCanvas').bind('touchstart', function (e) {
        e.preventDefault();
        ctx.beginPath();
        cStep++;
        if (cStep < cPushArray.length) {
            cPushArray.length = cStep;
        }
        cPushArray.push(document.getElementById('myCanvas').toDataURL());
    });

    $('#myCanvas').bind('touchmove', function (e) {
        var event = e.originalEvent;
        e.preventDefault();
        // currP = { X: event.touches[0].pageX - pDraw.left+80, Y: event.touches[0].pageY - pDraw.top+70 };
        currP = { X: event.touches[0].pageX - 120, Y: event.touches[0].pageY - pDraw.top };
        draw_line(currP);
    });

    $('#myCanvas').bind('touchend', function (e) {
        e.preventDefault();
        // cStep++;
        // if (cStep < cPushArray.length) { cPushArray.length = cStep; }
        // cPushArray.push(document.getElementById('myCanvas').toDataURL());
    });

    // 선 그리기
    function draw_line(p) {
        ctx.lineWidth = brushSize;
        ctx.lineCap = brushlineCap;
        ctx.strokeStyle = brushColor;
        ctx.lineTo(p.X, p.Y);
        ctx.moveTo(p.X, p.Y);
        ctx.stroke();
        if (lockHistory) return;
        binBtn.classList.add('active');
        nextBtn.classList.add('active');
    }

    function newUndo() {
        if (cStep > 0) {
            cStep--;
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function () {
                ctx.drawImage(canvasPic, 0, 0);
            };
        }
        if ((cStep = 1)) {
            binBtn.classList.remove('active');
        }
    }
    document.getElementById('undo').addEventListener('click', newUndo);

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

    // 아래 기능은 테스트 용으로 주석처리 됨

    // var toggleDrawing = function(e) {
    //     this.drawing = e.type === "touchstart";
    //     if(this.drawing) {
    //         console.log(e.type)
    //         // var pos = getPosition(e);
    //         // var ctx = this.getContext("2d");
    //         ctx.beginPath();
    //         // ctx.moveTo(pos.x, pos.y);
    //         coloringBgm.play();
    //         cStep++;
    //         if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    //         cPushArray.push(document.getElementById('myCanvas').toDataURL());
    //         coloringBgm.pause();
    //     }
    // }

    // undo_history.push(JSON.stringify(canvas));
    // var draw = function(e) {
    //     this.drawing = e.type === "touchmove";
    //     if(this.drawing) {
    //         e.preventDefault();
    //         // colorRandomOption();
    //         console.log(e.type);
    //         var pos = getPosition(e);
    //         console.log(pos)
    //         currP = { X: pos.x, Y: pos.y };
    //         // var ctx = this.getContext("2d");
    //         ctx.lineTo(currP.X +280, currP.Y +70);
    //         ctx.moveTo(currP.X +280, currP.Y +70);
    //         ctx.stroke();
    //         ctx.lineCap = brushlineCap;
    //         ctx.lineWidth = brushSize;
    //         ctx.strokeStyle = brushColor;

    //         if (lockHistory) return;
    //         // console.log('object:added');
    //         // // playVid(coloringBgm);
    //         binBtn.classList.add('active');
    //         nextBtn.classList.add('active');
    //         // console.log(undo_history.length);
    //         // undo_history.push(JSON.stringify(canvas));
    //         // redo_history.length = 0;
    //     }
    // };

    // function newUndo() {

    //     if (cStep > 0) {
    //         cStep--;
    //         var canvasPic = new Image();
    //         canvasPic.src = cPushArray[cStep];
    //         canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    //     }
    //     if(cStep = 1) {
    //         binBtn.classList.remove('active');
    //     }

    // }

    // function undo() {

    //     if (undo_history.length > 0) {
    //         lockHistory = true;
    //         if (undo_history.length > 1) redo_history.push(undo_history.pop());
    //         const content = undo_history[undo_history.length - 1];
    //         console.log(content)

    //         canvas.loadFromJSON(content, function () {
    //             canvas.renderAll();
    //             lockHistory = false;
    //             console.log(undo_history.length);
    //         });
    //         if (undo_history.length == 1) {
    //             binBtn.classList.remove('active');
    //         }
    //     }
    // }

    //document.getElementById('undo').addEventListener('click', newUndo);

    // canvas.addEventListener("touchstart", toggleDrawing, false);

    // $('#myCanvas').bind('touchstart', toggleDrawing);
    // $('#myCanvas').bind('touchmove', draw);
    // // canvas.addEventListener("touchmove", draw, function(e){ if (e.target.nodeName == 'CANVAS') { e.preventDefault(); } }, false);
    // $('#myCanvas').bind('touchstart', toggleDrawing);

    /*
        // function handleStart(evt) {
        //     console.log(evt);
        //     evt.preventDefault();
        //     if(drawing === true){
        //         draw();
        //     }
        //   }
        // }       

        // function handleMove(evt) {
        //     evt.preventDefault();
        //     var touches = evt.changedTouches;
        //         ctx.lineTo(touches[0].screenX, touches[0].screenY);
        //         ctx.stroke();
        // }
    */

    // canvas.on('object:added', function () {
    //     if (lockHistory) return;
    //     console.log('object:added');
    //     playVid(coloringBgm);
    //     binBtn.classList.add('active');
    //     nextBtn.classList.add('active');
    //     undo_history.push(JSON.stringify(canvas));
    //     redo_history.length = 0;
    //     console.log(undo_history.length);
    // });

    function colorOption() {
        // 색상 선택 시작
        // const colorOption = Array.from(document.getElementsByClassName('color-option'));
        const color = document.querySelector('#color');

        ctx.strokeStyle = color.value;
        function oncolorChange(event) {
            event.stopPropagation();
            console.log($(event.target));
            $(event.target).parent().addClass('active');
            $(event.target).parent().siblings().removeClass('active');
            let num = Math.floor(Math.random() * randomColor.length);
            const colorValue = event.target.dataset.color == 'random' ? randomColor[num] : event.target.dataset.color;
            canvas.strokeStyle = colorValue; /** 선 색상변경 */
            canvas.fillStyle = colorValue;
            color.value = colorValue; /** 변경된 색상 표시 */
            ctx.strokeStyle = color.value;
            console.log(color.value);
        }
        // color.addEventListener("change", oncolorChange); /** 색상변경 함수명 */
        // colorOption.forEach((color) => color.addEventListener('click', oncolorChange));
        $(document).on('click', '.color-option', (e) => {
            oncolorChange(e);
        });
    }
    colorOption();
    //     function colorRandomOption() {
    //         // 랜덤색상 선택 시작

    //         const colorRandom = document.querySelector('.color-option-random');
    //         const color = document.querySelector('#color');

    //         $(document).on('click', '.color-option-random', oncolorRandom);
    //         function oncolorRandom(e) {
    //             $(this).addClass('active');
    //             $(this).siblings().removeClass('active');

    //             const colorValue = e.target.dataset.color;
    //             canvas.strokeStyle = colorValue; /** 선 색상변경 */
    //             canvas.fillStyle = colorValue;
    //             color.value = colorValue; /** 변경된 색상 표시 */
    //             ctx.strokeStyle = color.value;
    //             // let randomColor = ['#ff0000', '#ff8c00', '#ffff00', '#008000', '#0000ff', '#800080'];
    //             let num = Math.floor(Math.random() * randomColor.length);
    //             ctx.strokeStyle = randomColor[num];
    //         }
    //     }
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
    console.log(ImgArr);
    itemImageLoad2(ImgArr[pageWrapNum]);
    // }
    nextBtn.classList.remove('active');
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
    let wordVocie = wordData.itemUrls[pageWrapNum].wordBgm;
    var wordAnswerBgm = new Audio(wordVocie); // 정답 단어
    // $item.addClass('correct');
    // $item.draggable('disable');
    // $drop.droppable('disable');
    $drop.find('.droppableImg').fadeOut('slow');
    // $item.position({ of: $(this), my: 'center center', at: 'center center' });
    //$item.draggable('option', 'revert', false);
    correctWords++;
    var goodjabAudio = new Audio();

    $drop.append($item);
    if (correctWords == 4 + allchk) {
        complatePage++;
        pageWrapNum++;
        console.log(pageWrapNum);
        playVid(wordAnswerBgm); // 정답 단어
        // $confetti.addClass('animation');
        reAction();
        playVid(fanfareBgm); // 빵빠레
        var nowAudio = goodjobBgmList[pageWrapNum - 1];
        goodjabAudio.src = nowAudio;
        console.log('goodjabAudio::::', goodjabAudio);

        setTimeout(function () {
            playVid(goodjobBgm);
        }, 1000);
        // setTimeout(function () {
        //     $confetti.removeClass('animation');
        // }, 1500);
        setTimeout(function () {
            sectionCounter = 1;
            let vars = $pagingItem.get(pageWrapNum - 1);
            $(vars).addClass('on');
            let pageWrapArr = $pageWrap.get(pageWrapNum);
            $(pageWrapArr).addClass('on');

            //임시 :::: 1번만하고 최종 카드 보이기
            if (complatePage < 4) {
                itemImageLoad();
                itemImageLoad2();
                // wordImageLoad();
                wordTest();
                reset();
                wordInit();
            } else {
                $('.section3').css('display', 'block').siblings().css('display', 'none');
                $('header').css('display', 'none');
                sec3Init();
                playAllCard();
            }
            // $('.section3').css('display', 'block').siblings().css('display', 'none');
            // $('header').css('display', 'none');
            // playAllCard();

            // $('.answer-item').draggable();
            // $item.draggable();
            // $drop.droppable('enable');
            // $item.removeClass('correct');
        }, 8000);

        // if (complatePage == pageLength) {
        //     complate();
        // } else {
        //     $nextvBtn.addClass(activeClass);
        // }
    }
}

function reAction() {
    $('#startButton').trigger('click');
    setTimeout(function () {
        $('#stopButton').trigger('click');
    }, 3000);
}

function sec3Init() {
    var html;
    var dataList = wordData;
    html = dataList.itemUrls
        .map(
            (item, idx) =>
                `
        <div class="stick-panel-2" key=${item.word}>
            ` +
                item.itemOn
                    .map(
                        (item2) => `
                    <div class="answer answer${item2.key}" data-answer="0${item2.key}">
                        <img src="${item2.url}"/>
                    </div>
                `
                    )
                    .join('') +
                `
            <div class="item-img"><img src="${item.mainItem}" alt="" /></div>
            <div class="item-word"><img src="${ImgArr[idx]}" alt="" /></div>
        </div>
    `
        )
        .join('');

    $('<div class="pageContents"/>').appendTo('.section3').html(html);
}

// 다음버튼
$(document).on('click', '.next-btn', next);
function next(e) {
    var $this = $(this);
    if ($this.hasClass(activeClass)) {
        toDataURL();
        pageMove();

        // 캔버스에 그린 그림 변수에 담기
        // pageWrapNum
        // var colored_image_src = "html_images/base_profile";
        // document.getElementById("colorImg").src = colored_image_src;

        function toDataURL() {
            let canvas = document.getElementById('myCanvas');
            // const image = ctx.toDataURL();
            // var myImage = document.getElementById('colorImg');
            // console.log(canvas.toDataURL())
            // myImage.src = canvas.toDataURL();
            ImgArr.push(canvas.toDataURL());
        }
        function fromDataURL() {
            // var copyCanvas = document.getElementById('copyCanvas');
            // var copyContext = copyCanvas.getContext('2d');

            // var image = new Image();
            // image.src = canvas.toDataURL();

            // image.onload = function(){
            //   copyContext.drawImage(image,0,0);
            // }

            var copyCanvas = document.getElementById('copyCanvas');
            var copyContext = copyCanvas.getContext('2d');
            copyContext.drawImage(copyCanvas, 0, 0);
        }
        // fromDataURL()
    }
    console.log(ImgArr);
}

//마지막카드 오디오 재생 함수
function playAllCard() {
    var audioArray = [];

    wordData.itemUrls.map((item) => {
        return audioArray.push(item.wordBgm);
    });

    console.log(audioArray);

    function playNextAudio(idx) {
        var audioElement = new Audio();

        if (idx < audioArray.length) {
            console.log('audio 재생중');
            var nowAudio = audioArray[idx];
            audioElement.src = nowAudio;
            audioElement.play();
            $(audioElement).on('ended', function () {
                playNextAudio(idx + 1);

                if (idx === audioArray.length - 1) {
                    endBtn.classList.add('active');
                }
            });
        }
    }

    playNextAudio(0);
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
    saveImg = '../../../COMM/IMG/CARD_SAVE.png';
    endImg = '../../../COMM/IMG/END.png';
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
    playVid(endBgm);

    $(endBgm).on('ended', function () {
        $('.pop-wrap').addClass('end-pop').html(html2);
        playVid(fanfareBgm); // 빵빠레
        playVid(finishBgm);
    });

    // setTimeout(function () {
    //     $('.pop-wrap').addClass('end-pop').html(html2);
    //     playVid(finishBgm);
    // }, 2000);
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
            <img src="../../../COMM/IMG/ICON_HAND.PNG" alt="가이드 아이콘"/>
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
            <img src="../../../COMM/IMG/ICON_HAND.PNG" alt="가이드 아이콘"/>
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
