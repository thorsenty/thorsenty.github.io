---
layout: post
title:  "BlanketJS for QUnit"
date:   2014-04-16 23:30:00
author: Ty Thorsen
---

'What is the benefit?' 

This question was posed to me by a project manager today, regarding the QUnit testing framework that several colleagues and I have been building over the past few weeks. I gave him the typical spiel about how the test suite would help ensure code stablity, how the process of writing the test suite (and refactoring along the way) would reduce current technical debt, and how we could leverage the framework to do TDD in the future. That all sounds great, of course, but we need something we can show the business to help them understand that these benefits are worth the cost.

<!--more-->

It's a small something, but one thought I had was to show the business our code coverage metrics. If I can show that our test suite covers a significantly large percentage of our JS code base, it should help instill confidence that a simple running of the test suite can suffice as a smoke test of our web site. Currently, the majority of our testing is done manually. Manual testing is obviously slow. Time = money. You get the picture.

So, back to the issue of testing code coverage. After a quick search, it was evident that [BlanketJS][blanket] would be the best tool for the job. It's easy to use, configurable, and supports QUnit integration out-of-the-box.

{% highlight HTML %}
<script type="text/javascript" src="/js/main.js" data-cover></script>
<script type="text/javascript" src="/js/qunit-1.14.0.js"></script>
<script type="text/javascript" src="/js/testSuite.js"></script>
<script type="text/javascript" src="/js/blanket.min.js"></script>
{% endhighlight %}

To get started with BlanketJS in your project, all you need to do is include the blanket.min.js script after your qunit script, and then mark any scripts for which you want to test your test coverage with a `data-cover` attribute.

![QUnit w/ BlanketJS Screen][screen]

I'm getting aquainted with BlanketJS by adding it to thorsent. If I visit my qunit page, I should now see an additional checkbox in the toolbar labeled 'Enable coverage'. Check this box, and the page will reload, resulting in a view similar to the one above. BlanketJS has appended the coverage results to the qunit markup. It shows the number of statements covered out of the total number of statements in the JS, and this same metric as a percentage. If you'd like to drill down into your code to see exactly which statements in each file are covered and which ones aren't, you can do that too. At 44% I'm not doing so hot. But, now I know, and I can see a tangible improvement as I continue developing my test suite.

[blanket]: http://blanketjs.org
[screen]: /assets/images/blanket-js-screen.png "QUnit w/ BlanketJS Screen"