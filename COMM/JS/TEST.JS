
    const canvas = document.getElementById('jsCanvas');
    // const canvasImg = document.querySelector(".canvas2"); // 글자 이미지를 담은 캔버스

    const ctx = canvas.getContext('2d'); //context는 안에서 픽셀 컨트롤
    // const ctxImg = canvasImg.getContext("2d");// 글자 이미지를 담은 캔버스
    const colors = document.getElementsByClassName('jsColor'); //HTML Collection이 생긴다
    const range = document.getElementById('jsRange');
    // const mode = document.getElementById('jsMode');
    // const saveBtn = document.getElementById('jsSave');

    ctx.beginPath();
    ctx.arc(80,50,100,0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();


    const INITIAL_COLOR = '#2c2c2c';
    const CANVAS_SIZE = 400;

    //canvas에게 높이와, 너비를 지정해준다
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.fillStyle = 'white'; //canvas 기본 배경색을 흰색으로 한다
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = INITIAL_COLOR; //context안에 있는 선의 색
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 5; //context안에 있는 선의 너비

    let painting = false; //그리기 기본값을 false로 한다
    let filling = false; //채우기 기본값은 false

    let image = new Image();
    image.onload = () => {
        ctx.drawImage(image, 0,0,240,223)
    }
    image.src = '../../COMM/IMG/WORD/1_1/WORD_1_1_1.PNG';
    // ctx.globalCompositeOperation = "source-atop";

    //  var img = new Image();
    // img.onload = function(){
    // context.drawImage(img, 0,0,240,223);
    // }
    // img.src = "http://example.com/image/bobtail-1503869_960_720.png";


    function stopPainting() {
        painting = false; //그리기를 멈춘다
    }

    function startPainting() {
        painting = true;
    }

    function onMouseMove(event) {
        const x = event.offsetX; //offset은 캔버스만 관계된 좌표
        const y = event.offsetY;
        if (!painting) {
            //그림 그리지 않을때
            ctx.beginPath(); //path(선)의 시작
            ctx.moveTo(x, y); //(보이진 않지만) 이동할때 좌표생성
        } else {
            ctx.lineTo(x, y); //lineTo의 좌표에 path가 그려진다(보이진 않지만)
            ctx.stroke(); //stroke는 path를 선으로 그린다
        } //lineTo와 stroke는 마우스를 움직일때마다 생긴다
    }

    function handleColorClick(event) {
        // const color = event.target.style.backgroundColor;
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        const color = event.target.dataset.color;
        ctx.strokeStyle = color; //선의 색을 클릭한 색으로 바꾼다
        ctx.fillStyle = ctx.strokeStyle; //채우기 색과  선의 색이 같게 한다
    }

    function handleRangeChange(event) {
        const size = event.target.value;
        ctx.lineWidth = size;
    }

    //채우기 버튼
    // function handleModeClick() {
    //     if (filling === true) {
    //         //채우기가 아님이 맞을때
    //         filling = false; //채우기 실행
    //         mode.innerText = 'Fill'; //mode 버튼의 글자를 fill로 바꾼다
    //     } else {
    //         filling = true;
    //         mode.innerText = 'Paint';
    //     }
    // }

    //캔버스 클릭 배경 채우기
    // function handleCanvasClick() {
    //     if (filling) {
    //         //채우기가 false일때 = 그리기일때
    //         ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); //fillRect(): 캔버스 사이즈만큼 사각형 채운다
    //     }
    // }

    //오른쪽 저장 버튼 재설정
    // function handleCM(event) {
    //     event.preventDefault(); //기본값 막음: 오른쪽 클릭해도 저장버튼 안뜬다
    // }

    //저장하기
    // function handleSaveClick() {
    //     const image = canvas.toDataURL(); //캔버스의 데이터를 URL로 이미지 만든다, 기본값은 png
    //     const link = document.createElement('a');
    //     link.href = image; //download는 이름으로 지정해야 한다
    //     link.download = 'PaintJS[🎨]'; //download는 a의 속성이다, 링크로 다운로드하라고 한다, URL 대신에
    //     link.click(); //Fake 클릭
    // }

    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove); //마우스 움직일때
        canvas.addEventListener('mousedown', startPainting); //클릭했을때
        canvas.addEventListener('mouseup', stopPainting); //마우스 뗐을때
        canvas.addEventListener('mouseleave', stopPainting); //캔버스를 벗어났을때
        // canvas.addEventListener('click', handleCanvasClick); //클릭했을때 캔버스
        // canvas.addEventListener('contextmenu', handleCM); //클릭했을때 저장
    }

    Array.from(colors).forEach((color) =>
        color.addEventListener('click', handleColorClick),
    );

    //input을 조절했을때, 함수가 실행된다
    if (range) {
        range.addEventListener('input', handleRangeChange);
    }

    //저장 버튼 클릭했을때, 함수 실행 // 로컬 스토리지에 저장
    // if (saveBtn) {
    //     saveBtn.addEventListener('click', handleSaveClick);
    // }