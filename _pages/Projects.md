---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}
<style>
  
@media screen and (max-width:700px){
.rightNavigator{
  display:none; 
  }
}
  .rightNavigator {
    position: fixed !important;
    right: 1.5em !important;
    top: 50%;
    -moz-transform: translatey(-50%);
    -ms-transform: translatey(-50%);
    -o-transform: translatey(-50%);
    -webkit-transform: translatey(-50%);
    transform: translatey(-50%);
    overflow: auto;
    max-height: 80%;
}
.rightNavigator::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.projectsItems {
    margin-right: 15em !important;
    min-width: 430px;
}

.rightNavigator>ul>li {
    margin-bottom: -1.5em !important;
    list-style: none;
}

.rightNavigator>ul>li>h2>a {
    text-decoration: none !important;
}

#projectsMasthead {
    border-bottom: 0px !important;
    width: 0px;
}

#projectsMasthead .masthead__inner-wrap {
    min-width: none !important;
    margin-right: 15em !important;
    margin-left: -1em !important;
    text-decoration: none !important;
}

#projectsMasthead .masthead__inner-wrap li a {
    text-decoration: none !important;
}
</style>
<div class="masthead" id="projectsMasthead">
  <div class="masthead__inner-wrap">
    <div class="masthead__menu">
      <nav id="site-nav" class="greedy-nav">
        <ul class="visible-links">
          <li class="masthead__menu-item masthead__menu-item--lg"><h1>{{page.title}}</h1></li>
            <li class="masthead__menu-item"><a href="javascript:;">All</a></li>
            <li class="masthead__menu-item"><a href="javascript:;">Graphics</a></li>
            <li class="masthead__menu-item"><a href="javascript:;">Game</a></li>
            <li class="masthead__menu-item"><a href="javascript:;">Other</a></li>
        </ul>
      </nav>
    </div>
  </div>
</div>
<div class="projectsWrap">
  <div class="projectsItems">
      {% for post in site.projects reversed %}
          <div id="project{{post.title}}" class="{{post.tag}}">
            {% include archive-single.html %}
          </div>
        {% endfor %}
  </div>
  <img src="http://47.112.130.28:8888/1.jpg"></img>
  <div class="rightNavigator">
    <ul>
    {% for post in site.projects reversed %}
      {% if post.id %}
        {% assign title = post.title | markdownify | remove: "<p>" | remove: "</p>" %}
      {% else %}
        {% assign title = post.title %}
      {% endif %}
      <li id = "{{title}}" class="{{post.tag}}">
          <h2 class="archive__item-title" itemprop="headline">
        {% if post.link %}
          <a href="javascript:;">{{ title }}</a> <a href="javascript:;" rel=""><i class="fa fa-link" aria-hidden="true" title=""></i><span class="sr-only">Permalink</span></a>
        {% else %}
          <a href="javascript:;" rel="">{{ title }}</a>
        {% endif %}
      </h2>
      </li>
    {% endfor %}
    </ul>
  </div>
</div>
