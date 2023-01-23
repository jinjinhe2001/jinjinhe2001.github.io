---
title: "Software renderer"
collection: projects
permalink: /projects/software-renderer
excerpt: "Designed the C++ software raster renderer with a graphic pipeline covering shading, texture, shadows, vector calculation, model storage <br/><img src='/images/renderer.png'>"
date: 2022-05-01
tag: 'graphics'
---

I implement a CPU-based software rendering pipeline system from scratch using modern computer graphics theory. The system provides interfaces for image input and output, and is platform-independent. It includes a mathematical template library with various mathematical operations for vectors and matrices, as well as a complete rendering pipeline. During the design process, I implemented a shader interface to facilitate the implementation of additional effects, while ensuring that the code structure is clear and the modules are well-divided, making the system easy to maintain and modify.

![FIFA1](http://jinjinhe2001.github.io/images/renderer.png)
## Example shader code for Blinn-Phong in our system.
```
Color Shader::FragmentShader()
{
        Light light({ 10,10,1 }, { 500,500,500 });

        Vector3f l = vector_normalize(light.GetLightV(viewPos));
        Vector3f lightIntensity = light.GetIntensity();
        Vector3f eyePos = vector_normalize(viewPos - Vector3f(0, 0, 0));
        Vector3f h = (l + eyePos) / vector_length_square(l + eyePos);
        float ka = 0.f, kd = 1.f, ks = 0.7f;
        //float r = vector_length_square(l);
        int p = 1;
        float la = 0.2f;
        normal = vector_normalize(normal);
        float ld = kd * std::max(0.f, vector_dot(normal, l));
        float ls = ks * (float)std::pow(std::max(0.f, vector_dot(normal, h)), p);
        float L = la + ld + ls;
        Color textureColor(1.0f, 1.0f, 1.0f);
        if(texture != nullptr)
                 textureColor = texture->GetColor(uvCoord.u, uvCoord.v);
                 
        return Color(color.r * L * textureColor.r, color.g * L * textureColor.g, color.b * L * textureColor.b);
}
```

[Github](https://github.com/jinjinhe2001/SoftRenderer)
