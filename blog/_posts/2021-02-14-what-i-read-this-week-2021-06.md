---
title: "What I Read This Week: 2021-06"
date: 2021-02-14T13:18:53+03:00
---

- [Big name corporations more likely to commit fraud](https://news.wsu.edu/2021/02/02/big-name-corporations-likely-commit-fraud/)

    > “Prestigious companies, those that are household names, were actually more prone to engage in financial fraud, which was very surprising,” said Jennifer Schwartz, WSU sociologist and lead author on the study. “We thought it would be companies that were struggling financially, that were nearing bankruptcy, but it was quite the opposite. It was the companies that thought they should be doing better than they were, the ones with strong growth imperatives–those were the firms that were most likely to cheat.”
    >
    > [...]
    >
    > The researchers noted that this type of elite, white-collar crime is understudied especially when compared with street crime even though it has more wide-reaching consequences.

- [Corporations Don’t Have to Maximize Profits](https://www.nytimes.com/roomfordebate/2015/04/16/what-are-corporations-obligations-to-shareholders/corporations-dont-have-to-maximize-profits)

    Refutal of a "a total falsehood invented in the 1970s by Milton Friedman" as [referred](https://macwright.com/2020/12/24/the-new-reading-stack.html) by Tom MacWright.

    > There is a common belief that corporate directors have a legal duty to maximize corporate profits and “shareholder value” — even if this means skirting ethical rules, damaging the environment or harming employees. But this belief is [utterly false](https://www.brookings.edu/~/media/research/files/papers/2012/6/18%20corporate%20stout/stout_corporate%20issues.pdf). To quote the U.S. Supreme Court [opinion](https://caselaw.lp.findlaw.com/scripts/getcase.pl?court=US&vol=000&invol=13-354) in the recent Hobby Lobby case: “Modern corporate law does not require for-profit corporations to pursue profit at the expense of everything else, and many do not.”

- [ARCHITECTURE.md](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html)

    Indeed, [developing is undoubtedly hard](https://www.boramalper.org/blog/duh-developings-undoubtedly-hard/).

    > I have experience with both contributing to and maintaining open-source projects. One of the lessons I’ve learned is that the biggest difference between an occasional contributor and a core developer lies in the knowledge about the physical architecture of the project. Roughly, it takes 2x more time to write a patch if you are unfamiliar with the project, but it takes 10x more time to figure out where you should change the code. This difference might be hard to perceive if you’ve been working with the project for a while. If I am new to a code base, I read each file as a sequence of logical chunks specified in some pseudo-random order. If I’ve made significant contributions before, the perception is quite different. I have a mental map of the code in my head, so I no longer read sequentially. Instead, I just jump to where the thing should be, and, if it is not there, I move it. Mental map is the source of truth.

- [Stop Swiss Cheesing your calendar](https://thinkingthrough.substack.com/p/stop-swiss-cheesing-your-calendar)

    TL;DR: If you are allocating time for meetings on your calendar, why not also allocate 3-4 hours long blocks for uninterrupted work?

    > When a meeting ends, we need time to clear the head, reset and get in the zone to do the work, especially when the job requires a cognitive effort like coding or design or even writing an email.

- [Blog with Markdown + Git, and degrade gracefully through time](https://brandur.org/fragments/graceful-degradation-time)

    > It’s not going to matter for a month, or a year, or probably five years, but once it reaches that horizon of 10+ years where things start disappearing, it might really make a difference. Interested parties can still see content even after the original host is long gone. No one plans for their site to disappear, but most eventually do.

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)

    Long read of the week.

    > One of the most difficult parts of software development is making sure that you build the right software. We've found that it's very hard to specify what you want in advance and be correct; people find it much easier to see something that's not quite right and say how it needs to be changed.

- [Bitcoin is a disaster](https://www.metzdowd.com/pipermail/cryptography/2020-December/036510.html)

    > The scarcity of block chain space has led people to re-invent every last feature of the banks they thought they were going to be escaping.
    >
    > And it's useless for small transactions.

    - [*This Hacker News Comment*](https://news.ycombinator.com/item?id=25599146)

        An interesting take on Bitcoin's position in cryptofinance.

        > Most of the criticisms in this thread seem to be missing that Bitcoin is only layer 1.

    - [*That Hacker News Comment*](https://news.ycombinator.com/item?id=25600140)

        > The situation reminds me a bit of Robert Nozick's Anarchy, State, and Utopia. It's a great bit of political philosophy where he argues pretty convincingly that an anarchist society cannot exist for any appreciable length of time.

- [I voted for I don’t want pattern matching.](https://discuss.python.org/t/gauging-sentiment-on-pattern-matching/5770/21)

    Yep, [PEP 634](https://discuss.python.org/t/gauging-sentiment-on-pattern-matching/5770/21) "Structural Pattern Matching" in Python.

    In 2017, [I wrote](https://github.com/boramalper/magnetico/issues/150#issuecomment-330186390) about the problems that the balkanisation of concurrency models in Python entails --- for those who don't know, that would be asyncio + [sans I/O](https://sans-io.readthedocs.io/), multithreading (under [GIL](https://wiki.python.org/moin/GlobalInterpreterLock)), and multiprocessing. Whilst I don't think that the addition pattern matching will lead to a similar balkanisation, I think the trend is slightly worrying.

    > Finally, I’ll reference something I swear I saw one very smart Pythonista say in an interview: “In Python, we don’t build Domain-Specific Languages, we build Domain-Specific Libraries”.

- [Stop Defacing Quotes With Brackets!](https://slate.com/human-interest/2021/02/stop-defacing-quotes-with-brackets.html)

    The last rant of the week by Tom Scocca.

    > This is not a question of mere taste or preference. Juliet did not say “O Romeo, Romeo, wherefore [is he] Romeo.” The Beatles did not sing “\[They] Want\[ed] to Hold \[Someone’s] Hand.” Human beings quite easily and naturally follow grammar as it shifts from one point of view to another.