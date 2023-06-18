
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 시작 세팅

    const level = "1_1";
    let mydata = JSON.parse(JSON.stringify(data));
    let wordData = mydata[level];
    let wordUrl = wordData.itemUrl.url;
    let _fabricConfig = {
        // ....
        crossOrigin:'anonymous'
    };
    
    // let canvas = this.__canvas = new fabric.Canvas('canvas',_fabricConfig);  

  const canvas = new fabric.Canvas('canvas');
  // const canvas2 = new fabric.Canvas('canvas2');
  //  context = canvas.getContext("2d");

  // canvas.selection = false;

  const image = new fabric.Image();

  image.setSrc('../../COMM/IMG/WORD/1_1/WORD_1_1.PNG', () => {
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

  // 캔버스 크기를 이미지와 동일하게 설정
  // canvas.width = image.width;
  // canvas.height = image.height;

  // console.log(canvas.width + ',' + image.width)

  // canvas.on('path:created', function (options) {
  //   const path = options.path;
  //   if (!canvas.clipPath.containsPoint(path.getPointByOrigin('center', 'center'))) {
  //     canvas.remove(path);
  //   }
  // });


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
  // //색상 선택 끝

  // 뒤로 돌리기 기능 시작
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

  // canvas.on("object:modified", function () {
  //   if (lockHistory) return;
  //   console.log("object:modified");
  //   undo_history.push(JSON.stringify(canvas));
  //   redo_history.length = 0;
  //   console.log(undo_history.length);
  // });

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

  //Detele
  document.addEventListener("keyup", function (e) {
    console.log(e.keyCode);
    if ((e.keyCode == 8) | (e.keyCode == 46)) {
      deleteSelectedObjects();
    }
  });
  // //뒤로 돌리기 기능 끝
