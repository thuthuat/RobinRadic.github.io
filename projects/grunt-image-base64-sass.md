---
layout: page
title: Grunt images to scss variables
subtitle: Grunt images to sass/scss file variables with base64 string
permalink: projects/grunt-image-base64-sass/
---

[![Build Status](https://secure.travis-ci.org/RobinRadic/grunt-image-base64-sass.svg?branch=master)](https://travis-ci.org/RobinRadic/grunt-image-base64-sass)
[![GitHub version](https://badge.fury.io/gh/robinradic%2Fgrunt-image-base64-sass.svg)](http://badge.fury.io/gh/robinradic%2Fgrunt-image-base64-sass)
[![Goto documentation](http://img.shields.io/badge/goto-documentation-orange.svg)](http://robinradic.github.io/projects/grunt-image-base64-sass)
[![Goto repository](http://img.shields.io/badge/goto-repository-orange.svg)](https://github.com/robinradic/grunt-image-base64-sass)
[![License](http://img.shields.io/badge/license-MIT-blue.svg)](http://radic.mit-license.org)

> Grunt images to sass/scss file variables with base64 string

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

{% highlight bash %}
npm install grunt-image-base64-sass --save-dev
{% endhighlight %}

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

{% highlight javascript %}
grunt.loadNpmTasks('grunt-image-base64-sass');
{% endhighlight %}

## The "image_base64_sass" task

### Overview

{% highlight javascript %}
grunt.initConfig({
   image_base64_sass: {
    build: {
        options: {
            dest: 'src/styles/_imagess.scss'
        },
            files: [{src: 'src/images/raid-icons.jpg'}, {src: 'src/images/heroic.png'}]
        }
    }
});
{% endhighlight %}

### License
Copyright 2014 Robin Radic
[MIT Licensed](http://radic.mit-license.org)