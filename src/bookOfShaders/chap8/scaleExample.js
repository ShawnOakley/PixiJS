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
    uniform float u_time;

    mat2 scale(vec2 _scale){
        return mat2(_scale.x, 0.0, 0.0, _scale.y);
    }

    float box(in vec2 _st, in vec2 _size){
        _size = vec2(0.5) - _size*0.5;
        vec2 uv = smoothstep(_size,
                            _size+vec2(0.001),
                            _st);
        uv *= smoothstep(_size,
                        _size+vec2(0.001),
                        vec2(1.0)-_st);
        return uv.x*uv.y;
    }

    float cross(in vec2 _st, float _size){
        return  box(_st, vec2(_size,_size/4.)) +
                box(_st, vec2(_size/4.,_size));
    }    
    
    void main(){
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        vec3 color = vec3(0.0);
    
        // move space from the center to the vec2(0.0)
        st -= vec2(0.5);
        // scale the space
        st = scale( vec2(sin(u_time)+1.0) ) * st;
        // move it back to the original place
        st += vec2(0.5);
    
        // Show the coordinates of the space on the background
        // color = vec3(st.x,st.y,0.0);
    
        // Add the shape on the foreground
        color += vec3(cross(st,0.4));
    
        gl_FragColor = vec4(color,1.0);
    }
`;

var background = PIXI.Sprite.from("./../../assets/whiteBackground.png");
var simpleShader = new PIXI.Filter(null, shaderCode);   
background.scale.set(3, 6);

background.filters = [simpleShader];

app.stage.addChild(background);

app.ticker.add(function(delta) {});