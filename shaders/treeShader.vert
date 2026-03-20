#version 410 core

layout(location = 0) in vec3 vPosition;
layout(location = 1) in vec3 vNormal;
layout(location = 2) in vec2 vTexCoords;

out vec4 fPosEye;
out vec3 fNormal;
out vec2 fTexCoords;
out vec4 fragPosLightSpace;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat3 normalMatrix;
uniform mat4 lightSpaceTrMatrix;
uniform float time;
uniform bool windEnabled;

void main()
{
    vec3 pos = vPosition;

    float heightFactor = clamp(pos.y / 6.0, 0.0, 1.0);
    float wind = 0.0;

    if (windEnabled){
    	wind = sin(time * 2.5 + pos.x * 0.8 + pos.z * 0.8) * 0.15;
    }
    pos.x += wind * heightFactor;
    pos.z += wind * heightFactor;

    vec4 worldPos = model * vec4(pos, 1.0);

    fPosEye = view * worldPos;
    fNormal = normalize(normalMatrix * vNormal);
    fTexCoords = vTexCoords;
    fragPosLightSpace = lightSpaceTrMatrix * worldPos;

    gl_Position = projection * fPosEye;
}