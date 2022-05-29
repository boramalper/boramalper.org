---
title: "What I Read This Week: 2022-21"
date: 2022-05-29T20:07:00Z
---

- [Improved error reporting for CPython 3.10—and beyond](https://lwn.net/Articles/895587/) (LWN subscribers only, see [What's New In Python 3.10 § Better error messages](https://docs.python.org/3/whatsnew/3.10.html#better-error-messages))
  
  I think "papercuts" are severly underestimated so it makes me incredibly happy that CPython devs are addressing them, especially important given that Python is the first language (and often the _only_ language) many people use.

- [How To Be Successful](https://blog.samaltman.com/how-to-be-successful)

  > I am willing to take as much time as needed between projects to find my next thing. But I always want it to be a project that, if successful, will make the rest of my career look like a footnote.

  Reminds me of that famous Kierkegaard quote:

  > It is perfectly true, as the philosophers say, that life must be understood backwards. But they forget the other proposition, that it must be lived forwards.

- [Donald Knuth on work habits, problem solving, and happiness](https://shuvomoy.github.io/blogs/posts/Knuth-on-work-habits-and-problem-solving-and-happiness/)

  On the subject of advice, Shuvomoy Das Gupta has curated some quotes of Donald Knuth on life. I must say that I found his advice on how to work more relatable than on how to live.

  This particular tidbit I loved:

  > I schedule my activities in a somewhat peculiar way. Every day I look at the things that I'm ready to do, and choose the one that I like the least, the one that's least fun — the task that I would most like to procrastinate from doing, but for which I have no good reason for procrastination. This scheduling rule is paradoxical because you might think that I'm never enjoying my work at all; but precisely the opposite is the case, because I like to finish a project. It feels good to know that I've gotten through the hurdles.

- [The forgotten benefits of "low tech" user interfaces](https://uxdesign.cc/the-forgotten-benefits-of-low-tech-user-interfaces-57fdbb6ac83)

  Besides the tactility of low tech interfaces (which I _love_), the author makes a great point of them being at lower cost meaning that they can be afforded by more people in need; frugality is a feature too.

- [Why SQLite may become foundational for digital progress](https://venturebeat.com/2022/05/20/why-sqlite-may-become-foundational-for-digital-progress/)

  One of the most differentiating features of SQLite is that it _is_ a relation database file format that you can simply copy from one place to another, without having to "dump" and/or "import" anything anywhere---I might be totally wrong here, but in my limited experience no RDBMS supports this. That simple fact, that the database is a computer file, enables a pleathora of abstractions already available for files to a relational SQL database. For example, [Litestream](https://litestream.io/) (already mentioned in the article) and [sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs).

- [This "amateur" programmer fought cancer with 50 Nvidia Geforce 1080Ti](https://howardchen.substack.com/p/this-amateur-programmer-fought-cancer)

  The article is not well written, being sensationalised and all that, but I found it worth sharing for two reasons:

  - On the one hand I love the fact that scientific literature is now at our fingertips and determined individuals can study, build, and operate such complex systems themselves. On the other hand, a wrong diagnosis can cause lots of stress or negligence, and in any case patients require consulting a medical professional to confirm their online diagnosis and, if required, plan their treatment. Target users of this tool should be professionals, not patients.
  - There is a sea of computer science and software engineering resources out there (docs, blogs, forums, programs) in languages other than English that are not ordinarily available to us, except the effort of few individuals translating to English (whereas translations from English are much more common). It's so surprising to me that many companies are trying to tackle real-time speech translation through various gadgets, whereas huge portions of the Web is still in the dark unless you understand their language. 

    In all fairness, I think Google is addressing this; from [Google I/O; "Near Me", Competition, and Innovation; Pixel and Fitbit (Stratechery)](https://stratechery.com/2022/google-i-o-near-me-competition-and-innovation-pixel-and-fitbit/):

    > "What's the national song of Bangladesh?" The answer, by the way, is "Amar Sonar Bangla", and PaLM got it right too. This is not that surprising because you would expect that content would exist in Bengali. But you can also try something that is less likely to have related information in Bengali, such as, "What are popular pizza toppings in New York City?" And the model again answers correctly in Bengali, though it probably just stirred up a debate amongst New Yorkers about how correct the answer really is. 
