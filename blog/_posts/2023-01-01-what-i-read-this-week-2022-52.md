---
title: "What I Read This Week: 2022-52"
date: 2023-01-01T13:00:00Z
---

**[On Being A Senior Engineer](https://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/) (2012) by John Allspaw**

It's a fairly long read but it was one of the, if not _the_, best reads of 2022.

I don't want to decimate the article with my quotes as it's as concise as it could be given how much it conveys.

**[Simplicity vs Value in Software Development](https://businessofsoftware.org/2009/01/joel-spolsky-at-business-of-software-2009-video/) (2009) by Joel Spolsky**

Joel talks about the trade-off between simplicity and value building new features add, the problem with giving too many choices, and _elegance_.

**[Groupware Bad](https://www.jwz.org/doc/groupware.html) (2005) by Jamie Zawinski**

In his talk Joel mentions Jamie's _Groupware Bad_ artcile which today is replaced by the following notice:

> When I hear people say that they were "inspired" by this, I fear that the result of such inspiration was most likely to cause them to participate in the construction of the Public-Private Surveillance Partnership. These people told themselves that they were building tools to "bring people together" when in fact what they were doing was constructing and enabling the information-broker business models used by companies like Facebook and Equifax, where people are not the customers but rather are the raw materials whose personal details are the product.
>
> I was talking about decentralization and empowerment of the individual. They went and build the exact opposite.

The article is still accessible for those who are determined enough but I won't link to it out of respect for the author, except quoting this particular bit about bootstrapping social software:

> And if it [your software] doesn't work with webmail, you've lost before you've even begun, so don't do something dumb like requiring a plugin. The trick you want to accomplish is that when one person is using your software, it suddenly provides value to that person and their entire circle of friends, without the friends having had to do anything at all. Then, later, you pull the friends into the fold: if one of them starts using the software, they become their own hub, and get the benefit they have already witnessed from a distance.

**[Life is Short](http://paulgraham.com/vb.html) by Paul Graham**

> It's easy to let the days rush by. The "flow" that imaginative people love so much has a darker cousin that prevents you from pausing to savor life amid the daily slurry of errands and alarms. One of the most striking things I've read was not in a book, but the title of one: James Salter's _Burning the Days_.

**[John Carmack's resignation](https://www.facebook.com/story.php?story_fbid=3467566940144465&id=100006735798590)**

> We have a ridiculous amount of people and resources, but we constantly self-sabotage and squander effort. There is no way to sugar coat this; I think our organization is operating at half the effectiveness that would make me happy. Some may scoff and contend we are doing just fine, but others will laugh and say "Half? Ha! I’m at quarter efficiency!"
>
> It has been a struggle for me. I have a voice at the highest levels here, so it feels like I should be able to move things, but I'm evidently not persuasive enough. A good fraction of the things I complain about eventually turn my way after a year or two passes and evidence piles up, but I have never been able to kill stupid things before they cause damage, or set a direction and have a team actually stick to it. I think my influence at the margins has been positive, but it has never been a prime mover.

**[A Linux evening...](https://fabiensanglard.net/a_linux_evening/) by Fabien Sanglard**

> Occasionally, my system malfunctions to a point it requires a significant effort to fix it. Really bad occurrences result in disheartening hours googling in the hope that someone more qualified ran into the same issue.

I had many similar experiences while using Ubuntu as my daily driver for the past 5-6 years, _and_ those taught me a lot! As Fabien also admits at the end of his article, "it is obvious the community has come a long way" and even if the learnings in those evenings are not transferrable, I've always appreicated them as stimuli. It's precisely those cracks through which the internals of otherwise black-boxes reveal themselves.

**[Golang disables Nagle's Algorithm by default](https://news.ycombinator.com/item?id=34179426)**

Now a Hacker News evening: someone recently discovers that Go disables Nagle's Algorithm (i.e., enables `TCP_NODELAY`) by default and posts a reasonable rant, and [Russ Cox](https://news.ycombinator.com/item?id=34181846) and [John Nagle](https://news.ycombinator.com/item?id=34180239) chime in to explain why.

On an unrelated note, this reminded me of how easy it is to overlook the social aspect of social networks: how many other sites can you think of where such interactions are even plausible in the first place?

**[Beaker Browser is now archived](https://github.com/beakerbrowser/beaker/blob/764bdefeeed9558dbf10aec77df262a896f57236/archive-notice.md) by Paul Frazee**

> As decentralizers we may be pursuing a mission, but our work only wins in the market, and to win in the market we need to think like entrepreneurs. Ultimately, my lesson learned is that mission needs PMF [product-market fit].

**[The PlayStation2 vs. the PC: a system-level comparison of two 3D platforms](https://web.archive.org/web/20121101003246/http://arstechnica.com/features/2000/04/ps2vspc/) (2000) by Jon Stokes**

PlayStation 2 is my favourite console. First of all, it's reminiscent of an era where software was shipped physically only and _where not everything was a PC_.

> Diefendorff et al. start out by distinguishing media applications from more traditional applications by noting that media apps are examples of what they call dynamic processing. What this basically means is that the instruction stream doesn't really change all that fast, but the data stream changes constantly. Or, put more concretely, programs like 3D games and scientific applications deal with very large amounts of data, but the groups of instructions that operate on these large data chunks are usually very small. The most common situation is where you have a small loop that iterates through a large matrix or series of matrices many, many times.
>
> Contrast this to a more traditional, static processing application like a word processor, which uses many different segments of code (menus, wizards, spell checkers, etc.) to operate on a single data file (the document). In this type of application, the data stream is pretty stagnant, and doesn't change very much. The instruction stream, however, is all over the map. One minute you're firing up the spell checker to process the file, the next minute you're changing the fonts, and then when that's done, maybe you export it to a different format like Postscript or HTML.

If you are _really_ intrigued, you can continue reading [Sound and Vision: A Technical Overview of the Emotion Engine](https://web.archive.org/web/20120621055541/https://archive.arstechnica.com/reviews/1q00/playstation2/m-ee-1.html).