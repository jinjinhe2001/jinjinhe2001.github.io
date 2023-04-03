---
title: "simulations"
collection: projects
permalink: /projects/simulations
excerpt: "Some interesting simulations I have implemented. 1. rigid body + cloth 2. stable fluid 3. sound propagation <br/><img src='/images/simulations.png'>"
date: 2023-03-15
tag: 'graphics'
---
## Physics Allolib
Physics Allolib is a toy physical engine written in C++ as a final project for UC Santa Barbara's MAT201B course. It includes some physics simulation like rigid bodies, collisions and cloth simulation, and I implemented octree for  accelerating the collisions. And this project supports UCSB MAT's [AlloSphere](https://allosphere.ucsb.edu/) which is a 3D, 360-degree immersive Research Facility.


<video width="100%" height="auto" controls>
    <source src="https://user-images.githubusercontent.com/72654824/229410006-9491a1cb-9ab0-4b46-a83a-ac25c65b9b07.mp4" type="video/mp4">
</video>

## stable fluid
I implemented stable fluid with taichi. reference: Stam, Jos. (2001). Stable Fluids. ACM SIGGRAPH 99. 1999. 10.1145/311535.311548.  

<video width="100%" height="auto" controls>
    <source src="https://user-images.githubusercontent.com/72654824/229418186-fa37bd12-5759-4464-976d-f723e3dc665b.mp4" type="video/mp4">
</video>

## sound propagation
Sound Propagation is a C++ program that simulates sound propagation also as a final project for UC Santa Barbara's MAT240B course. The program includes features such as sound absorption, reflection, diffraction(yet to implement), and reverb to create a realistic acoustic environment for user.  reference: - http://gamma.cs.unc.edu/GSOUND/gsound_aes41st.pdf

<video width="100%" height="auto" controls>
    <source src="https://user-images.githubusercontent.com/72654824/229414823-158429df-9f83-40ad-8352-50fe9bcf307f.mp4" type="video/mp4">
</video>