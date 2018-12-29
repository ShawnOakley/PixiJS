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

    float circle(in vec2 _st, in float _radius){
        vec2 dist = _st-vec2(0.5);
        return 1.-smoothstep(_radius-(_radius*0.01),
                            _radius+(_radius*0.01),
                            dot(dist,dist)*4.0);
    }

    void main(){
        // vec2 st = gl_FragCoord.xy/u_resolution;
        vec2 st = gl_FragCoord.xy/vec2(500, 500);
        
        vec3 color = vec3(circle(st,0.9));

        gl_FragColor = vec4( color, 1.0 );
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});