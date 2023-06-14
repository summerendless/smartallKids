(function() {
  // manually initialize 2 filter backend to give ability to switch:
  var webglBackend;
  var filters;
  try {
    webglBackend = new fabric.WebglFilterBackend();
  } catch (e) {
    console.log(e)
  }
  var canvas2dBackend = new fabric.Canvas2dFilterBackend()

  fabric.filterBackend = fabric.initFilterBackend();
  fabric.Object.prototype.transparentCorners = false;
  var $ = function(id){return document.getElementById(id)};

  function applyFilter(index, filter) {
    var obj = canvas.getActiveObject();
    obj.filters[index] = filter;
    var timeStart = +new Date();
    obj.applyFilters();
    var timeEnd = +new Date();
    var dimString = canvas.getActiveObject().width + ' x ' +
      canvas.getActiveObject().height;
      parseFloat(timeEnd-timeStart) + 'ms';
    canvas.renderAll();
  }

  function getFilter(index) {
    var obj = canvas.getActiveObject();
    return obj.filters[index];
  }

  function applyFilterValue(index, prop, value) {
    var obj = canvas.getActiveObject();
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      var timeStart = +new Date();
      obj.applyFilters();
      var timeEnd = +new Date();
      var dimString = canvas.getActiveObject().width + ' x ' +
        canvas.getActiveObject().height;
        parseFloat(timeEnd-timeStart) + 'ms';
      canvas.renderAll();
    }
  }

  //fabric.Object.prototype.padding = 5;
  fabric.Object.prototype.transparentCorners = false;

      f = fabric.Image.filters;

  canvas.on({
    'selection:created': function(e) {
        e.preventDefault();
      if(e.target && e.target.type === "image"){
          fabric.util.toArray(document.getElementsByClassName('img_input'))
                              .forEach(function(el){ el.disabled = false; })
  
          var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
                          'brightness', 'contrast', 'saturation', 'noise', 'vintage',
                          'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
                          'polaroid', 'blend-color', 'gamma', 'kodachrome',
                          'blackwhite', 'blend-image', 'hue', 'resize'];
  
          for (var i = 0; i < filters.length; i++) {
          $(filters[i]) && (
          $(filters[i]).checked = !!canvas.getActiveObject().filters[i]);
          }
      }

    },
    'selection:cleared': function(e) {
        e.preventDefault();
      fabric.util.toArray(document.getElementsByClassName('img_input'))
                          .forEach(function(el){ el.disabled = true; })
    }
  }, {passive: false});


  // var indexF;
  // $('webgl').onclick = function() {
  //   if (this.checked) {
  //     fabric.filterBackend = webglBackend;
  //   } else {
  //     fabric.filterBackend = canvas2dBackend;
  //   }
  // };
  
  // $('brightness').onclick = function(){
   
  // };
  $('brightness-value').oninput = function(e) {
      e.preventDefault();
    // applyFilterValue(5, 'brightness', parseFloat(this.value));
    applyFilter(5, new f.Brightness({
      brightness: parseFloat($('brightness-value').value)
    }));
  };
  
})();