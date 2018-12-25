// please switch to `next` version to see this demo

var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);

var geometry = new PIXI.Geometry()
.addAttribute('aVertexPosition',  // the attribute name
              [-100, -100,   // x, y
                100, -100,   // x, y
                100 , 100]) // x, y

.addAttribute('aUvs',  // the attribute name
              [0, 0,  // u, v
               1, 0,  // u, v
               1, 1]) // u, v

// var shader = new PIXI.Shader.from(`
//     void main() {
//         gl_FragColor = vec4(1.0,0.0,1.0,1.0);
//     }
// `)

var shaderCode = `
    void main() {
        gl_FragColor = vec4(0.5,0.5,1.0,1.0);
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

face.position.set(400, 300);
face.scale.set(2);

face.filters = [simpleShader];

app.stage.addChild(face);

app.ticker.add(function(delta) {
    face.rotation += 0.01;
});