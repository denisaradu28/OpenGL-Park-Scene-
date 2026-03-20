# OpenGL-Park-Scene

## Overview
This project represents an interactive 3D urban park environment developed using OpenGL and Blender. The main goal of the project is to demonstrate fundamental concepts of computer graphics, including 3D modeling, geometric transformations, lighting, animation, and user interaction.

The application allows users to freely explore a virtual park scene and experience dynamic environmental effects such as rain, fog, and day/night transitions.

---

## Features

- Free camera movement (W, A, S, D + mouse)
- Day / Night cycle with different lighting conditions
- Directional light (sun) + point lights (lamps)
- Fog effect implemented in shaders
- Procedural rain particle system
- Wind simulation affecting dynamic objects
- Intro animation at application startup
- Multiple 3D objects: trees, benches, alleys, lamps, a statue
- Skybox with day and night textures
- Shadow mapping for directional light
- Multiple rendering modes

---

## Technologies Used

- OpenGL – rendering engine
- C/C++ – application logic
- GLM – mathematical computations
- Blender – 3D modeling
- GLSL – shaders (vertex & fragment)

---

## Implementation Details

The project is built using the modern OpenGL pipeline with programmable shaders, allowing full control over rendering stages.

- Transformations are handled using model, view, and projection matrices
- Lighting is based on the Blinn-Phong model
- Shadows are computed only for directional light to balance performance and realism
- Fog is implemented in shaders for better visual control
- Rain is generated procedurally using a particle system
- Collision is simplified (scene boundaries + ground only)

This approach ensures a balance between performance, visual quality, and code clarity.

---

## Project Structure (Conceptual)

- Camera – handles movement and orientation
- Shader – manages shader compilation and usage
- Model3D – loads and renders 3D models
- SkyBox – renders the environment background

---

## Controls

| Action | Key |
|------|-----|
| Move | W, A, S, D |
| Look around | Mouse |
| Toggle Day/Night | N |
| Toggle Fog | G |
| Toggle Rain | R |
| Toggle Wind | V |
| Replay intro animation | P |
| Rendering modes | 1, 2, 3, 4 |

### Object Transformations

- Scale: Z, X
- Translate: Arrow Keys
- Rotate: Q, E

---

## Preview

Add screenshots or GIFs here.

---

##  How to Run

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
```

2. Open the project in your preferred IDE (e.g. Visual Studio / CLion)

3. Make sure dependencies are installed:
- OpenGL
- GLM
- GLFW / GLEW (if used)

4. Build and run the project

---

## Purpose

This project was developed as part of a computer graphics course, aiming to apply theoretical knowledge in a practical 3D application.

---

## Future Improvements

- Add reflections on wet surfaces
- Improve the collision detection system
- Optimize rendering for larger scenes
- Add more interactive elements

---

## References

- OpenGL Documentation – https://www.opengl.org/documentation/
- GLM Library – https://github.com/g-truc/glm
- Blender Documentation – https://docs.blender.org
