// https://github.com/pixijs/pixi.js/wiki/v4-Creating-Filters
// https://thebookofshaders.com/08/

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

    // YUV to RGB matrix
    mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                        1.0, -0.39465, -0.58060,
                        1.0, 2.03211, 0.0);
    
    // RGB to YUV matrix
    mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722,
                        -0.09991, -0.33609, 0.43600,
                        0.615, -0.5586, -0.05639);
    
    
    void main(){
        // vec2 st = gl_FragCoord.xy/u_resolution;
        vec2 st = gl_FragCoord.xy/vec2(500, 500);
        
        // UV values goes from -1 to 1
        // So we need to remap st (0.0 to 1.0)
        st -= 0.5;  // becomes -0.5 to 0.5
        st *= 2.0;  // becomes -1.0 to 1.0
    
        // we pass st as the y & z values of
        // a three dimensional vector to be
        // properly multiply by a 3x3 matrix
        color = yuv2rgb * vec3(0.5, st.x, st.y);
    
        gl_FragColor = vec4(color,1.0);

    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});