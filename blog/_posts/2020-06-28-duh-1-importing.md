---
title: "DUH #1: Importing"
date: 2020-06-28T12:19:00+03:00
---

Welcome to the #1 episode of [Developing's Undoubtedly Hard]({% post_url 2020-06-28-duh-developings-undoubtedly-hard %}).

## Scenario
I have founded [newsmail.today](https://newsmail.today/), a news aggregator that feeds into your mailbox. I have started working on it in June 2019, when I was getting a bit frustrated with the amount of time I spent checking [Hacker News](https://news.ycombinator.com/) and [reddit](https://www.reddit.com/).

I wanted my users to be able to import their list of subscriptions from other services using the XML-based industry-standard [OPML](https://en.wikipedia.org/wiki/OPML) format. OPML is all fine and dandy, it's a simple format that does the trick.

## Hardship
"What if a user tries to import _N_ too many subscriptions?" This is a _really_ difficult question to answer since the problem is two fold:

### UX
Assuming that we maintain our records in a consistent & validated state (which is almost always the case), exports can be really quick whereas imports in contrast almost always take much longer because we will be processing untrusted data from the client.

In a web app, the longer processing time imposes a UX question as the operation might take longer (> 10 seconds) than [the users' attention span](https://www.nngroup.com/articles/response-times-3-important-limits/) so a simple button with loading effect won't work.

The two alternative solutions to the problem are:

1. Admitting the defeat and instead notifying the user once the import is completed. Of course this is a huge blow to interactivity, and while it may be acceptable in certain heavy-duty cases (such as, say, [CAD](https://en.wikipedia.org/wiki/Computer-aided_design) software), many users won't regard a feed aggregator as one.

   - This can also introduce additional complexity to the system if we would like our users to be able to act upon the imported data before we "forget" the operation; for instance, being able to select which subscriptions to import rather than importing all of them blindly.

      Such freedom would come at the cost of making the operation stateful: _e.g._ `importing`, `imported`, `failed`, `done`.

2. Making the webapp more interactive to update the user of the progress of the operation, such that although the operation takes the same amount of time, the system maintains an illusion of interactivity to keep the users' attention.

   - Compared to the previous alternative, this is a more acceptable solution from a UX standpoint as we keep the users' attention throughout a "trivial" operation.

   - Another advantage over the previous alternative is the lack of need to make the operation stateful.

   - Of course this solution also introduces additional complexity to the system such as requiring client-side rendering, and having to update the progress of the operation. Long-polling or a WebSocket connection to report the progress to the client increases the load on the system, each with different pros and cons.

### Latency
OPML looks like this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
    <head>
        <title>Bora's Subscriptions in newsmail.today</title>
    </head>
    <body>
        <outline text="Blogs" title="Blogs">
            <outline
                type="rss"
                text="copyrighteous"
                title="copyrighteous"
                xmlUrl="https://mako.cc/copyrighteous/feed/atom"
                htmlUrl="https://mako.cc/copyrighteous" />
            <outline
                type="rss"
                text="Model View Culture"
                title="Model View Culture"
                xmlUrl="http://modelviewculture.com/feed"
                htmlUrl="https://modelviewculture.com" />
        </outline>
    </body>
</opml>
```

Thus for each `outline[type="rss"]` element in the document, we need:

1. Fetch the RSS/Atom feed at the `xmlUrl` and get the feed details. (1 HTTP request)
2. Get the icon of the feed:
   1. Fetch the webpage of the feed and look at [the metadata](https://bitsofco.de/all-about-favicons-and-touch-icons/) to find the URL of the icon. (1 HTTP request)
   2. Download the icon. (1 HTTP request)

Sometimes the `xmlUrl` points at an invalid URL (_e.g._ a blog that has moved from Wordpress to Jekyll) so we need to visit the webpage at `htmlUrl` first and use heuristics to find the URL of its feed, which takes a minimum of 2 HTTP requests if not more.

So **for each subscription**, we are looking at a minimum of 3 HTTP requests before we can import it. Usually the number is much higher than 3, and there is little we can do to get rid of those requests unless the source is already tracked in our database. Throwing more computational power won't solve it because it's an I/O-bound operation, and even throwing more bandwidth won't solve it as we are constrained by the latency and the bandwidth of the others' servers!

The solution is to make those HTTP requests **concurrently**. Luckily, [concurrency is not parallelism](https://blog.golang.org/waza-talk) so Python and its [GIL](https://wiki.python.org/moin/GlobalInterpreterLock) is not an issue for this case. Unfortunately though, neither Python nor Django provides a straightforward way to do I/O (or any other operation) concurrently and Python's concurrency is a mess with three incompatible (multithreading, multiprocessing, async/await) competing solutions.

In addition, we shall use timeouts for each request and "fail" each subscription if _some_ HTTP requests fail (_e.g._ when feed is not found) while handling some other failures gracefully (_e.g._ missing icons).

Finally, we should ensure that we impose a reasonable limit on the number of concurrent requests at a given time so to ensure that we are not overwhelming our server. This is mostly trivial if we use [thread pools](https://docs.python.org/3/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor) where the limit would be the number of threads in the pool.

## Conclusion
I personally love this problem because it shows how real-world performance considerations involve much more than [Big-O](https://en.wikipedia.org/wiki/Big_O_notation) analysis of functions. In fact, I even argue that for the majority of the real-world cases where essential functionality (such as data structures and algorithms on them) is already implemented for you in standard libraries, Big-O analysis is **not** even as relevant as understanding the choke points of software performance like I/O latency, buffering, caching, and so on.

Importing is undoubtedly hard.

