---
title: "Revisiting the first website 30 years later"
date: 2023-01-22T07:58:00Z
---

I cannot remember how I stumbled upon it but when I visited [the first website](http://info.cern.ch/hypertext/WWW/TheProject.html) that CERN still hosts up to this day, I fell down the rabit hole and I knew I had to dedicate an entire blog post to it. The `Last-Modified` header of the response points at Thu, 03 Dec 1992 08:37:20 GMT so we are looking at a 30 years old document here, which is like a century in tech and literally 30% of a century anyway.

What made that finding so special for me is the foresights it contains, their accuracy, and the clarity with which they are explained. Perhaps I'm not doing them justice by calling their vision foresight, as if they were waiting by the sidelines and see the web evolve. On the contrary, they actively shaped an entirely new platform that is so open and so ubiqutious like no other before.

Let's dig.

## HyperText
[http://info.cern.ch/hypertext/WWW/WhatIs.html](http://info.cern.ch/hypertext/WWW/WhatIs.html)

> Hypertext is text which is not constrained to be linear.

I'm not entirely sure what is meant here, but I'm guessing that it might be a reference to Ted Nelson's [Project Xanadu](https://en.wikipedia.org/wiki/Project_Xanadu) and its use of [transclusion](https://en.wikipedia.org/wiki/Transclusion); remember this was 4 years before Netscape Navigator introduced `iframe` et al in 1996.

> Hypertext is text which contains [links](http://info.cern.ch/hypertext/WWW/Terms.html#link) to other texts. The term was coined by [Ted Nelson](http://info.cern.ch/hypertext/WWW/Xanadu.html#Nelson) around 1965 (see [History](http://info.cern.ch/hypertext/History.html)).
> 
> HyperMedia is a term used for hypertext which is not constrained to be text: it can include graphics, video and [sound](http://info.cern.ch/hypertext/WWW/Talks/YesWeCan.snd), for example. Apparently Ted Nelson was the first to use this term too.

All of those definitions are clear to us today, almost as if we couldn't understand otherwise, but imagine how much effort they must have required throughout the preceding years to even be able to imagine in the first place. Project Xanadu started before the first bit-mapped displays (Plasma Display Screen of [PLATO IV](https://en.wikipedia.org/wiki/PLATO_(computer_system))?) were even prototyped, so when you envision that a "document" can transclude videos from another document, that's incredibly ahead of its time.

## WorldWideWeb
[http://info.cern.ch/hypertext/WWW/Summary.html](http://info.cern.ch/hypertext/WWW/Summary.html)

> The [WWW](http://info.cern.ch/hypertext/WWW/TheProject.html) project merges the techniques of information retrieval and hypertext to make an easy but powerful global information system.

Here is HTTP being gently introduced for the first time as a technique of information retrieval. I recently [commented](https://news.ycombinator.com/item?id=34155794) on a Hacker News thread that "HTTP is the new TCP", alluding to HTTP's ubiquity. We now live in a world where web browsers are the most used application on any computer, if not [the only one](https://en.wikipedia.org/wiki/ChromeOS), so if your idea doesn't work on a web browser "you've lost before you've even begun, so don't do something dumb like requiring a plugin."

> Indexes are special documents which, rather than being read, may be searched. The result of such a search is another ("virtual") document containing links to the documents found.

The Web built itself using its own "APIs" from day 1&mdash;let's conveniently ignore [Shockwave Flash](https://en.wikipedia.org/wiki/Adobe_Flash_Player) here&mdash;and it's what makes it so powerful today. Instead of externalising index, search, and navigation functionality such as [Gopher](https://en.wikipedia.org/wiki/Gopher_(protocol)) and others, the Web built itself using the same set of tools that it offers to everyone freely.

What I also found interesting is the mention of _virtual_ documents, referring to documents that are generated on-the-fly by servers in response to specific requests. I always thought that the Web started as a protocol to serve static content.

> The project is based on the philosophy that much academic information should be freely available to anyone. It aims to allow information sharing within internationally dispersed teams, and the dissemination of information by support groups.

[Alexandra Elbakyan](https://en.wikipedia.org/wiki/Alexandra_Elbakyan) should be proud!

## W3 vs WAIS and Gopher
[http://info.cern.ch/hypertext/WWW/FAQ/WAISandGopher.html](http://info.cern.ch/hypertext/WWW/FAQ/WAISandGopher.html)

Web took interoperability to its great advantage, read Tim's answer to the diffence between the three competing protocols and which one to choose:

> Bear in mind:
> * A W3 client can read data from any other system.
> * If you run a W3 server you can upgrade certain parts of the documentation to hypertext later.
> * Hypertext is neat for representing existing data easily.
> So install W3 clients, and W3 servers. If you want to install a Gopher or WAIS server, fine: the W3 clients will access it. If you install a WAIS server, then you could install the W3-WAIS gateway locally to save bandwidth.

In Cory Doctorow's words, [adversarial interoperability](https://www.eff.org/deeplinks/2019/10/adversarial-interoperability) is "when you create a new product or service that plugs into the existing ones _without the permission_ of the companies that make them." What's admirable about the Web is that it didn't only take interoperability to its advantage only to break it for others, but permeated it throughout its journey and set a new standard for "permissionless" environments where you can [block ads](https://github.com/gorhill/uBlock), [write custom scripts](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), or [translate texts](https://addons.mozilla.org/en-US/firefox/addon/to-google-translate/) without the permission or help of the content authors.

## Content Discovery
[http://info.cern.ch/hypertext/WWW/FAQ/KeepingTrack.html](http://info.cern.ch/hypertext/WWW/FAQ/KeepingTrack.html)

From the FAQ, "how does www keep track of the available servers?" I found Tim Berners-Lee's answer quite refreshing: links are the primary discovery mechanism first and foremost, upon which indexers and algorithms can be built. Again, I'm mesmerised by the clarity and the accuracy of their vision.

> To the reader, the web is a continuum. When a new server appears, it may serve many databases of data from different sources and on different subjects. The new data must be incorporated into the web. This means putting links to data on the new server (especially to a general overview document for the server if there is one) from existing documents which interested readers might be reading, or putting it into an index which people might search.
>
> [...]
>
> By the way, it would be easy in principle for a third party to run over these trees and make indexes of what they find. Its just that noone has done it as far as I know because there isn't yet an indexer which runs over the web directly.
>
> [...]
>
> In the long term, when there is a really large mass of data out there, with deep interconnections, then there is some really exciting work to be done on automatic algorithms to make multi-level searches.

## Notification of new material
[http://info.cern.ch/hypertext/WWW/DesignIssues/Notification.html](http://info.cern.ch/hypertext/WWW/DesignIssues/Notification.html)

Footprints of RSS: "Does one need to bring it to a reader's attention when new unread material is added?"

> There are two ways to make the connection between the modified material, and an interested person. One is, at the time of modification, to trace the interested parties. The other is, at some later time, for a daemon program (or a browser) to make a search for new things of interest to a given reader.

Interestingly RSS/Atom both went with the latter option where the interested person makes a search for new things of interest periodically, whereas ActivityPub shits the onus to publishers who must [notify](https://macwright.com/2022/12/09/activitypub.html#inbox) all their subscribers each time&mdash;notice how the push model of ActivityPub requires interested people "to be addressable on the internet" (or have an addressable intermediary).

## Epilogue 
It's important to leave some material for the discovery of the interested reader so I'll cut my post here. Below are links to some more interesting materials on the website:

* [From Version to Version of HTTP](http://info.cern.ch/hypertext/WWW/DesignIssues/ProtocolVersions.html)
* [The topology of the web of links](http://info.cern.ch/hypertext/WWW/DesignIssues/Topology.html)
* [Multiuser considerations](http://info.cern.ch/hypertext/WWW/DesignIssues/Multiuser.html)
* [Navigational Techniques and Tools](http://info.cern.ch/hypertext/WWW/DesignIssues/Navigation.html)
