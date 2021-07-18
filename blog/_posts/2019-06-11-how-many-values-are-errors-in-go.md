---
id: 577
title: How many values are errors in Go?
date: 2019-06-11T09:13:37+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=577
permalink: /how-many-values-are-errors-in-go/
hefo_before:
  - "0"
hefo_after:
  - "0"
categories:
  - Software Engineering
tags:
  - Go
---
This post is written as a follow-up on [Go’s Error Handling Sucks – A quantitative analysis]({% post_url 2019-06-09-gos-error-handling-sucks-a-quantitative-analysis %}) upon the request of [Herb Sutter](https://herbsutter.com/) who asked for a rough percentage of function calls that return error information to all function calls.

For this purpose, I have used the following regex for capturing function calls that return an error:

```regex
[a-zA-Z0-9_]*[eE]rr(or)? *:?= *([a-zA-Z0-9_]*\.)*[a-z-A-Z0-9_]+\(
```

and the following regex for capturing any function call:

```regex
([a-zA-Z0-9_]*\.)*[a-z-A-Z0-9_]+\(
```

The first regex relies on the convention that `error` is the last (or the only) value of any function that returns error information.

The second regex has the following shortcomings which should be understood:

  * Casts are mistaken as function calls.
    E.g. `ENFILE = syscall.Errno(0x17)`
  * Counting built-in &#8220;functions&#8221; such as `len`, `append` etc might be undesirable.
  * Function definitions, `import`s, and `const`s are confused as function calls, but I filtered them in my calculations.

Lastly, I have used the following commands to count:

```bash
ag --go --stats-only "[a-zA-Z0-9_]*[eE]rr(or)? *:?= *([a-zA-Z0-9_]*\\.)*[a-z-A-Z0-9_]+\\("

ag --go -v "func|const \\(|import \\(" | ag --stats-only "([a-zA-Z0-9_]*\\.)*[a-z-A-Z0-9_]+\\("
```

Here are the results:

|                         |  # of Calls Returning `error`  |  # of Function Calls  | Ratio  |
|-------------------------|-------------------------------:|----------------------:|-------:|
| **Kubernetes**          | 83,442                         | 740,385               | 0.1127 |
| **Go**                  | 27,741                         | 482,546               | 0.0575 |
| **Moby (Docker)**       | 37,044                         | 310,736               | 0.1192 |
| **Cockroach DB**        | 24,498                         | 254,926               | 0.0961 |
| **Mattermost (server)** | 22,737                         | 214,756               | 0.1059 |
| **etcd**                | 13,761                         | 135,957               | 0.1012 |
| **Syncthing**           | 2,436                          | 25,472                | 0.0956 |
| **Hugo**                | 1,876                          | 23,983                | 0.0782 |
| **Helm**                | 1,927                          | 11,443                | 0.1684 |
| **Gin**                 | 242                            | 5,307                 | 0.0456 |
| **TOTAL**               | 215,704                        | 2,205,511             | 0.0978 |

For the record, here are the repositories used and their respective commits:

  * **Kubernetes**
    <https://github.com/kubernetes/kubernetes/tree/c7972d9a5e7f555371fec7a3237f08ebc1ae9d7c>
  * **Go**
    <https://github.com/golang/go/tree/13f179b9c8c3b9d9066e71d0a69cff8c0876098b>
  * **Moby (Docker)**
    <https://github.com/moby/moby/tree/238f8eaa31aa74be843c81703fabf774863ec30c>
  * **Cockroach DB**
    <https://github.com/cockroachdb/cockroach/tree/de90b5d84c9e5d2ef562ebfa3d4a1bdc0e834e10>
  * **Mattermost (server)**
    <https://github.com/mattermost/mattermost-server/tree/76eee12ac878a3f0e9c21195474865b9aaab7118>
  * **etcd**
    <https://github.com/etcd-io/etcd/tree/48d144a3dee85f0ca6dc138c54a0c5267e2c6c97>
  * **Syncthing**
    <https://github.com/syncthing/syncthing/tree/41ff4b323e9c1be314215d8a4e34dfa5e6055e57>
  * **Hugo**
    <https://github.com/gohugoio/hugo/tree/fad183c4ae55069be9246e64ab1c8b2f43d08d06>
  * **Helm**
    <https://github.com/helm/helm/tree/2ca025d48222d6fa188653e2ca5eda6ed799145c>
  * **Gin**
    <https://github.com/gin-gonic/gin/tree/73c4633943d596bdbeaa7d02cebdd4bd0c4f4630>
