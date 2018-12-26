// https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
// https://thebookofshaders.com/06/

var app = new PIXI.Application(1000, 1000);
document.body.appendChild(app.view);

var shaderCode = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform float u_time;

    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    void main() {
        vec3 color = vec3(0.0);

        float pct = abs(sin(u_time));

        // Mix uses pct (a value from 0-1) to
        // mix the two colors
        color = mix(colorA, colorB, pct);

        gl_FragColor = vec4(color,1.0);
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

var time = 0

app.ticker.add(function(delta) {
    time += 0.01;
    simpleShader.uniforms.u_time = time;
});