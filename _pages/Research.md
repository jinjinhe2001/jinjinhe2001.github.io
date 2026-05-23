---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---
{% include base_path %}

# Research
<style type="text/css">
    #pubContainer{position:relative;}
    #paper{margin-top:20px;padding:10px;border-radius:5px;}
    #paper #paperimg{float:left;width:200px;display:block;margin:0 10px 0 0;padding:0;border:0}
    #paper #paperinfo{margin:0;padding:0;border:0;font-size:15px;}
    #paperinfo a{text-decoration:none;font-weight:700;}
    #abstract{position:relative;border-top:1px solid gray;width:694px;display:none;margin-top:-1px;padding:10px;background:#f0f0f0!important;border-bottom-left-radius:5px;border-bottom-right-radius:5px;font-size:14px;color:#222}
</style>

<!-- New style rendering if publication categories are defined -->
<!-- {% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %} -->
<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../hermite-ngp/static/figures/arma_teaser_compare.png" alt="hermite-ngp"/>
      </div>
      <div id='paperinfo'>
        <b>Hermite-NGP: Gradient-Augmented Hash Encoding for Learning PDEs</b><br />
        <i>ICML 2026</i><br />
        <b>Jinjin He</b>, Zhiqi Li, Sinan Wang, Bo Zhu<br />
        <a nonsmooth="1" href="https://openreview.net/pdf?id=YJsolh0zg1" class="">Paper</a>
        <a nonsmooth="1" href="../hermite-ngp/" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>

<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="https://zhiqili-cg.github.io/publication_images/trajectory_consistency.png" alt="tcg"/>
      </div>
      <div id='paperinfo'>
        <b>Trajectory Consistency for One-Step Generation on Euler Mean Flows</b><br />
        <i>ICML 2026</i><br />
        Zhiqi Li, Yuchen Sun, Duowen Chen, <b>Jinjin He</b>, Bo Zhu<br />
        <a nonsmooth="1" href="https://arxiv.org/pdf/2602.02571" class="">Paper</a>
        <a nonsmooth="1" href="https://zhiqili-cg.github.io/EulerMeanFlow_project/" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>

<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../images/OGPP.png" alt="ogpp"/>
      </div>
      <div id='paperinfo'>
        <b>Generative Modeling with Orbit-Space Particle Flow Matching</b><br />
        <i>SIGGRAPH 2026 (ACM Transactions on Graphics)</i><br />
        Sinan Wang*, <b>Jinjin He</b>*, Shenyifan Lu, Ruicheng Wang, Greg Turk, Bo Zhu(* co-first author)<br />
        <a nonsmooth="1" href="../files/OGPP.pdf" class="">Paper</a>
        <a nonsmooth="1" href="https://ogpp.sinanw.com/" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>

<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../images/PFMLS.jpg" alt="difffm"/>
      </div>
      <div id='paperinfo'>
        <b>A Level Set Method on Particle Flow Maps</b><br />
        <i>Arxiv</i><br />
        <b>Jinjin He</b>, Taiyuan Zhang, Zhiqi Li, Junwei Zhou, Duowen Chen, Bo Zhu<br />
        <a nonsmooth="1" href="https://arxiv.org/pdf/2601.09939" class="">Paper</a>
        <!-- <a nonsmooth="1" href="https://pearseven.github.io/DiffFMProject/" class="">Project Page</a> -->
      </div>
    </div>
  </div>
</p>
<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../images/difffm.jpg" alt="difffm"/>
      </div>
      <div id='paperinfo'>
        <b>An Adjoint Method for Differentiable Fluid Simulation on Flow Maps</b><br />
        <i>SIGGRAPH Asia 2025</i><br />
        Zhiqi Li*, <b>Jinjin He*</b>, Barnabás Börcsök, Taiyuan Zhang, Duowen Chen, Tao Du, Ming Lin, Greg Turk, Bo Zhu (* co-first author)<br />
        <a nonsmooth="1" href="../files/SIGA_2025__Differentiable_Flow_Map_Upload.pdf" class="">Paper</a>
        <a nonsmooth="1" href="https://pearseven.github.io/DiffFMProject/" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>
<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../images/compressible.png" alt="compressible"/>
      </div>
      <div id='paperinfo'>
        <b>Fluid Simulation on Compressible Flow Maps</b><br />
        <i>ACM Transactions on Graphics (SIGGRAPH 2025)</i><br />
        Duowen Chen*, Zhiqi Li*, Taiyuan Zhang, <b>Jinjin He</b>, Junwei Zhou, Bart G van Bloemen Waanders, Bo Zhu(* co-first author)<br />
        <a nonsmooth="1" href="https://cdwj.github.io/projects/compressible-flowmap-project-page/static/pdfs/SIG_2025__Compressible_Flow_Map_Upload.pdf" class="">Paper</a>
        <a nonsmooth="1" href="https://cdwj.github.io/projects/compressible-flowmap-project-page/index.html" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>
<p>
  <div id='pubContainer'>
    <div id='paper'>
      <div>
        <img id="paperimg" src="../files/diffmpu/image.png" alt="diffmpu"/>
      </div>
      <div id='paperinfo'>
        <b>Multi-level Partition of Unity on Differentiable Moving Particles</b><br />
        <i>ACM Transactions on Graphics (SIGGRAPH Asia 2024)</i><br />
        <b>Jinjin He</b>, Taiyuan Zhang, Hiroki Kobayashi, Atsushi Kawamoto, Yuqing Zhou, Tsuyoshi Nomura, Bo Zhu<br />
        <a nonsmooth="1" href="../files/diffmpu/SASIA_2024__Particle_PU (5).pdf" class="">Paper</a>
        <a nonsmooth="1" href="https://jinjinhe2001.github.io/diffmpu-page/index.html" class="">Project Page</a>
      </div>
    </div>
  </div>
</p>
