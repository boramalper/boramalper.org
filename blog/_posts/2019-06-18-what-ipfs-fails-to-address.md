---
id: 585
title: What IPFS Fails to Address?
date: 2019-06-18T19:22:34+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=585
permalink: /what-ipfs-fails-to-address/
hefo_before:
  - "0"
hefo_after:
  - "0"
categories:
  - Computer Science
tags:
  - decentralization
  - IPFS
---
If you were to visit ipfs.io today, you can clearly see that IPFS attacks the Web (and its underlying protocol HTTP) head-on. It is obvious that IPFS yearns to _replace_ the Web as we use today partially or fully at some point in the future and decentralise it whilst yielding enough profits to its investors. Of course while there is nothing wrong with that, I think IPFS is no more adequate to replace the Web than BitTorrent or WebTorrent is, until it addresses content insemination problem.

<!--more-->

We often say [The Cloud Is Just Someone Else&#8217;s Computer](https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/) but often forget this very simple fact when it comes to _decentralised_ networks. We don&#8217;t realise that the storage capacity of the network is no greater than the sum of what its peers has allocated, and there is no &#8220;synergy&#8221; beyond it. Even worse, no one at IPFS tells you (until you learn it the hard way) that you cannot &#8220;upload&#8221; a file to the network. While this is perfectly acceptable as one of the many technical decisions a project has to take, it is not for a project that aims to replace the Web. If you can&#8217;t answer _where_ my images are uploaded in a decentralised web-app (dApp), you shouldn&#8217;t put **&#8220;IPFS aims to replace HTTP&#8221;** on your website in my huble opinion.

The root of the problem is social than technical: IPFS tries to abstract away the fact that it&#8217;s someone else&#8217;s computer that stores your files at the end of the day, and only as a result of that it lacks mechanisms to _push_ the content. On the Web, whenever I _upload_ a photo, _post_ on reddit, or _comment_ on Hacker News, it&#8217;s an instantaneous interaction only because there is a computer at the other end who is willing to receive my content. In contrast, on IPFS this is nearly impossible as my poor peer (which might not even be a full peer if I&#8217;m using [js-ipfs](https://github.com/ipfs/js-ipfs)) has no idea who might be interested in what it wants to say.

I can use IPFS PubSub to notify the peers who are interested in storing my content (by publish on a dedicated channel that both parties have agreed on), but that solves only a part of the problem. Operations which are more complex than fetching a resource by its hash, such as running queries queries on a database, are unavailable to decentralised apps, unless you resort to blockchain, as [DTube](https://about.d.tube/) did. So while I can play a video (given it&#8217;s URL includes its IPFS hash), I cannot list all the videos nor search their titles using IPFS only in my decentralised app.

Now BitTorrent has never suffered from it because it never tackled this problem. BitTorrent&#8217;s model was clear: it was meant to be a P2P file distribution protocol to reduce the load on servers. Yet it was immensely successful because it was a good solution for the problem it tackled. I am not sure which problem IPFS is trying to solve exactly, as I don&#8217;t think replacing the Web is something even imaginable at this point.

So what is the solution? 

  1. Tone it down, be humble. It&#8217;s better to set the expectations right than to brag about things that you haven&#8217;t delivered yet.
  2. Admit it, it&#8217;s right in your name: InterPlanetary **File System**, **Filecoin**, &#8230; You are developing, at best, a P2P file system backed by a crypto-currency, _but the Web is not one big filesystem_, it&#8217;s much more than that. You do not only `GET` data from servers but `POST` data too, which you offer no alternative to, even if we reduce all the client-server interaction to of a file storage.