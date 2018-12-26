// https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
// https://thebookofshaders.com/06/

var app = new PIXI.Application(1000, 1000);
document.body.appendChild(app.view);

var shaderCode = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    #define PI 3.14159265359
    
    vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorB = vec3(1.000,0.833,0.224);

    float plot (vec2 st, float pct){
    return  smoothstep( pct-0.01, pct, st.y) -
            smoothstep( pct, pct+0.01, st.y);
    }

    void main() {
        vec2 st = gl_FragCoord.xy/vec2(500, 500);
        vec3 color = vec3(0.0);

        vec3 pct = vec3(st.x);

        // pct.r = smoothstep(0.0,1.0, st.x);
        // pct.g = sin(st.x*PI);
        // pct.b = pow(st.x,0.5);

        color = mix(colorA, colorB, pct);

        // Plot transition lines for each channel
        color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
        color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
        color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

        gl_FragColor = vec4(color,1.0);
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});