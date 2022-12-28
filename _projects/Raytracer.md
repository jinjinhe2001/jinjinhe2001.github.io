---
title: "Raytracer"
collection: projects
permalink: /projects/raytracer
excerpt: "A simple raytracer from scratch written in C++, starting from a output of a pure color image, I built a simple vector computation library, defined classes for ray, hittable objects, materials(lambertian, dielectric, metal), etc. <br/><img src='/images/Raytracer.png'>"
date: 2022-09-20
---
An offline raytracing renderer based on RayTracing in One Weekend book.  
- [Github](https://github.com/jinjinhe2001/RayTracer)
- [Overview](#overview)
- [Rendering](#rendering)
- [Interaction between rays and the scene](#interaction-between-rays-and-the-scene)
- [Object](#object)
- [Material](#material)
- [Result](#result)

![Raytracer](http://jinjinhe2001.github.io/images/Raytracer.png)

## Overview 
An offline raytracing built from scratch, starting from a output of a pure color image, I built a functional vector library, defined classes for ray, hittable objects, materials(lambertian, dielectric, metal), etc.  

- Platform: macOS, Linux, Windows
- Dependency: g++ std=c++11
- You can build with `./build.sh`, and you will get result image in file `image.ppm`.  
  
---
This program utilizes a rendering technique called ray tracing, in which a large number of rays are emitted from the virtual camera and traced through the 3D scene. When these rays intersect with objects in the scene, they may be absorbed, reflected, or refracted according to the physical properties of the object. By averaging the results of multiple rays per pixel, the program can generate a high-quality image that accurately simulates the way light interacts with the objects in the scene.

## Rendering 

In `main.cpp`, here is the core code for rendering.
```
for (int j = image_height - 1; j >= 0; j--) {
    std::cerr << "\rScanlines remaining: " << j << std::flush;
    for (int i = 0; i < image_width; ++i) {
        color pixel_color = color(0, 0, 0);
        for (int s = 0; s < samples_per_pixel; s++) {
            auto u = (i + random_double()) / (image_width - 1);
            auto v = (j + random_double()) / (image_height - 1);
            ray r = cam.get_ray(u, v);
            pixel_color += ray_color(r, world, max_depth);
        }
        write_color(std::cout, pixel_color, samples_per_pixel);
    }
}
```
This code scans pixel by pixel from `(0, image_height - 1)` coordinates of the preset screen, and in each pixel this code emits `samples_per_pixel` rays with tiny deviation values on direction, the `ray_color` function can complete the interaction between rays and the scene and return color.

## Interaction between rays and the scene
The `ray_color` function takes in three parameters: a `const ray& r` representing an incoming light ray, and a `const hittable& world` representing the 3D scene. a `depth` to limit number of recursions. The function processes these inputs to determine the color of the pixel corresponding to the ray.
```
color ray_color(const ray& r, const hittable& world, int depth) {
    hit_record rec;
    // prevent from looping forever
    if (depth <= 0) {
        return color(0, 0, 0);
    }

    if (world.hit(r, 0.001, infinity, rec)) {
        ray scattered;
        color attenuation;
        if (rec.mat_ptr->scatter(r, rec, attenuation, scattered))
            return attenuation * ray_color(scattered, world, depth - 1);
        return color(0, 0, 0);
    }
    vec3 unit_direction = unit_vector(r.direction());
    auto t = 0.5 * (unit_direction.y() + 1.0);
    return (1.0 - t) * color(1.0, 1.0, 1.0) + t * color(0.5, 0.7, 1.0);
}
```
The `world.hit(r, 0.001, infinity, rec)` will find object which is first to be hit by the ray and return it in `rec` structure.

`rec.mat_ptr->scatter(r, rec, attenuation, scattered)` could call this object's material and interact with ray based on the way of this material. If this material can reflect or refract ray, then it will call `ray_color` again and mix these color until the ray end.
## Object
For objects, which primarily serve the function of collision detection with rays, I mainly focused on implementing collision detection for sphere.

Example code for sphere.
```

class sphere : public hittable
{
public:
    sphere() {}
    sphere(point3 cen, double r, shared_ptr<material> m) : 
        center(cen), radius(r), mat_ptr(m) {}

    virtual bool hit(const ray& r, double t_min, double t_max, hit_record& rec) const override;
public:
    point3 center;
    double radius;
    shared_ptr<material> mat_ptr;
};

bool sphere::hit(const ray& r, double t_min, double t_max, hit_record& rec) const {
    vec3 oc = r.origin() - center;
    auto a = r.direction().length_squared();
    auto half_b = dot(oc, r.direction());
    auto c = oc.length_squared() - radius * radius;
    auto discriminant = half_b * half_b - a * c;

    if (discriminant < 0) return false;
    auto sqrtd = sqrt(discriminant);

    auto root = (-half_b - sqrtd) / a;
    if (root < t_min || t_max < root) {
        root = (-half_b + sqrtd) / a;
        if (root < t_min || t_max < root) {
            return false;
        }
    }

    rec.t = root;
    rec.p = r.at(rec.t);
    rec.normal = (rec.p - center) / radius;
    vec3 outward_normal = (rec.p - center) / radius;

    rec.set_face_normal(r, outward_normal);
    rec.mat_ptr = mat_ptr;
    
    return true;
}
```

## Material
I implement three different materials inherited from base class.  
Here's the example code of metal material.
```
class metal : public material
{
public:
    metal(const color& a, double f) : albedo(a), fuzz(f < 1 ? f : 1) {}
    
    virtual bool scatter(
        const ray& r_in, const hit_record& rec, color& attenuation, ray& scattered
    ) const override {
        vec3 reflected = reflect(unit_vector(r_in.direction()), rec.normal);
        scattered = ray(rec.p, reflected + fuzz * random_in_unit_sphere());
        attenuation = albedo;
        return (dot(scattered.direction(), rec.normal) > 0);
    }
public:
    color albedo;
    double fuzz;
};
```

## Result

- red sphere  
![a red sphere](http://jinjinhe2001.github.io/images/raytracer/redSphere.png)
- normal-color sphere  
![normal color sphere](http://jinjinhe2001.github.io/images/raytracer/normalsColoredSphere.png)
- after sampled  
![sampled normal sphere](http://jinjinhe2001.github.io/images/raytracer/sampledNormalSphere.png)
- diffuse sphere  
![diffuse sphere](http://jinjinhe2001.github.io/images/raytracer/diffuseSphere.png)
![gamma diffuse](http://jinjinhe2001.github.io/images/raytracer/gammaDiffuseSphere.png)
- metal sphere  
![metal sphere](http://jinjinhe2001.github.io/images/raytracer/materialSpheres.png)  
fuzzier  
![metal fuzz](http://jinjinhe2001.github.io/images/raytracer/metalFuzzSpheres.png)
- dielecticShperes  
![dielectic](http://jinjinhe2001.github.io/images/raytracer/dielectricShperes.png)
- depth of field  
![DOF](http://jinjinhe2001.github.io/images/raytracer/depthOfField.png)
![zoom in](http://jinjinhe2001.github.io/images/raytracer/zoomIn.png)
- final  
![final](http://jinjinhe2001.github.io/images/raytracer/final.png)
