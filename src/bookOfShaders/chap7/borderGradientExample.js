// https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
// https://thebookofshaders.com/07/

var app = new PIXI.Application(1000, 1000);
document.body.appendChild(app.view);

var shaderCode = `
    // Author @patriciogv - 2015
    // http://patriciogonzalezvivo.com

    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    void main(){
        // vec2 st = gl_FragCoord.xy/u_resolution;
        vec2 st = gl_FragCoord.xy/vec2(500, 500)
        float pct = 0.0;

        // a. The DISTANCE from the pixel to the center
        pct = distance(st,vec2(0.5));

        // b. The LENGTH of the vector
        //    from the pixel to the center
        // vec2 toCenter = vec2(0.5)-st;
        // pct = length(toCenter);

        // c. The SQUARE ROOT of the vector
        //    from the pixel to the center
        // vec2 tC = vec2(0.5)-st;
        // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

        vec3 color = vec3(pct);

        gl_FragColor = vec4( color, 1.0 );
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});