uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;

uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);

  vec3 dayColor = texture(uDayTexture, vUv).rgb * 1.25;
  vec3 nightColor = texture(uNightTexture, vUv).rgb;
  vec2 cloudData = texture(uSpecularCloudsTexture, vUv).rg;

  float sunOrientation = dot(uSunDirection, normal);

  // -----------------------------------------
  // 🌍 DAY / NIGHT MIX (softened)
  // -----------------------------------------
  float dayMix = smoothstep(-0.25, 0.55, sunOrientation);

  vec3 color = mix(nightColor, dayColor, dayMix);

  // -----------------------------------------
  // 🌊 FIX: PREVENT BLACK OCEANS
  // add subtle deep ocean ambient fill
  // -----------------------------------------
  float nightMask = 1.0 - dayMix;

  vec3 oceanBlue = vec3(0.01, 0.04, 0.28);
  vec3 oceanLift = oceanBlue * nightMask * 0.6;

  color += oceanLift;

  // -----------------------------------------
  // ☁️ CLOUDS (keep your logic but soften)
  // -----------------------------------------
  float cloudMix = smoothstep(0.5, 1.0, cloudData.g * 1.05);
  cloudMix *= dayMix;

  color = mix(color, vec3(1.0), cloudMix);

  // -----------------------------------------
  // 🌫 FRESNEL / ATMOSPHERE
  // -----------------------------------------
  float fresnel = dot(viewDirection, normal) + 1.1;
  fresnel = pow(fresnel, 2.0);

  float atmosphereDayMix =
      smoothstep(-0.5, 1.0, sunOrientation);

  vec3 atmosphereColor =
      mix(
          uAtmosphereTwilightColor,
          uAtmosphereDayColor,
          atmosphereDayMix
      );

  color = mix(
      color,
      atmosphereColor,
      fresnel * atmosphereDayMix
  );

  // -----------------------------------------
  // ✨ SPECULAR HIGHLIGHT
  // -----------------------------------------
  vec3 reflection = reflect(-uSunDirection, normal);

  float specular = -dot(reflection, viewDirection);
  specular = max(specular, 0.0);
  specular = pow(specular, 10.0);

  specular *= cloudData.r * 0.7;

  vec3 specularColor =
      mix(vec3(1.0), atmosphereColor, fresnel);

  color += specular * specularColor;

  // -----------------------------------------
  // FINAL OUTPUT
  // -----------------------------------------
  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}