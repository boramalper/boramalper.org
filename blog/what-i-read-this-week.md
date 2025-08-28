---
layout: page
title: What I Read This Week
permalink: /what-i-read-this-week/
---

<ul class="post-list">
{% for post in site.categories.wirtw %}
    <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
    <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
        </a>
    </h3>
    </li>
{% endfor %}
</ul>