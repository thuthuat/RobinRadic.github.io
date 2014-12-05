---
layout: post
title: Github Pages search
description: "While there are some search plugins for Jekyll, GitHub pages doesn't support custom Jekyll plugins as of yet. This method allows searching your Github Pages posts and pages by creating a jQuery plugin to search trough your posts using jekyll generated search.json loaded using AJAX.


**Try it out on this site, upper left search box.**"
tags: [Web, Development, Javascript, jQuery, Liquid, Jekyll, Github Pages]
image: /images/jquery-github.jpg
comments: true
---


### Overview
In the root folder of the website let search.json get generated using jekyll/liquid.
When a search query is submitted, javascript does a AJAX get request to retreive the JSON file.
It then searches through all posts, ranks the results, and uses lodash's template functionality
to display the search results. It also integrates tag searching, when tag links are clicked.

**search.json**
{% highlight javascript %}
---
---
[
{% raw %}{% for post in site.posts %}
{% capture tags %}{% for tag in post.tags %}{{ tag }} {% endfor %}{% endcapture %}{% endraw %}
{
"title": "{% raw %}{{ post.title }}{% endraw %}",
"description": "{% raw %}{{ post.description }}{% endraw %}",
"url": "{% raw %}{{ post.url }}{% endraw %}",
"tags": {% raw %}{{ tags | jsonify }}{% endraw %},
"date": "{% raw %}{{ post.date | date: '%D' }}{% endraw %}",
"date_iso": "{% raw %}{{ post.date | date: '%F' }}{% endraw %}",
"id": "{% raw %}{{ post.id }}{% endraw %}",
"content": {% raw %}{{ post.content | jsonify }}{% endraw %}
},
{% raw %}{% endfor %}{% endraw %}
false
]
{% endhighlight %}


**Source**

- [search.json](https://github.com/RobinRadic/RobinRadic.github.io/blob/master/search.json)
- [posts-search.html](https://github.com/RobinRadic/shared-gh-pages/blob/master/widgets/posts-search.html)
- [posts-search.js](https://github.com/RobinRadic/RobinRadic.github.io/blob/master/assets/widgets/posts-search.js)


The code is far from complete, but should give you the general gist of it.