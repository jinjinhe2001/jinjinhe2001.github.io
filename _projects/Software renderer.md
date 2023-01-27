---
title: "Software renderer"
collection: projects
permalink: /projects/software-renderer
excerpt: "I Implement a C++ software renderer with a graphic pipeline covering shading, texture, shadows, vector calculation, model loading.<br/><img src='/images/renderer.png'>"
date: 2022-05-01
tag: 'graphics'
---


<style>
    .mac {
        width:10px;
        height:10px;
        border-radius: 50%;
        float:left;
        margin:10px 0 0 4px;
    }
    .b1 {
        background:#E0443E;
        margin-left: 10px;
    }
    .b2 { background:#DEA123; }
    .b3 { background:#1AAB29; }
    .warpper{
        background:#3b3c3e;
        border-radius:5px;
        width:100%;
        height: 30px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    div.highlighter-rouge {
        background-color: #404040 !important;
        border-top-left-radius:0px !important;
        border-top-right-radius:0px !important;
        border: 0px !important;
        border-top: 1px solid #000000 !important;
    }
    .highlighter-rouge:before{
        display: none;
    }
    div.language-plaintext.highlighter-rouge{
        color: #b7b8ba !important;
    }

    .highlight::-webkit-scrollbar {
        width: 3px; /* 对垂直滚动条有效 */
        height: 3px;  /* 对水平滚动条有效 */
    }

    .highlight::-webkit-scrollbar-button {
        display: none;
    }

    .highlight::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #b8b9bb;
        border-radius: 5px;
    }

    .highlight::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgba(0, 0, 0, .1);
    }

    .highlight::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, .2);
    }

    .highlight::-webkit-scrollbar-corner {
        background: khaki;
    }
</style>


I implement a CPU-based software rendering pipeline system from scratch using modern computer graphics theory. The system provides interfaces for image input and output, and is platform-independent. It includes a mathematical template library with various mathematical operations for vectors and matrices, as well as a complete rendering pipeline. During the design process, I implemented a shader interface to facilitate the implementation of additional effects, while ensuring that the code structure is clear and the modules are well-divided, making the system easy to maintain and modify.    
[Github](https://github.com/jinjinhe2001/SoftRenderer)
## How to run
Git clone the code repo and open it in Visual Studio Community IDE.

![renderer](http://jinjinhe2001.github.io/images/renderer.png)
## Example shader code for Blinn-Phong in our system.

<div class="warpper">
<div class="mac b1"></div>
<div class="mac b2"></div>
<div class="mac b3"></div>
</div>

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

