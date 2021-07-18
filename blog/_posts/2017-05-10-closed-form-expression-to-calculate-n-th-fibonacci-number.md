---
id: 372
title: Closed-Form Expression to Calculate n-th Fibonacci Number
date: 2017-05-10T23:53:11+02:00
author: Bora M. Alper
layout: post
guid: http://blog.boramalper.org/?p=372
permalink: /closed-form-expression-to-calculate-n-th-fibonacci-number/
categories:
  - Computer Science
tags:
  - Fibonacci numbers
  - mathematics
  - optimization
  - programming
---
_A more interesting way to find n<sup>th</sup> [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number)._

Fibonacci sequence is a prime example in teaching recursion to newcomers, and a great opportunity to brag if your language supports [Tail Call Optimization](http://wiki.c2.com/?TailCallOptimization), but it often goes unnoticed that there is a [closed-form expression](https://en.wikipedia.org/wiki/Closed-form_expression) which lets us find the n<sup>th</sup> Fibonacci number with great ease and in much faster way. This article will present the expression, and explain -step by step- its derivation using high-school mathematics.

Here is the expression (for \\( u_1 = u_2 = 1 \\) ):

\\[
u_n = \frac{1}{\sqrt5}\left(\left(\frac{1+\sqrt5}{2}\right)^n - \left(\frac{1-\sqrt5}{2}\right)^n\right)
\\]

## Derivation of the Closed-Form Expression

_Find a closed-form expression for_ \\( u_{n+2} = u_{n+1} + u_n \\) _for_ \\( u_1 = u_2 = 1 \\).

Let \\( u_n = c \times k^n \\) for some constants \\(c\\) and \\(k\\). Now substitute this into the recurrence relationship:

\\[
\begin{aligned}
u_{n+2} &= u_{n+1} + u_n \\\\c \times k^{n+2}
  &= c \times k^{n+1} + c \times k^n
\end{aligned}
\\]

Let&#8217;s simplify the expression by eliminating \\(c\\) and \\(k^n\\):

\\[
\begin{aligned}
c \times k^{n+2} &= c \times k^{n+1} + c \times k^n \\\\c \times k^{n+2}
  &= c \times \left( k^{n+1} + k^n \right) \\\\k^{n+2}
  &= k^{n+1} + k^n \\\\k^2
  &= k + 1
\end{aligned}
\\]

Using [quadratic formula](https://en.wikipedia.org/wiki/Quadratic_formula) to solve \\( k^2 - k - 1 = 0 \\), we would find:

\\[
k = \frac{1 \pm \sqrt 5}{2}
\\]

Hence it seems there are two possible solutions:

\\[
u_n = c \times \left(\frac{1 + \sqrt 5}{2}\right)^n
\\]

or

\\[
u_n = c \times \left(\frac{1 - \sqrt 5}{2}\right)^n
\\]

Let&#8217;s try to find \\(c\\) by using the predefined values \\( u_1 = u_2 = 1 \\), starting with the first possible solution:

\\[
\begin{aligned}
u_1 &= 1 = c \times \left(\frac{1 + \sqrt 5}{2}\right) \\\\ u_2
    &= 2 = c \times \left(\frac{1 + \sqrt 5}{2}\right)^2
\end{aligned}
\\]

It&#8217;s clear that two sets of equations are [inconsistent](https://en.wikipedia.org/wiki/Consistent_and_inconsistent_equations), that is, there is no value of \\(c\\) that can satisfy both equations. It would be also true for the second possible solution we found (though omitted to keep the article concise).

Another thing we can try is to use both solutions we found by substituting them into the recurrence relation itself:

\\[
u_n = c_1 \times \left(\frac{1 + \sqrt 5}{2}\right)^n + c_2 \times \left(\frac{1 - \sqrt 5}{2}\right)^n
\\]

Now if we try again for \\( u_1 = u_2 = 1 \\):

\\[
\begin{aligned}
u\_1 &= 1 = c\_1 \times \left(\frac{1 + \sqrt 5}{2}\right) + c_2 \times \left(\frac{1 - \sqrt 5}{2}\right) \\\\ u\_2
        &= 1 = c\_1 \times \left(\frac{1 + \sqrt 5}{2}\right)^2 + c_2 \times \left(\frac{1 - \sqrt 5}{2}\right)^2
\end{aligned}
\\]

<a href="https://www.wolframalpha.com/input/?i=a+*+(1+%2B+sqrt(5))+%2F+2+%2B+b+*+(1+-+sqrt(5))+%2F+2+%3D+1+AND+a+*+((1+%2B+sqrt(5))+%2F+2)%5E2+%2B+b+*+((1+-+sqrt(5))+%2F+2)%5E2+%3D+1">Solving two equations simultaneously</a>, we would find \\( c\_1 = \frac{1}{\sqrt 5} \\) and \\( c\_2 = - \frac{1}{\sqrt 5}\\). Hence, our closed-form expression is:

\\[
\begin{aligned}
u_n &= \frac{1}{\sqrt 5} \times \left(\frac{1 + \sqrt 5}{2}\right)^n - \frac{1}{\sqrt 5} \times \left(\frac{1 - \sqrt 5}{2}\right)^2 \\\\ u_n
        &= \frac{1}{\sqrt5}\left(\left(\frac{1+\sqrt5}{2}\right)^n - \left(\frac{1-\sqrt5}{2}\right)^n\right)
\end{aligned}
\\]

## Testing the Closed-Form Expression and Comparison With the Recursive Calculation

I used Python 3.6.1 x64 on Windows 10 x64 to perform the following benchmarks using the code below:

```python
# Recursive version
def fib_r(n: int) -> int:
    return 1 if n >= 2 else fib_r(n - 1) + fib_r(n - 2)

# Closed-form version
def fib_cf(n: int) -> int:
    return 0.4472135954999579 * (1.618033988749895**n - (-0.6180339887498949)**n)
```

The closed-form version hold accurate for \\(n < 72\\) and is off-by-one when \\(n = 72\\). This is clearly because of the [computational limits in handling floating-point numbers](https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html). 72 is not a magic number either, but [72<sup>nd</sup> Fibonacci number](https://www.wolframalpha.com/input/?i=72nd+Fibonacci+number) is equal to 498,454,011,879,264 which contains 15 significant digits, and all the constants in `fib_cf(n)` have 16 significant digits, hence some loss in accuracy is expected considering that the last digits of those constants are rounded off. For instance in Python \\(\sqrt 2\\) will give you 1.414213562373**0951** while it is actually 1.414213562373**0950**488&#8230;.

As Michael Abrash said, [&#8220;The Best Optimizer Is between Your Ears&#8221;](http://www.jagregory.com/abrash-black-book/#chapter-1-the-best-optimizer-is-between-your-ears). =)

* * *

## Interesting Reading

Edsger W. Dijkstra - [In honour of Fibonacci (EWD654)](http://www.cs.utexas.edu/users/EWD/ewd06xx/EWD654.PDF)\\
Dr Ron Knott - [A Formula for the n-th Fibonacci number](http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibFormula.html)