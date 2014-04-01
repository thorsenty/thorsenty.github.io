---
layout: post
title:  "A Custom Domain for Your GitHub Pages Site Using GoDaddy"
date:   2014-03-31 19:42:00
author: Ty Thorsen
---

A quick note on how to set up a custom domain name for your GitHub Pages site using GoDaddy:

Setting up my custom domain for thorsent was my first foray into working with DNS. I stumbled around a bit with forwarding and masking before arriving at the proper solution of DNS mapping. It's a fairly simple process if you know what you're looking for. Just follow the steps below.

<!--more-->

1. Find and register a domain name. I used GoDaddy, but the registrar you use is really up to you. 

1. Add a file called `CNAME` to the root of your Page repository. This file should contain a single line, listing your custom domain. {% highlight JavaScript linenos %} www.thorsent.com {% endhighlight %}

1. Log in to your GoDaddy account. Navigate to the 'Domains' screen.  There is a 'DNS' drop-down menu. Select 'DNS Manager'. Once in the DNS Manager you should see your custom domain name. Select 'Edit Zone' to open up the zone file editor. In the DNS Zone Editor you need to ensure that you have three records: two 'A' (Host) records that point to the GitHub Pages servers at 192.30.252.153 and 192.30.252.154, and a 'CNAME' (Alias) record that points to your GitHub Pages url (username.github.io).

1. Profit.

![GoDaddy DNS Mangager][dns]

After allowing some time to allow your DNS changes to propagate (up to 24 hours), your custom domain should now be pointed at your GitHub Pages site.

[dns]: /assets/images/dns-manager.png "GoDaddy DNS Manager"