---
layout: post
title: Linux from scratch
description: "For quite some time i've wanted to create a Linux from scratch build. 
Sure, Kiwi and other auto-build tools are nice, but doing it the hard way is always more fun. 
I wasn't eager to just copy/paste stuff from the book while knowing eventually i'd had to do it again. 
So creating a custom build script while doing it seemed a good idea. Check it out."
tags: [Development, Linux, Bash, Custom Linux]
image: /images/lfs-logo.png
comments: true
published: true
---

# Unfinished post - Not Finishedo

## LFS?
Linux From Scratch (LFS) is a project/book that provides step-by-step instructions for building Linux entirely from source.
 I'll be using book version 7.6, which [can be found here](http://www.linuxfromscratch.org/lfs/read.html).
 Also, all the code i've written is [on github](https://github.com/robinradic/lfsbuild).
 
 After completing LFS, there's still more to do:  
- Beyond Linux from scratch (BLFS). Networking, Window manager, desktop environment, security etc.  
- Automated Linux from scratch (ALFS). Automating the build process.  
- And more...  

#### ALFS
Without having actually read it, i find it un-doable not to instantly implement some sort of automated build mechanics. I've seen several youtube 
videos where people write all commands from the book into the prompt directly. Personally i'd rather put a chunk of commands together in a bash function
and call it. When errors occur, just alter the bad code and try again, leading up to properly working functions that can eventually be combined again = automated.
  
  
## Creating a temporary build system
I've written some helper scripts to set up a debian 7.6 virtualbox automaticly. It'll also install all required packages and ensures all pre-requesits are ok.
Using the helpers scripts to set up the temporary system, with a set distro/version lowers the chance of incompatability or whatever its called.
The scripts and other stuff im using can be viewed [on github](https://github.com/robinradic/lfsbuild). The host computer requires the following packages:  
- Virtualbox  
- Vagrant  
- 7z  
- Curl  
  


{% highlight bash %}
cd /path/to/where/i/place/mah/shit
git clone https://github.com/robinradic/lfsbuild
cd lfsbuild

# Start off with creating the installer disk. 
# init will create some dirs, download the iso and alter it.
# This will alter the debian 7.8 netinstall cd by adding pre-seed to automate the installation.
# There's a chance that the download will not start. Open the config.sh and alter the iso url to a valid download location (check https://www.debian.org/CD/netinst/)
./lfsbuilder init


{% endhighlight %}
