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
    
/////

{/* <canvas 
                                style="z-index:5;position:relative; left:0px;"
                                height="500" width="500" id="canvas_result"
                            >
                                캔버스를 지원하지 않는 브라우저
                                입니다
                            </canvas>
                            <div style="z-inxex:50;visibility:hidden;position:absolute; left:0px;top:200px">
                                <canvas height="500" width="500" id="canvas_for_compose">
                                    캔버스를 지원하지 않는 브라우저 입니다
                                </canvas>
                            </div>

                            <div style="z-inxex:30;visibility:hidden;position:absolute;
                            left:0px;top:200px" id="composed_image_div" width=0 height=0>
                            </div>
                            <img id="stitch_batang" src="../../COMM/IMG/WORD/1_1/WORD_1_1.png" width=0/> */}



            // 위의 흰색 침대사진이 세팅된 img 객체를 불러옵니다. 

            var obBatangImg = document.getElementById("stitch_batang");



            // 앞서 준비해둔 canvas 객체를 불러옵니다. 

            const canvas_result = document.getElementById('canvas_result');



            // canvas 에 그림을 그리기위한 2d context 를 얻어옵니다

            // 2d context 는 canvas에 그리거나 이미지를 넣거나 할 때 사용하는 객체/ 메소드/ 속성등을 제공합니다.

            const ctx_result = canvas_result.getContext('2d');



            // drawImage 함수로 이미지를 canvas에 넣습니다

            ctx_result.drawImage(obBatangImg, 0, 0);





            // 색칠시 사용하게될 canvas 와 canvas 의 2D context 객체를 전역변수에 세팅해둡니다.

            const canvas_for_compose = document.getElementById('canvas_for_compose');

            //const ctx = canvas_for_compose.getContext('2d');



            gObResultCtx = ctx_result;

            gObCanvasResult = canvas_result;

            gObCanvasForCompose = canvas_for_compose;

            gObCanvasForComposeCtx = ctx;


    var gObResultCtx = ""; // 결과가 보여질 canvas 의 2D context

    var gObCanvasForComposeCtx = ""; //  합성을 위한 canvas 의 2D context 



    var gDuvetPatternId = ""; // 색칠 아이디


    // 패턴이미지를 클릭하면 실행되는 함수입니다

    // sPatternBtnId 는 선택된 패턴을 기억하기 위해 인자로 받습니다

    // sPatternImageURL 은 선택된 패턴 이미지를 canvas에 적용하기 위해 인자로 받습니다. 



    function composeImage(sPatternBtnId, sPatternImageURL) {



        // 현재 선택된 침구의 위치(이불/베개/패드 등)를 읽어옵니다. 

        var obSelectPosition = document.getElementById("select_position");



        const item = new Image(); // 합성을 위한 침구의 각 위치별 이미지를 담게 될 객체

        const pattern = new Image(); // 합성될 패턴이미지를 위한 객체 



        // 현재 선택된 침구의 위치가 이불일 경우

        // 선택된 패턴ID와 이미지URL 을 저장해 두는 이유는 

        // 침구의 형태가 스티치/프릴/보더 등으로 변경되었을 경우에도

        // 기존에 선택된 패턴이미지를 기억했다가 자동으로 세팅하기 위함입니다. 



        if (obSelectPosition.value == "이불") {

            gDuvetPatternId = sPatternBtnId; // 전역변수에 현재 선택된 이불 패턴의 아이디를 저장합니다.

            // 윗부분에서 생성한 이미지 객체에 패턴이미지와 위치이미지를 적용합니다.

            item.src = "./pattern/stitch_duvet.png"; // 패턴과 합성하기위해 이불부분만 남아있는 이미지(아래에 사진참고)

            //pattern.src = sPatternImageURL; // 선택된 패턴이미지URL



            item.onload = function () // 위치 이미지가 로드되면

            {

                pattern.onload = function () // 패턴이미지가 로드되면

                {

                    // 캔버스를 clear 시킵니다

                    gObCanvasForComposeCtx.clearRect(0, 0, 500, 500);



                    // 겹치기 모드로 변환합니다.

                    gObCanvasForComposeCtx.globalCompositeOperation = "source-over";



                    // 선택된 침구의 위치에 해당하는 이미지를 캔버스에 그립니다.

                    gObCanvasForComposeCtx.drawImage(item, 0, 0);



                    // 겹쳐지는 부분만 남고 안겹치는 부분은 투명하게 바뀌는 atop 모드로 전환합니다. 

                    gObCanvasForComposeCtx.globalCompositeOperation = "source-atop";



                    // 부드럽게 잘라내기 위해 alpha 값을 조금 낮춰줍니다

                    gObCanvasForComposeCtx.globalAlpha = .85;



                    // pattern 에 저장된 패턴이미지를 item 에 저장된 위치이미지와 합성합니다.

                    // 패턴이미지는 위치이미지보다 작기 때문에 반복적으로 이어져서 그려지도록

                    // createPattern 함수를 이용합니다. 

                    const pattern_ = gObCanvasForComposeCtx.createPattern(pattern, 'repeat');

                    // 캔버스 크기에 맞게 합성된 이미지를 채웁니다

                    gObCanvasForComposeCtx.rect(0, 0, 500, 500);

                    gObCanvasForComposeCtx.fillStyle = pattern_;

                    gObCanvasForComposeCtx.fill();



                    // 패턴합성용 캔버스에 있는 패턴이미지를 IMG 엘리먼트로 변경

                    var data = canvas_for_compose.toDataURL('image/png');



                    var ComposedImage = document.createElement('IMG');

                    ComposedImage.src = data;

                    ComposedImage.id = "composed_image_id";

                    ComposedImage.width = 100;



                    // 합성된 결과이미지를 저장할 div에 합성결과 이미지를 넣는다

                    document.getElementById('composed_image_div').appendChild(ComposedImage);



                    var obComposedImg = document.getElementById("composed_image_id");



                    // 합성결과 이미지객체가 생성완료되었으면 결과가 보여지는 canvas에 넣는다 

                    obComposedImg.onload = function () {

                        gObResultCtx.globalAlpha = 1;

                        gObResultCtx.drawImage(obComposedImg, 0, 0);



                        // 선택된 침구의 위치에 해당하는 이미지(예를들어 이불)의 굴곡 및 그라데이션이 

                        // 패턴이미지를 덮어씌운 후에도 보이게 하기위해 alpha 값은 조듬 낮춰줍니다.

                        gObResultCtx.globalAlpha = .15;

                        gObResultCtx.drawImage(item, 0, 0);

                    }

                }

            }

        }

    }
