---
---

Readme
------------

#### Requirements
- PHP > 5.4
- Laravel  4.2.*
- (optional) raveren/kint > 0.9.1


#### Installation
Add to `composer.json`
{% highlight json %}
"radic/blade-extensions": "2.*"
{% endhighlight %}

Add to `app/config/app.php` to register the service provider if you want to use the Blade directives. If you just want the **BladeViewTestingTrait**, then it's not needed to include the provider.
{% highlight php %}
'Radic\BladeExtensions\BladeExtensionsServiceProvider'
{% endhighlight %}


#### Requirements
Publish the configuration file. Check the [explenation of configuration options](api/config_config.html)
{% highlight bash %}
php artisan config:publish radic/blade-extensions
{% endhighlight %}


#### Testing
- Auto generated array's using [JSON Generator](http://www.json-generator.com) with `json_decode()`
- Using [Regex101](http://regex101.com) for regex creation. Each regex string has a link to it's regex101 document


#### @debug with raveren/kint
![Screenshot](http://raveren.github.com/kint/img/preview.png)


#### Copyright/License
--------------
Copyright 2014 [Robin Radic](https://github.com/RobinRadic) - [MIT Licensed](http://radic.mit-license.org)