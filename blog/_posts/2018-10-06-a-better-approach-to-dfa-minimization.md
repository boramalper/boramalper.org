---
id: 509
title: A Better Approach to DFA Minimization
date: 2018-10-06T12:13:01+02:00
author: Bora M. Alper
layout: post
guid: /assets/?p=509
permalink: /a-better-approach-to-dfa-minimization/
hefo_before:
  - "0"
hefo_after:
  - "0"
image: /wp-content/uploads/2018/10/Screenshot_2018-10-05-2018_inf2a_T01_exercises-pdf-1-624x245.png
categories:
  - Computer Science
tags:
  - dfa
  - informatics
  - mathematics
  - minimization
---

DFA minimization is often described as follows:

1. First eliminate any unreachable states (easy).
2. Then create a table of all possible pairs of states \\( (p, q) \\), initially <em>unmarked</em>. (<em>E.g.</em> a two-dimensional array of booleans, initially set to <em>false</em>.) We mark pairs \\((p, q)\\) as and when we discover that \\(p\\) and \\(q\\) cannot be equivalent.
   1. Start by marking all pairs&nbsp;\\((p, q)\\) where \\(p \in F\\) and \\(q \not\in F\\), or vice versa.
   2. Look for unmarked pairs&nbsp;\\((p, q)\\) such that for some \\(u \in \Sigma\\), the pair \\((δ(p, u), δ(q, u))\\) is marked. Then mark \\((p, q)\\).
   3. Repeat step 2.2 until no such unmarked pairs remain. If&nbsp;\\((p, q)\\) is still unmarked, can collapse \\(p\\) and \\(q\\) to a single state.

<strong>Source:</strong> Mary Cryan, Informatics 2A: Processing Formal and Natural Languages, <a href="http://www.inf.ed.ac.uk/teaching/courses/inf2a/slides2018/inf2a_L05_slides.pdf">Lecture 5</a>, 2018.<br>

Based on my <em>very</em> limited research, aforementioned algorithm seems to be the most common way of teaching undergrads how to minimise a given DFA, but I believe that it suffers from reasons soon listed below, and I will instead propose a better way of executing the <em>same</em> algorithm that does not (make the student) suffer from the same problems.<br>

<h2>Current Problems</h2>

In order of increasing severity:


1. Drawing a triangular half-table by hand is confusing as not getting the row/column spacing right will result in a shape that might confuse the student, and the distance between the cell and its column/row header makes it harder to process the information.<br>
1. "Looking for unmarked pairs" makes you revisit the same pairs again and again as new pairs are getting marked.<br>



<h2>A Better Approach</h2>


