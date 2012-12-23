function createCube()
{
  var tmp = {
    vertexPositionBuffer : 0,
    vertexTextureCoordBuffer : 0,
    vertexIndexBuffer : 0
  };
  tmp.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tmp.vertexPositionBuffer);
  vertices = [
      // Front face
      -1.0, -1.0, 1.0,
	1.0, -1.0, 1.0,
	1.0, 1.0, 1.0,
      -1.0, 1.0, 1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0, 1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, -1.0, -1.0,

      // Top face
      -1.0, 1.0, -1.0,
      -1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
	1.0, -1.0, -1.0,
	1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,

      // Right face
	1.0, -1.0, -1.0,
	1.0, 1.0, -1.0,
	1.0, 1.0, 1.0,
	1.0, -1.0, 1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0,
      -1.0, 1.0, -1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  tmp.vertexPositionBuffer.itemSize = 3;
  tmp.vertexPositionBuffer.numItems = 24;

  tmp.vertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tmp.vertexTextureCoordBuffer);
  var textureCoords = [
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,

    // Back face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Top face
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,

    // Bottom face
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,

    // Right face
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    0.0, 0.0,

    // Left face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  tmp.vertexTextureCoordBuffer.itemSize = 2;
  tmp.vertexTextureCoordBuffer.numItems = 24;

  tmp.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tmp.vertexIndexBuffer);
  var vertexIndices = [
      0, 1, 2, 0, 2, 3, // Front face
      4, 5, 6, 4, 6, 7, // Back face
      8, 9, 10, 8, 10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Right face
      20, 21, 22, 20, 22, 23 // Left face
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
  tmp.vertexIndexBuffer.itemSize = 1;
  tmp.vertexIndexBuffer.numItems = 36;
  return tmp;
}

function createPlane(scale)
{
  var tmp = {
    vertexPositionBuffer : 0,
    vertexTextureCoordBuffer : 0,
    vertexIndexBuffer : 0
  };
  tmp.vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tmp.vertexPositionBuffer);
  vertices = [
      // Front face
      -1.0*scale, -1.0*scale, 1.0*scale,
	1.0*scale, -1.0*scale, 1.0*scale,
	1.0*scale, 1.0*scale, 1.0*scale,
      -1.0*scale, 1.0*scale, 1.0*scale,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  tmp.vertexPositionBuffer.itemSize = 3;
  tmp.vertexPositionBuffer.numItems = 4;

  tmp.vertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tmp.vertexTextureCoordBuffer);
  var textureCoords = [
    // Front face
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
  tmp.vertexTextureCoordBuffer.itemSize = 2;
  tmp.vertexTextureCoordBuffer.numItems = 4;

  tmp.vertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tmp.vertexIndexBuffer);
  var vertexIndices = [
      0, 1, 2, 0, 2, 3, // Front face
  ];
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
  tmp.vertexIndexBuffer.itemSize = 1;
  tmp.vertexIndexBuffer.numItems = 6;
  return tmp;
}

function WorldObject(xPos, yPos, zPos, texIndex)
{
  this.xPos = xPos;
  this.yPos = yPos;
  this.zPos = zPos;
  this.texIndex = texIndex;
}

function handleLoadedTexture(texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

function loadTextures(filenames)
{
  var textures = new Array();
  for(var i=0; i<filenames.length; i++)
  {
    var loadTexture = function(filename)
    {
      t = gl.createTexture();
      t.image = new Image();
      t.image.onload = function ()
      {
	handleLoadedTexture(t);
      }
      t.image.src = filename;
      return t;
    }
    var tmp = loadTexture(filenames[i]);
    textures.push(tmp);
  }
  return textures;
}

WorldObject.prototype.draw = function(model)
{
  var texture = artgift.textures[this.texIndex];

  mat4.identity(mvMatrix);
  mat4.translate(mvMatrix, [this.xPos, this.yPos, this.zPos]);

  gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, model.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexTextureCoordBuffer);
  gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, model.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(shaderProgram.samplerUniform, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.vertexIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, model.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
  currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
  currentlyPressedKeys[event.keyCode] = false;
}

var pitchRate;
var yamRate;

function handleKeys()
{
  if (currentlyPressedKeys[33]) {
    // Page Up
    pitchRate = 0.1;
  } else if (currentlyPressedKeys[34]) {
    // Page Down
    pitchRate = -0.1;
  } else {
    pitchRate = 0;
  }

  if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
    // Left cursor key or A
    yawRate = 0.1;
  } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
    // Right cursor key or D
    yawRate = -0.1;
  } else {
    yawRate = 0;
  }
}

var artgift = {
  cam : 0,
  textures : 0,
  cubeModel : 0,
  planeModel : 0,
  cubeObjects : 0,
  planeObjects : 0,
  initCam : function()
  {
    var tmp = {
      xPos : 0, 
      zPos : 0,
      yPos : 0, 
      yaw : 0,
      pitch : 0
    };
    artgift.cam = tmp;
  },
  initModels : function()
  {
    artgift.cubeModel = createCube();
    artgift.planeModel = createPlane(10);
  },
  initTextures : function()
  {
    var filenames = ["eskil.png", "eskil.png", "eskil.png"];
    artgift.textures = loadTextures(filenames);
  },
  initWorldObjects : function()
  {
    artgift.cubeObjects = new Array();  
    for(var iy=0; iy<16; iy++)
    {
      for(var ix=0; ix<16; ix++)
      {
	var rn = Math.floor(Math.random()*4);
	var tmp = new WorldObject(20 - ix*3, 20 - iy*3, -80, rn);
	artgift.cubeObjects.push(tmp);
      }
    }
    artgift.planeObjects = [new WorldObject(0, 0, -80, 1)];
  },
  drawScene : function()
  {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    
    mat4.rotate(mvMatrix, degToRad(-artgift.cam.pitch), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(-artgift.cam.yaw), [0, 1, 0]);
    mat4.translate(mvMatrix, [-artgift.cam.xPos, -artgift.cam.yPos, -artgift.cam.zPos]);

    for(var i=0; i<artgift.cubeObjects.length; i++)
    {
      artgift.cubeObjects[i].draw(artgift.cubeModel);
    }
  },
  init : function()
  {
    var canvas = document.getElementById("webgl-canvas");
    initGL(canvas);
    initShaders();
    artgift.initCam();
    artgift.initModels();
    artgift.initTextures();
    artgift.initWorldObjects();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
  }
};

function tick()
{
  requestAnimFrame(tick);
  handleKeys();
  artgift.drawScene();
  artgift.cam.xPos -= Math.sin(degToRad(artgift.cam.yaw));
  artgift.cam.zPos -= Math.cos(degToRad(artgift.cam.yaw));
  artgift.cam.yPos = Math.sin(degToRad(artgift.cam.yaw));

  artgift.cam.yaw += yawRate;
  artgift.cam.pitch += pitchRate;
}

function start()
{
  artgift.init()
  tick();
}