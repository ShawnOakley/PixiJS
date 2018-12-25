// https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
// https://thebookofshaders.com/05/

var app = new PIXI.Application(1000, 1000);
document.body.appendChild(app.view);

var shaderCode = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359

    float plot(vec2 st, float pct){
    return  smoothstep( pct-0.02, pct, st.y) -
            smoothstep( pct, pct+0.02, st.y);
    }

    void main() {
        vec2 st = gl_FragCoord.xy/vec2(500, 500);

        // Step will return 0.0 unless the value is over 0.5,
        // in that case it will return 1.0
        float y = step(0.5,st.x);

        vec3 color = vec3(y);

        float pct = plot(st,y);
        color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

        gl_FragColor = vec4(color,1.0);
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});