1. First eliminate any unreachable states (easy).
1. Then create a <strong>list</strong> of all possible pairs of states \\((p, q)\\), initially <em>unmarked</em>. When we discover that \\(p\\) and \\(q\\) cannot be equivalent, we mark pairs \\((p, q)\\) by putting a mark, iteration number, and some other information we'll soon learn.<br>
   1. Start by marking all pairs \\((p, q)\\) where \\(p \in F\\) and \\(q \not\in F\\), or vice versa.<br><br>While marking record the iteration number (#1) as well.<br>
   2. <strong>For each marked pair&nbsp;\\((p, q)\\) from the <em>previous</em> iteration</strong>, mark all unmarked pairs \\((p', q')\\) if \\(\exists u \in \Sigma\\) such that \\((δ(p', u), δ(q', u)) = (p, q)\\).<br><br>While marking, record the iteration number,  the state \\((p, q)\\) that you came from, and the letter \\(u\\) as well.<br>
   3. Repeat step 2.2 as a new iteration until no new pairs marked.<br>





The greatest difference between the previous approach and ours is step 2.2 where, instead of looking for the same unmarked pairs again and again, we consider only the <em>marked</em> states from the <em>previous</em> iteration, which makes the whole process far more efficient and is easier to keep track of (as we record the iteration number while marking) and to verify if needed (as we record the previously marked state that we came from, and the letter \\(u\\)).

<h3>An Example</h3>

<figure class="wp-block-image"><img src="{{site.baseurl}}/assets/wp-content/uploads/2018/10/Screenshot_2018-10-05-2018_inf2a_T01_exercises-pdf.png" alt="" class="wp-image-512"/><figcaption>An exemplary DFA.</figcaption></figure>

There are no unreachable states to eliminate.

Let us create a list of all possible pairs of states \\((p, q)\\), initially unmarked.


1. \\((q0, q1)\\)<br>
1. \\((q0, q2)\\)
1. \\((q0, q3)\\)
1. \\((q0, q4)\\)
1. \\((q0, q5)\\)
1. \\((q0, q6)\\)
1. \\((q1, q2)\\)
1. \\((q1, q3)\\)
1. \\((q1, q4)\\)
1. \\((q1, q5)\\)
1. \\((q1, q6)\\)
1. \\((q2, q3)\\)
1. \\((q2, q4)\\)
1. \\((q2, q5)\\)
1. \\((q2, q6)\\)
1. \\((q3, q4)\\)
1. \\((q3, q5)\\)
1. \\((q3, q6)\\)
1. \\((q4, q5)\\)
1. \\((q4, q6)\\)
1. \\((q5, q6)\\)



<h4>Iteration #1</h4>

<em>Start by marking all pairs \\((p, q)\\) where \\(p \in F\\) and \\(q \not\in F\\), or vice versa.</em>


1. \\((q0, q1)\\)<br>
1. \\((q0, q2)\\)
1. \\((q0, q3)\\)
1. \\((q0, q4)\\)
1. \\((q0, q5)\ \checkmark_{1}\\)
1. \\((q0, q6)\ \checkmark_{1}\\)
1. \\((q1, q2)\\)
1. \\((q1, q3)\\)
1. \\((q1, q4)\\)
1. \\((q1, q5)\ \checkmark_{1}\\)
1. \\((q1, q6)\ \checkmark_{1}\\)
1. \\((q2, q3)\\)
1. \\((q2, q4)\\)
1. \\((q2, q5)\ \checkmark_{1}\\)
1. \\((q2, q6)\ \checkmark_{1}\\)
1. \\((q3, q4)\\)
1. \\((q3, q5)\ \checkmark_{1}\\)
1. \\((q3, q6)\ \checkmark_{1}\\)
1. \\((q4, q5)\ \checkmark_{1}\\)
1. \\((q4, q6)\ \checkmark_{1}\\)
1. \\((q5, q6)\\)



<h4>Iteration #2</h4>

<em>For each marked pair&nbsp;\\((p, q)\\) from the previous iteration, mark all unmarked pairs \\((p', q')\\) if \\(\exists u \in \Sigma\\) such that \\((δ(p', u), δ(q', u)) = (p, q)\\).</em>

<figure class="wp-block-image"><img src="{{site.baseurl}}/assets/wp-content/uploads/2018/10/Screenshot_2018-10-05-2018_inf2a_T01_exercises-pdf.png" alt="" class="wp-image-512"/><figcaption>For instance, the pair \\((q2, q5)\\) that we've marked in the previous iteration, can be reached from \\((q0, q3)\\) with letter 'b'.</figcaption></figure>


1. \\((q0, q1)\\)<br>
1. \\((q0, q2)\ \checkmark_{2\ (q2, q6)\ b}\\)
1. \\((q0, q3)\ \checkmark_{2\ (q2, q5)\ b}\\)
1. \\((q0, q4)\ \checkmark_{2\ (q2, q6)\ b}\\)
1. \\((q0, q5)\ \checkmark_{1}\\)
1. \\((q0, q6)\ \checkmark_{1}\\)
1. \\((q1, q2)\ \checkmark_{2\ (q1, q3)\ b}\\)
1. \\((q1, q3)\ \checkmark_{2\ (q3, q5)\ b}\\)
1. \\((q1, q4)\ \checkmark_{2\ (q3, q6)\ b}\\)
1. \\((q1, q5)\ \checkmark_{1}\\)
1. \\((q1, q6)\ \checkmark_{1}\\)
1. \\((q2, q3)\\)
1. \\((q2, q4)\\)
1. \\((q2, q5)\ \checkmark_{1}\\)
1. \\((q2, q6)\ \checkmark_{1}\\)
1. \\((q3, q4)\\)
1. \\((q3, q5)\ \checkmark_{1}\\)
1. \\((q3, q6)\ \checkmark_{1}\\)
1. \\((q4, q5)\ \checkmark_{1}\\)
1. \\((q4, q6)\ \checkmark_{1}\\)
1. \\((q5, q6)\\)



<h4>Iteration #3</h4>

<em>For each marked pair&nbsp;\\((p, q)\\) from the previous iteration, mark all unmarked pairs \\((p', q')\\) if \\(\exists u \in \Sigma\\) such that \\((δ(p', u), δ(q', u)) = (p, q)\\).</em>

<figure class="wp-block-image"><img src="{{site.baseurl}}/assets/wp-content/uploads/2018/10/Screenshot_2018-10-05-2018_inf2a_T01_exercises-pdf.png" alt="" class="wp-image-512"/><figcaption>For instance, the pair \\((q1, q2)\\) that we've marked in the previous iteration, can be reached from \\((q0, q1)\\) with letter 'a'.</figcaption></figure>


1. \\((q0, q1)\ \checkmark_{3\ (q1, q2)\ a}\\)<br>
1. \\((q0, q2)\ \checkmark_{2\ (q2, q6)\ b}\\)
1. \\((q0, q3)\ \checkmark_{2\ (q2, q5)\ b}\\)
1. \\((q0, q4)\ \checkmark_{2\ (q2, q6)\ b}\\)
1. \\((q0, q5)\ \checkmark_{1}\\)
1. \\((q0, q6)\ \checkmark_{1}\\)
1. \\((q1, q2)\ \checkmark_{2\ (q1, q3)\ b}\\)
1. \\((q1, q3)\ \checkmark_{2\ (q3, q5)\ b}\\)
1. \\((q1, q4)\ \checkmark_{2\ (q3, q6)\ b}\\)
1. \\((q1, q5)\ \checkmark_{1}\\)
1. \\((q1, q6)\ \checkmark_{1}\\)
1. \\((q2, q3)\\)
1. \\((q2, q4)\\)
1. \\((q2, q5)\ \checkmark_{1}\\)
1. \\((q2, q6)\ \checkmark_{1}\\)
1. \\((q3, q4)\\)
1. \\((q3, q5)\ \checkmark_{1}\\)
1. \\((q3, q6)\ \checkmark_{1}\\)
1. \\((q4, q5)\ \checkmark_{1}\\)
1. \\((q4, q6)\ \checkmark_{1}\\)
1. \\((q5, q6)\\)



<h4>Iteration #4</h4>

<em>For each marked pair&nbsp;\\((p, q)\\) from the previous iteration, mark all unmarked pairs \\((p', q')\\) if \\(\exists u \in \Sigma\\) such that \\((δ(p', u), δ(q', u)) = (p, q)\\).</em>

The only pair we marked in the previous iteration, \\((q0, q1)\\) is not reachable from any other unmarked state so no new pairs are marked in this iteration.

Thus we are done!<br>

<h4>Results</h4>

The unmarked pairs in our list are:


1. \\((q2, q3)\\)
1. \\((q2, q4)\\)
1. \\((q3, q4)\\)
1. \\((q5, q6)\\)



And thus:

<figure class="wp-block-image"><img src="{{site.baseurl}}/assets/wp-content/uploads/2018/10/Screenshot_2018-10-06-2018_inf2a_T01_solutions-pdf.png" alt="" class="wp-image-513"/><figcaption>The Minimized DFA</figcaption></figure>

<hr class="wp-block-separator"/>

Hope you find it useful!
