#version 410 core

in vec3 fNormal;
in vec4 fPosEye;
in vec2 fTexCoords;
in vec4 fragPosLightSpace;

out vec4 fColor;

uniform vec3 lightDir;
uniform vec3 lightColor;

uniform sampler2D texture_diffuse1;
uniform sampler2D shadowMap;

uniform float ambientStrength;

uniform vec3 spotPos; 
uniform vec3 spotDir;    
uniform vec3 spotColor;
uniform float spotCutOff;       
uniform float spotOuterCutOff;  
uniform bool spotEnabled;

float specularStrength = 0.5;
float shininess = 32.0;

uniform bool fogEnabled;
uniform vec3 fogColor;
uniform float fogDensity;

uniform bool shadowsEnabled;

float computeShadow(vec3 normalEye, vec3 lightDirN)
{
    vec3 projCoords = fragPosLightSpace.xyz / fragPosLightSpace.w;
    projCoords = projCoords * 0.5 + 0.5;

    if (projCoords.z > 1.0)
        return 0.0;

    float closestDepth = texture(shadowMap, projCoords.xy).r;
    float currentDepth = projCoords.z;

    float bias = max(0.01 * (1.0 - dot(normalEye, lightDirN)), 0.002);
    return currentDepth - bias > closestDepth ? 1.0 : 0.0;
}

float computeFogFactor(float distEye)
{
     float fog = 1.0 - exp(-fogDensity * distEye);
     return clamp(fog, 0.0, 1.0);
}

void main()
{
    vec3 normalEye = normalize(fNormal);
    vec3 viewDir   = normalize(-fPosEye.xyz);
    vec3 lightDirN = normalize(lightDir);

    vec3 texColor = texture(texture_diffuse1, fTexCoords).rgb;

    vec3 ambient = ambientStrength * lightColor;

    float diff = max(dot(normalEye, lightDirN), 0.0);
    vec3 diffuse = diff * lightColor;

    vec3 reflectDir = reflect(-lightDirN, normalEye);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * lightColor;

    float shadow = 0.0;
    if (shadowsEnabled)
    {
    	shadow = computeShadow(normalEye, lightDirN);
    	shadow = clamp(shadow * 4.0, 0.0, 1.0);
    }

    float shadowStrength = 0.85;

    vec3 lighting = ambient * texColor + (diffuse * 2.2 + specular * 1.5) * texColor;
    vec3 color = lighting * (1.0 - shadow * shadowStrength);

    if (spotEnabled)
    {
        vec3 lightDirP = normalize(spotPos - fPosEye.xyz);
        float theta = dot(lightDirP, normalize(-spotDir));

        float epsilon = spotCutOff - spotOuterCutOff;
        float intensity = clamp((theta - spotOuterCutOff) / epsilon, 0.0, 1.0);

        float diffP = max(dot(normalEye, lightDirP), 0.0);
        vec3 diffuseP = diffP * spotColor * intensity;

        vec3 reflectP = reflect(-lightDirP, normalEye);
        float specP = pow(max(dot(viewDir, reflectP), 0.0), shininess);
        vec3 specularP = specularStrength * specP * spotColor * intensity;

        float spotShadowFactor = shadowsEnabled ? (1.0 - shadow) : 1.0;
	color += spotShadowFactor * (diffuseP * 1.0 + specularP * 0.6);

    }

    if(fogEnabled)
    {
	float distEye = length(fPosEye.xyz);
	float fogFactor = computeFogFactor(distEye);
	color = mix(color, fogColor, fogFactor);
    }

    fColor = vec4(color, 1.0);
}
