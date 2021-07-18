---
id: 555
title: "Go's Error Handling Sucks – A quantitative analysis"
date: 2019-06-09T12:22:19+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=555
permalink: /go-s-error-handling-sucks-a-quantitative-analysis/
hefo_before:
  - "0"
hefo_after:
  - "0"
image: /wp-content/uploads/2019/06/Screenshot_2019-06-09-Go-2-Drafts-Announcement-YouTube1-624x332.png
categories:
  - Software Engineering
tags:
  - Go
---
Go&#8217;s error handling sucks because it forces its developers to propagate errors up the callstack manually, whereas you could `CATCH` and `THROW` errors since 1972 using MacLisp according to [Wikipedia](https://en.wikipedia.org/wiki/Exception_handling).

Some claim that Go&#8217;s way of handling errors encourages developers to actually handle the damn errors instead of letting exceptions float freely in the hope of someone else handling it. I believe, on the contrary, the way we currently handle errors leads to visual satiation where your screen is filled with `if err != nil { return ... }` blocks as you manually propagate errors. It has become a masochistic cult where veterans are trying to convince newcomers that this is actually better.

Another shortcoming of Go&#8217;s `error`s is that they are extremely primitive. `error` is an interface with a single method `Error()` that returns a string intended for humans. That&#8217;s it. Callstack or any other debugging information is missing by default, unless you choose a third-party package such as <a href="https://github.com/pkg/errors">`pkg/errors`</a> and `Wrap()` your errors as you propagate them. The standard library doesn&#8217;t encourage sane behaviour either, [forcing developers to either string-search](https://golang.org/pkg/net/#OpError) or [cast errors in undocumented ways](https://stackoverflow.com/questions/22761562/portable-way-to-detect-different-kinds-of-network-error-in-golang).

To prove how inefficient this is, I&#8217;ll `grep` the source code of Go&#8217;s flagship projects for the following snippet:

```go
if [...; ] err != nil {
    return ...
}
```

which is nothing but simply propagating the error up the callstck (_i.e._ return the error to the caller as soon as you encounter an error); something a compiler or a runtime would do if we were using a more modern language using the exceptions mechanism. For this purpose, I&#8217;ll use the following regex:

```regex
err != nil {\n\t*return
```

and multiply the number of times this occurs with 3, since it takes three lines of code.

|                   | # Lines of Go Code | # Lines of Code for Manual Propagation | Ratio |
|-------------------|-------------------:|---------------------------------------:|------:|
| **Kubernetes**    | 2,912,663          | 43,587                                 | 4.49% |
| **Go**            | 1,606,829          | 7,715                                  | 1.44% |
| **Moby (Docker)** | 1,013,087          | 18,738                                 | 5.55% |
| **Cockroach DB**  | 776,340            | 12,238                                 | 4.73% |
| **etcd**          | 444,291            | 4,726                                  | 3.19% |
| **helm**          | 40,056             | 758                                    | 5.68% |

In conclusion, 3.88% of the Go code written (excluding comments and blanks) consist of manual error propagation, which is problematic.

[Even Russ Cox admits it.](https://youtu.be/6wIP3rO6On8?t=131)