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
  .projectsWrap{
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
    height: 700px;
  }
  .projectsItems {
    margin-right: 15em !important;
  }
  .rightNavigator > ul > li{
    margin-bottom: -1.5em !important;
    list-style: none;
  }
  .rightNavigator > ul > li > h2 > a {
    text-decoration: none !important;
  }
    .main .archive .masthead{
    border-bottom: 0px !important;
  }
  .main .archive .masthead .masthead__inner-wrap{
    min-width: none !important;
    margin-right: 15em !important;
    margin-left: -1em !important;
    text-decoration: none !important;
  }
  .main .archive .masthead .masthead__inner-wrap li a{
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
<script>
  const rightNavigator = document.getElementsByClassName("rightNavigator")[0]
  rightNavigator.addEventListener('click', (e)=>{
      console.log(e,e.path[2].tagName)
      if(e.path[2].tagName === 'LI'){
        const clickTag = e.path[2].id
        const project = document.getElementById(`project${clickTag.trim()}`)
        project.scrollIntoView()
        console.log(project.offsetHeight)
      }
  })
  const projectsMasthead = document.getElementById('projectsMasthead')
  const graphicsGroup = document.getElementsByClassName("graphics")
  const gameGroup = document.getElementsByClassName("game")
  const othersGroup = document.getElementsByClassName("others")
  projectsMasthead.addEventListener('click', (e)=>{
    console.log(e.path[0].tagName)
    if(e.path[0].tagName === 'A'){
      let projectsClass = e.path[0].innerText
      if(projectsClass === 'Graphics'){
        for(let i of gameGroup){
          i.style.display = 'none'
        }
        for(let i of othersGroup){
          i.style.display = 'none'
        }
        for(let i of graphicsGroup){
          i.style.display = 'block'
        }
      }else if(projectsClass === 'Game'){
        for(let i of graphicsGroup){
          i.style.display = 'none'
        }
        for(let i of othersGroup){
          i.style.display = 'none'
        }
        for(let i of gameGroup){
          i.style.display = 'block'
        }
      }else if(projectsClass === 'Other'){
        for(let i of graphicsGroup){
          i.style.display = 'none'
        }
        for(let i of gameGroup){
          i.style.display = 'none'
        }
        for(let i of othersGroup){
          i.style.display = 'block'
        }
      }else{
        for(let i of graphicsGroup){
          i.style.display = 'block'
        }
        for(let i of gameGroup){
          i.style.display = 'block'
        }
        for(let i of othersGroup){
          i.style.display = 'block'
        }
      }
    }
    })
</script>