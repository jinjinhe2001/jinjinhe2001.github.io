---
title: "Raytracer"
collection: projects
permalink: /projects/raytracer
excerpt: "A simple raytracer from scratch written in C++, starting from a output of a pure color image, I built a simple vector computation library, defined classes for ray, hittable objects, materials(lambertian, dielectric, metal), etc. <br/><img src='/images/Raytracer.png'>"
date: 2022-09-20
---
An offline raytracing renderer based on RayTracing in One Weekend book.  
[Github](https://github.com/jinjinhe2001/RayTracer)

![Raytracer](http://jinjinhe2001.github.io/images/Raytracer.png)

## Overview 
---
An offline raytracing built from scratch, starting from a output of a pure color image, I built a functional vector library, defined classes for ray, hittable objects, materials(lambertian, dielectric, metal), etc.  

- Platform: macOS, Linux, Windows
- Dependency: g++ std=c++11
- You can build with `./build.sh`, and you will get result image in file `image.ppm`.  
---
This program utilizes a rendering technique called ray tracing, in which a large number of rays are emitted from the virtual camera and traced through the 3D scene. When these rays intersect with objects in the scene, they may be absorbed, reflected, or refracted according to the physical properties of the object. By averaging the results of multiple rays per pixel, the program can generate a high-quality image that accurately simulates the way light interacts with the objects in the scene.

## 




