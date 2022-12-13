---
permalink: /
title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hi! I am a fourth-year undergraduate student at Huazhong University of Science and Technology, and I'm currently spending my final year at UCSB as an exchange student in the Graduate Academic Preparation Program.

I am broadly interested in Computer Graphics, Computer System, Game Development, Mathematical Modeling, etc.  

Projects
======

{% include base_path %}

{% for post in site.projects reversed %}
  {% include archive-single.html %}
{% endfor %}


