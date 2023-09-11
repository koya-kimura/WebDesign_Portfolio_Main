precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D _CamTex;
uniform float _Time;
uniform float _MouseX;

uniform int _InputA;
uniform int _InputS;
uniform int _InputD;
uniform int _InputF;
uniform int _InputG;
uniform int _InputH;

float rand(vec2 co){
    return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);
}

void main(){
    // 座標変換------------
    vec2 uv=vTexCoord;
    uv=1.-uv;

    // 以下、エフェクトとにかく置いてみた part.1
    // mosaic
    // そもそも座標をいじれば良い
    float scale=floor(_MouseX*100.)+10.;
    uv.x=floor(uv.x*scale)/scale;
    uv.y=floor(uv.y*scale)/scale;

    // distotion
    if(_InputA==1){
        uv.x+=sin(uv.y*4.+_Time/1000.)*.3;
    }

    // mirror
    if(_InputS==1){
        uv=abs(uv*2.-1.);
    }

    // stripe
    if(_InputD==1){
        uv=vec2(.5,uv.y);
    }

    // texに焼き込み------------
    vec4 tex=texture2D(_CamTex,uv);

    // 以下、エフェクトとにかく置いてみた part.2
    // rgb shift
    if(_InputF==1){
        vec2 offset=vec2(.05);
        vec4 rTex=texture2D(_CamTex,uv-offset);
        vec4 gTex=texture2D(_CamTex,uv);
        vec4 bTex=texture2D(_CamTex,uv+offset);
        tex.rgb=vec3(rTex.r,gTex.g,bTex.b);
    }

    // invert
    if(_InputG==1){
        tex.rgb=1.-tex.rgb;
    }

    // モノクロ
    if(_InputH==1){
        float gray=(tex.r+tex.g+tex.b)/3.;
        tex.rgb=vec3(gray);
    }

    // 吐き出し------------
    gl_FragColor=tex;
}