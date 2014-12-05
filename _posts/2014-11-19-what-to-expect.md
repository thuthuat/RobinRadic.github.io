---
layout: post
title: What to expect on my git
description: "FIRST POST YEAH. Summing up some stuff you'll find here in the future. It's a long, boring story without any real purpose.
                I will go over some of my basic web-developing blogging ideas aswell as creating some linux customised OS."
tags: [General, Custom Linux, Development]
image: RadicOS131-1920x1200.jpg
comments: true
category: General
published: false
---


FIRST POST YEAH. Summing up some stuff you'll find here in the future...

- [Developing](#developing)
- [WebDeveloping](#webdeveloping)
- [Custom Linux](#custom-linux)
- [Screenshot and download](#screenshot-and-download)

Below is just about a tenth of what i'll try to cover in blogs, projects and repositories/demos. But i'll bore you with a little introduction story in my bestest engrish.


### Developing ###

I love developing, or rather, learning and applying new techniques. But it also gives me a headache from time to time. I'll try to explain.

Web-development is probably my main interest.. not completely sure though, cause i enjoy writing c# (kerbal space program mods!) or java (minecraft server plugins) just as much.

The tricky part though is web-development. C#, Java, etc (dependable on the scale of the project) are evolving much slower then the web-development languages and techniques are (note: that's just my assumption, feel free to correct me).

Web-development these days requires a multitude of toolkits and languages which are constantly changing, but also very project dependend.

HTML, CSS, PHP. That's what was acceptable a few years ago. No pre-processors, build-tools (phing, grunt) etc. Javascript was just <insert jQuery + plugin + config> and voila.

Nowadays, i can't even imagine only working like that. Obviously, it might very well indicate i've just haven't had the right knowledge back then (or now aswell for that matter).

### WebDeveloping ###
**Example workflow**

- Open up a terminal, or maby 2/3 for some proper multitasking.
- Initialize npm, bower, grunt. Fix .gitignore, .jshintrc. Heck, add license and readme while your at it.
- Start configuring a config file, make it integrate into gruntfile.
- Fix all required grunt modules, maby some other node stuff that's usefull.
- Oh yeah, pick ur backend framework/language.. node/express? php/laravel? c#/.NET?
- Yeah lets implement latest tech, gonna go full RESTfull with some fancy AngularJS? Or fancy Meteor's approach?

Problem is, the client (project requirements) really decides on it. Sometimes it's simply not worth the workload, or simply doesn't suit the project's nature.

But let's continue for laughs.

Youd need to pre-process SCSS or LESS. You'd need to fix bower properly (wiredep? usemin? preprocess?), whatever. I've played around with grunt/bower and finally gave up on it. Meaning i spend to much time learning NodeJS, the Grunt API, Testing libs like karma and whatnot.

Now the silly thing of all is that the time-investment to properly do some front-end developing screws up my back-end developing interests. I'm very happy with the way PHP is moving the last couple of years.. composer, laravel, packagist.. all sweet stuff.

Il now get to the point im trying to make clear, as web-developer you simply require multiple skills:

- NodeJS/Javascript for server side
- Javascript for client side (try creating a fancy big library that actually works on all browsers... love IE!)
- Windows are objects to look trough. Apples are nasty things you eat. You'd really want to have Tux the pinguin. (in other words, make sure u do your web-development on linux. If you can code but still use windows, invest the time to make it your main OS!)
- HTML5, Bootstrap, CSS3. Sure, all nice. Try it in IE7 after you've created your awesome site. It's depressing.
- jQuery, Underscore, AngularJS, native JS.. It's pretty common to know all of them (though jq/underscore are quite simply api's/library of function). I admit i've had no experience with javascript (client site) for over 2 years of simple jQuery usage.
- Build tools. Pre-processors, Generators. A proper toolkit to automate tasks and not lose your sanity by repeating. Sure, BASH scripts can carry you a long way, i use em every project. But i can promise you that creating your own Yeoman, grunt, or whatever generator for several tasks is worth the time investment. Here's a preview of one of my generators.

![radic gitinit](https://raw.githubusercontent.com/RobinRadic/radic-cli/master/wizard2.jpeg). Pretty much all questions are already filled in properly by default. How much times haven't you done:

{% highlight bash  %}
git init
touch .gitignore
echo -e "/node_modules \n /vendor \n /whatevaah" >> .gitignore
touch LICENSE
touch README.md
chromium http:///github.com # and then click click click to create a new repo...
git add -A
git commit -m "shit, im doing this again...."
git push -u origin master
{% endhighlight %}

(Btw, if you like the prompt

Imagine just doing this:
{% highlight bash  %}
radic gitinit
[enter]
[enter]
[enter]
[enter]
[enter]
myawesomeproject
[enter]
[enter]
[enter]
# Done...
{% endhighlight %}

Or even better:
{% highlight bash  %}
radic init [project type]
Myy awesome project # project name
y # yes to gitinit it
# maby 2/3 more questions to adjust the resulting project files
{% endhighlight %}

And the result? (php/laravel with front-end stuffz)

{% highlight bash  %}
root
 .git
 app
 packages
 workbench
   mypackage
     public
       super.scss
       index.jade
 vendor
 public
   assets
 .bowerrc
 bower.json
 gruntfile.js
 package.json
 LICENSE
 README.md
 .gitignore
 .npmignore
 .jshintrc
 _config.yml
 ...etc etc
{% endhighlight %}
With having all sorts of grunt tasks/plugins ready to easy your workflow. `grunt:watch` fixing all copy, pre-processing, etc from your workbench into public folder. Automaticly including bower installed packages into your html/jade.

My goal is to blog quite a bit about fancy techniques, create some fast and easily readable tutorials, and obviously create some projects/packages for these kind of stuff (and other things as well).


### Custom Linux ###
I'm planning on creating a fair ammount of posts about using `kiwi` comined with `obs` (open build system) and rebranding SUSE by git cloning their `openSUSE/branding` repository. I've learned quite a bit doing it all from scratch. You could check out my repo's, though they aren't that usefull, cause i haven't really updated em. I've waited for 13.2 release, so il be starting from scratch pretty soon.

What does that mean?
- Comlete customized linux version. From boot logo/test, startup animation and KDE customisation. SUSE has all it's source gfx on git. And it's fairly easy to put it online in a repository with RPMS.
- Kiwi allows you to hand-pick every single package, and it requires a bit of config here and there. You can make live USB/CD's with your own rebranded linux.

Link to my outdated 13.1 branding [build service](https://build.opensuse.org/package/show/home:radic:RadicOS/branding-RadicOS) and [repository](http://download.opensuse.org/repositories/home:/radic:/RadicOS/openSUSE_13.1/).
Yeah.. openSUSE actually provides **free** repository online for your packages. [And with the git branding repository](https://github.com/openSUSE/branding/tree/13.2), they got a makefile and .spec file making it child's play to put it on.

You'd just need to invest a bit of time learning how to use Inkscape to create (copy/paste from websites providing vector images for free) some fancy graphix. Adobe illustrator should work aswell.. but then your either on Windows or Crapple ;)

Full details soon!

[Here's an example of a kiwi xml file. EZ PZ]({{ BASEURL }}/uploads/kiwi.xml)
[And i've created a shell script around it to ease the build process]({{ BASEURL }}/uploads/kiwibuild.sh)


It's just 2 snippets from my project. But it allows me to create several re-branded distro's entirely with my own pick of packages and custom software.

Can make a Virtual Machine disk, Live USB/DVD, Persistent usb. Simple installer and i'm working on getting the official opensuse DVD installation working properly, with my own branding and packages/products etc.


So here's what i can do to create several versions of custom linux
{% highlight bash  %}
# I've renamed kiwibuild.sh to radicos and put it in $PATH, therefore i use radicos command
# Before i start creating, i edit line 4: profiles="improved yast2 webserver kde software dev workstation"
# So i could remove webserver, or whatever
$ radicos prepare
$ radicos create vmx # build virtual machine
$ radicos create oem # build installer iso
$ radicos create iso # buid live distro
$ radicos installer  # Grabs the official dvd, and usses makeSUSEDvd with a lot of customisations for a full installer disk, with own patterns and branding
{% endhighlight  %}


The cool thing about the branding stuff with SVG files is that they scale. There's not really that much need to alter 100 graphihc files. The makefile that is included does it all (check the repo of openSUSE/branding).

I've still spend quite some time on some stuff. Like ksplashx with QML. It's the animation that u get after login.  I've included it for download, it's quite fancy, just requires a bit of resolution tweaking.

First, the logo and backkground:


![radic gitinit]({{ site_url }}/images/RadicOS131-1920x1200.jpg). Pretty much all questions are already filled in properly by default. How much times haven't you done:


And you can grab the [animation files and QML code here]({{ site_url }}/images/ksplashx.zip). Sorry no video.. But its great to cheat from and adept into your own ksplashxQML intro...