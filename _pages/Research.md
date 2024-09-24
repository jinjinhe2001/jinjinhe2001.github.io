---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% include base_path %}

<!-- New style rendering if publication categories are defined -->
{% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %}