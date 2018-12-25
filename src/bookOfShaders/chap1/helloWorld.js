// please switch to `next` version to see this demo
// https://stackoverflow.com/questions/41785478/converting-pixijs-v3-abstractfilter-to-v4-filter
// https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);

var shaderCode = `
    precision mediump float;

    varying vec2 vTextureCoord;//The coordinates of the current pixel
    uniform sampler2D uSampler;//The image data

    void main(void) {
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor.r = 0.0;
    }
`;

var shaderCode2 = `
    void main() {
        gl_FragColor = vec4(0.5,0.5,1.0,0.5);
    }
`;



function CustomFilter(fragmentSource) {
    PIXI.Filter.call(this,
        null,
        fragmentSource
    );
  }
  CustomFilter.prototype = Object.create(PIXI.Filter.prototype);
  CustomFilter.prototype.constructor = CustomFilter;

var simpleShader = new CustomFilter(shaderCode);   
var face = PIXI.Sprite.from("./../../assets/face.png");

face.filters = [simpleShader];
face.scale.set(0.5);
face.anchor.set(0.5, 0.5);
face.position.set(500, 400);



app.stage.addChild(face);

app.ticker.add(function(delta) {
    face.rotation += 0.01;
});