// please switch to `next` version to see this demo
// https://stackoverflow.com/questions/41785478/converting-pixijs-v3-abstractfilter-to-v4-filter
// https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html
// https://blog.cjgammon.com/custom-filters-with-pixi-js-using-glsl-shaders
var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);

var shaderCode = `

    uniform float u_time;
    precision mediump float;

    varying vec2 vTextureCoord;//The coordinates of the current pixel
    uniform sampler2D uSampler;//The image data
    
    void main() {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
        gl_FragColor.r = sin(u_time* 0.3 * gl_FragCoord.y) * gl_FragColor.r;
        gl_FragColor.g = sin(u_time* 0.4 * gl_FragCoord.y) * gl_FragColor.g;
        gl_FragColor.b = -sin(u_time* 0.2 * gl_FragCoord.y)* gl_FragColor.b;
    }
`;

// Above code checks for '0' value (i.e., black) and doesn't apply color my multiplying
// with time uniform

var simpleShader = new PIXI.Filter(null, shaderCode, {u_time: 0});   
var face = PIXI.Sprite.from("./../../assets/face.png");

face.filters = [simpleShader];
face.scale.set(0.5);
face.anchor.set(0.5, 0.5);
face.position.set(500, 400);

app.stage.addChild(face);
var time = 0
app.ticker.add(function(delta) {
    time += 0.1
    face.rotation += 0.01;
    simpleShader.uniforms.u_time = time;
});