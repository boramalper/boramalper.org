---
title: "What I Read This Week: 2021-07"
date: 2021-02-21T00:00:00Z
---

- [Specialization Is For Insects](https://wiki.c2.com/?SpecializationIsForInsects)

    The following two entries are also great.

    > A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyze a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.

- [“User Engagement” Is Code For “Addiction”](https://craigwritescode.medium.com/user-engagement-is-code-for-addiction-a2f50d36d7ac)

    > I believe that human beings, on some fundamental level as social creatures, need to have trusting face-to-face community with others. Forcing people indoors and abstracting their social interactions, forcing human contact into a communication channel that is both easily monetized and easily monitored, it harms our brains in a way that we don’t yet fully understand, in addition to giving untold amounts of power to private tech companies.

- [The Security Value of Inefficiency](https://www.schneier.com/blog/archives/2020/07/the_security_va.html)

    [Texans are suffering](https://www.houstonchronicle.com/business/energy/article/Wholesale-power-prices-spiking-across-Texas-15951684.php) from a state-wide failure of their power grid, which reminded me of Schneier's article on (in)efficiency.

    > This drive for efficiency leads to brittle systems that function properly when everything is normal but break under stress. And when they break, everyone suffers. The less fortunate suffer and die. The more fortunate are merely hurt, and perhaps lose their freedoms or their future. But even the extremely fortunate suffer — maybe not in the short term, but in the long term from the constriction of the rest of society.

- [Many Small Queries Are Efficient In SQLite](https://sqlite.org/np1queryprob.html)

    Yet another bullet point to add my SQLite love letter. For every single FOSS project I have been working on for the past couple years, SQLite has been my go-to database.

    > SQLite is not client/server, however. The SQLite database runs in the same process address space as the application. Queries do not involve message round-trips, only a function call. The latency of a single SQL query is far less in SQLite. Hence, using a large number of queries with SQLite is not the problem. 

- [Uncle Bob and Silver Bullets](https://www.hillelwayne.com/uncle-bob/)

    > One of the core assumptions of modern systems engineering is that there’s a constant flow of defects: that people make mistakes. You can’t rely on people to not fuck up on their own: after all, the US still has 30,000 auto deaths a year. Rather, the best way to reduce the volume and severity of mistakes is to adjust the system itself. Either make them harder to do, make them easier to catch, or make them cause less damage when they do happen. Don’t just blame the drivers, give them safe roads! Give them seatbelts!

- [Computers Aren't Fun Anymore](https://feifan.blog/posts/computers-arent-fun-anymore)

    > Throughout [The Dream Machine](https://www.amazon.com/Dream-Machine-M-Mitchell-Waldrop/dp/1732265119), a history of the early days of computing, tinkering and having fun was a recurring theme throughout the decades. I wasn’t around to experience the early days of computers myself, but they seemed to be genuinely exciting and rewarding. In the words of MIT sociologist Sherry Turkle: computers empowered their users, making them feel smart\[er], “in control”, and “more fully participant in the future”. 

    I miss the crudeness of old UIs a ton, not only in themselves (ie aesthetically) but also the way they used to stimulate thinking and a deeper understanding of the underlying system: compare [the tiny squares of old defrag.exe](http://hultbergs.org/defrag/) to soulless progressbars of modern Windows for instance, the old version makes one wonder what each square might stand for? :)

- [Washington Post public editor: The powerful have realized they don’t need the Post](https://www.cjr.org/public_editor/washington-post-tesla-trump-power.php)

    > Because journalism, particularly at the highest level, is about raw power. It is about bringing important people to heel, on behalf of the public. Politicians and officials and business leaders don’t want to talk to the press, subjecting themselves to the possibility of being made to look bad; they do it because they have always felt they had no choice. They felt that way because papers like the Post could offer the carrot of great exposure to those who needed it, but also, always, the stick of negative coverage to those who spurned them. There is nothing devious or ignoble about this; a powerful press, for all its flaws, is good for democracy, and tends to promote equality by holding the big shots in check. Anyone who has ever negotiated to land a contentious interview with a famous person knows that you only get those interviews when your subject fears what will happen if they don’t do the interview. Today, that fear is disappearing. We all need to figure out what to do about that. 

- *[This Hacker News Comment](https://news.ycombinator.com/item?id=26107948)*

    > Rather few web apps need high write concurrency and low write latency. Great many web apps serve 99.9% of hits with SELECTs only, and when some new data needs to be persisted, the user can very well wait for a second or two, so rarely it happens. But this is often forgotten.
    >
    > Same realization brought a wave of static site generators: updates are so rare that serving pages from a database makes no sense, and caching them makes little sense: just produce the "pre-cached" pages and serve them as is.
    >
    > Maybe a similar wave can come to lighter-weight web apps: updates are so rare that you don't need Postgres to handle them. You can use SQLite, or Redis, or flat files as the source of your data, with massively less headache. Horizontal scaling becomes trivial. Updates are still possible, of course, you just pay a much lower complexity price for them, while paying a higher latency price.

    Now read this once again in the context of decentralised web. =)

- [Ask HN: What are the best websites that the Anglosphere doesn't know about?](https://news.ycombinator.com/item?id=26137479)

- [always bet on text](https://graydon2.dreamwidth.org/193447.html)

    > Text is the most socially useful communication technology. It works well in 1:1, 1:N, and M:N modes. It can be indexed and searched efficiently, even by hand. It can be translated. It can be produced and consumed at variable speeds. It is asynchronous. It can be compared, diffed, clustered, corrected, summarized and filtered algorithmically. It permits multiparty editing. It permits branching conversations, lurking, annotation, quoting, reviewing, summarizing, structured responses, exegesis, even fan fic. The breadth, scale and depth of ways people use text is unmatched by anything. There is no equivalent in any other communication technology for the social, communicative, cognitive and reflective complexity of a library full of books or an internet full of postings. Nothing else comes close.

- [Uber drivers are workers not self-employed, Supreme Court rules](https://www.bbc.com/news/business-56123668)

    > Looking at these and other factors, the court determined that drivers were in a position of subordination to Uber where the only way they could increase their earnings would be to work longer hours.
