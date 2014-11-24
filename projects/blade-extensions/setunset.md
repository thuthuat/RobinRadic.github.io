---
---
### Set / Unset

Setting and unsetting of values

{% highlight php %}

@set('newvar', 'value')
{% raw %}{{ $newvar }}{% endraw %} // echo's "value"


// All these combinations work
@set('mams', 'mamsVal')
@unset($mams)

@set($mams, 'childs');
@unset('mams');

{% endhighlight %}