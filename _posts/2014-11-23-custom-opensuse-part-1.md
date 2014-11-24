---
layout: post
title: Custom rebranded openSUSE 13.2 part 1
description: "The first step of creating a fully customised openSUSE (13.2) based linux. I will cover the initial steps required to re-brand both graphics and texts. We're also gonna make a start with using KIWI."
modified: 2014-11-23
tags: [Custom Linux, Linux, Kiwi, bash, openSUSE]
image: openSUSE_13_2_5.svg
comments: true
category: Custom Linux
---

### Starting off

We'll be needing a few things. If you don't have openSUSE 13.2 then either install it on your PC or on a VM. Once installed, we will do the following things:

### Prereq's
- [openSUSE 13.2](http://ftp1.nluug.nl/os/Linux/distr/opensuse/distribution/13.2/iso/openSUSE-13.2-DVD-x86_64.iso)
- A VM application (I'm using VMware. But VirtualBox will do just fine)

### Install packages
Assuming you're now on 13.2. Type in the following commands to get started up.
{% highlight bash %}
zypper in kiwi kiwi-doc kiwi-templates kiwi-desc-vmxboot kiwi-desc-isoboot kiwi-desc-oemboot squashfs
zypper in osc
zypper in git inkscape
zypper in virtualbox # If you don't have VMware
{% endhighlight %}



### Creating a project
- Go to [Open Build Service](https://build.opensuse.org/) and register an account, takes 5 seconds.
- Ensure you have a github account

{% highlight bash %}
mkdir ~/myos
cd ~/myos
git init

# Will be using the branding package only really.. other stuff is just interesting. Do note, these repositories tend to be quite big. You'll need a few gig of space.
git submodule add https://github.com/openSUSE/branding
git submodule add https://github.com/openSUSE/release-notes-openSUSE
git submodule add https://github.com/openSUSE/artwork
git submodule add https://github.com/openSUSE/package-lists
cd branding
git checkout 13.2
cd ..

# Create some directories we'll use. We'll get into that later
mkdir -p {src/root,installer,tools,build}
touch myos.sh       # Going to use a bash script to ease up some things
chmod +x myos.sh

# Lets just move over the entire doc's folder. It might give u some extra info
cp /usr/share/doc/packages/kiwi/ docs

echo "/docs" >> .gitignore

{% endhighlight %}

Now, for the rest of the project i'll be using InteliJ IDEA. It's a very good IDE and supports many languages trough various plugins. We'll be working with bash, XML and various other languages and features, so my recommendation is to at least try it out.



- Create a project directory
- Register with suse's open build service