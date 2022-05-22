---
title: "What I Read This Week: 2022-20"
date: 2022-05-22T08:40:00Z
---

After a year-long intermission, here it is.

- [ACM Digital Library Archive is Open Access with 50 Years of Published Records](https://www.acm.org/articles/bulletins/2022/april/50-years-backfile)

  Here are my favourite two that I discovered thanks to [the Hacker News thread](https://news.ycombinator.com/item?id=31447465):

  - [The UNIX Time-Sharing System (1974) [pdf]](https://dl.acm.org/doi/pdf/10.1145/361011.361061)

    The eloquency with which they describe their work is so refreshing, a true joy to read. 

  - [A Conversation with Steve Jobs (1989) [pdf]](https://dl.acm.org/doi/pdf/10.1145/63334.63336)

    Contains bunch of gems, and again, here is my distillation:

    > Now, why would somebody want to do that [very fast interprocess communication]? Well number one, if you're not using NFS (Network File System) it would be nice not to use the quarter megabyte of memory. That's a simple one. But more important, people are going to want to experiment with the OSI networking protocols. It'd be nice if they could just flip a user process. Another example: the world needs a wide-area file system. And people are going to do a lot of experimentation. It's going to happen a lot faster, it's going to happen a lot more reliably, if people are using user processes without having to have this ever-expanding kernel. So the reason that we chose Mach was that we became aware of it, of course, through our relationship with CMU, and it offers the promise of the dekernelization of UNIX, which is very, very important.
    >
    > We're not religious about the surface level flavor of UNIX. We couldn't care less which one wins. We'll go with the flow. And we think people that argue about that layer do so because they have nothing better to talk about. They don't have good toolkits, they don't have good user interfaces. They don't have [Interface Builders](https://en.wikipedia.org/wiki/Interface_Builder). Whatever it is that is much more interesting, they don't have it, so they end up arguing endlessly about the 10 percent variations in UNIX.

    > [...]  One of the major reasons we went to surface mount wasn't just because it's more reliable and it's a little denser, but because that's where the edge of the envelope is in manufacturing. That's where the state of the art is. And if we're going to get the best engineers, then we're going to have to be in surface mount technology, because that's where they want to be.
    >
    > So there's a very clear link between the clarity of your vision and the people you can attract to make it happen. And I think people forget that. Sometimes when people think that they should be more conservative, they forget the impact that that will have on the people that they can attract. It's almost a self-fulfilling prophecy sometimes. If you don't go for the best thing, you almost widen the gap.

- [Noam Chomsky and Jeremy Scahill on the Russia-Ukraine War, the Media, Propaganda, and Accountability](https://theintercept.com/2022/04/14/russia-ukraine-noam-chomsky-jeremy-scahill/)

  It's a piece that many would find controversial so I am presenting it with no comments, except this excerpt:

  > Jeremy Scahill: I think that as we watch the horrors of human destruction and mass murder happening in Ukraine, we also must find a way to think of the long-term consequences of the actions of our own government. And unfortunately, when you raise these issues, when I raised them, when others do right now, in the U.S. media contexts, there is this Neo McCarthyite response, where to question the dominant narrative, or to question the motives of those in power, is now treated as an act of treason, or it's traitorous or you are a Putin stooge or are being paid in rubles. This is a very dangerous trend that we're witnessing where to question the state now is being very publicly and consistently equated with being a traitor.

- [Computers can be understood (2020)](https://blog.nelhage.com/post/computers-can-be-understood/)
  
  > I approach software with a deep-seated belief that computers and software systems can be understood.
  >
  > This belief is, for me, not some abstruse theoretical assertion, but a deeply felt belief that essentially any question I might care to ask (about computers) has a comprehensible answer which is accessible with determined exploration and learning.

  Written by a fellow Stripe, Nelson Elhage, it reminds me of Julia Evans' [So you want to be a wizard (2017)](https://jvns.ca/blog/so-you-want-to-be-a-wizard/) who is an ex-Stripe. :)

- [Donald Knuth Was Framed](https://buttondown.email/hillelwayne/archive/donald-knuth-was-framed/)

  > In 1986, Jon Bentley asked Knuth to demonstrate the concept of literate programming by writing a program in WEB. Knuth came up with an 8-pages long monolithic listing that was published together with a critique by Douglas McIlroy of Bell Labs. McIlroy praised intricacy of Knuth's solution, his choice of a data structure (Frank M. Liang's hash trie), but noted that more practical, much faster to implement, debug and modify solution of the problem takes only six lines of shell script by reusing standard Unix utilities.