<!DOCTYPE html>
<!-- This document is an example of how not to design web-pages, hence "heavy", but may still be considered *light*
  -- in comparison to others.
  -->
<html lang="en-GB">
    <head>
        <meta charset="utf-8" />
        <title>Heavy Page - Demo - Light Web-Pages</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <!-- Include every possible option instead of carefully choosing only what you actually need -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
        <link rel="stylesheet" href="stylesheets/normalize.css"/>
        <link rel="stylesheet" href="stylesheets/highlight/default.css"/>
        <link rel="stylesheet" href="index.css"/>
        <!-- Load the unminified versions of the scripts synchronously to increase the pain -->
        <script src="scripts/jquery-3.2.1.js"></script>
        <script src="scripts/highlight.pack.js"></script>
        <script src="index_.js"></script>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-6369477540697672",
    enable_page_level_ads: true
  });
</script>
    </head>
    <body>
    <header title="An irrelevant video which has nothing to do with the main content">
        <video id="video" width="1920" height="1080" autoplay loop>
            <source src="assets/FG0fTKAqZ5g.webm" type="video/webm" />
        </video>
        <h1 title="I downloaded a whole font for these 16 characters">The "Heavy" Page</h1>
    </header>

    <main>
        <h1 align="center">Demo</h1>

        <strong><code>LWP</code> Header:</strong>
        <?php
            $headers = apache_request_headers();
            $lwp_value = $headers["Lwp"] ?? null;

            if ($lwp_value != null) {
                echo "<code>$lwp_value</code> ";
                    if ($lwp_value == "0") {
                        echo "(<em>original</em> preferred)";
                    }
                    elseif ($lwp_value == "1") {
                        echo "(<em>light</em> preferred)";
                    }
                    else {
                        echo "(<strong>ERRONEOUS!</strong>)";
                    }
            }
            else {
                echo "<strong>inexistent!</strong> (no redirection)";
            }
        ?>

        <p>Now click on some of the links below and see how long it takes to load them, in comparison to The
        <i>Light</i> Page:</p>

        <ul>
            <li><a href="https://www.apple.com/macbook-pro/">MacBook Pro - Apple</a></li>
            <li><a href="https://www.independent.co.uk/news/business/news/google-eu-fine-latest-competition-shopping-searches-prepare-online-european-commission-results-a7809886.html">Google hit with record EU fine over 'unfair' shopping searches | The Independent <strong>(AMP version)</strong></a></li>
        </ul>

        <p><i>None of the links above are pre-fetched.</i></p>

        <hr>

        <h1 align="center">Light Web-Pages</h1>
<p>Light Web-Pages (LWP) is a mechanism for redirecting users automatically to the <em>lighter</em> versions of the web-pages they visit.</p>
<ul>
<li><a href="#what-is-lwp">What is LWP?</a></li>
<li><a href="#what-lwp-tries-to-solve">What LWP tries to solve?</a></li>
<li><a href="#is-lwp-an-enhancement-over-amp">Is LWP an enhancement over AMP?</a></li>
<li><a href="#how-lwp-works">How LWP works?</a></li>
<li><a href="#automatic-redirection">Automatic redirection</a></li>
<li><a href="#pre-fetching">Pre-fetching</a>
<ul>
<li><a href="#pre-fetching-faq">Pre-fetching FAQ</a></li>
</ul></li>
<li><a href="#how-to-use-lwp">How to use LWP?</a></li>
<li><a href="#configuring-an-apache-http-server">Configuring an Apache HTTP Server</a></li>
<li><a href="#using-light-web-pages-add-on">Using Light Web-Pages Add-On</a></li>
<li><a href="#demo">Demo</a></li>
<li><a href="#license">License</a></li>
</ul>
<h2 id="what-is-lwp">What is LWP?</h2>
<p>LWP is a proposal to add a new header in HTTP GET and HEAD requests, indicating the client's preference in favour of a <em>lighter</em> version of the requested resource. The server, then, should redirect the client to the <em>lighter</em> version of the requested resource, if exists.</p>

<p>LWP is proposed as an open alternative to the current proprietary solutions, to keep the Web free, and also to make it <em>accessible</em> to users with limited/bad Internet connections.</p>

<h2 id="what-lwp-tries-to-solve">What LWP tries to solve?</h2>
<p>The average web-page size increases steadily and regardless of whether it might be considered as a bloat or not, it constitutes a problem for many users on mobile and on other platforms with <em>bad</em> Internet connections. There is a trend, as we might call, which led to numerous projects to solve the problem, and the central idea is to increase the <a href="https://en.wikipedia.org/wiki/Perceived_performance">perceived performance</a> of the web-pages thorugh various techniques, such as pre-fetching content in the background, using optimized assets and formats and so on, but most importantly, reducing (and limiting) the amount and the kind of content that can be used. Most popular examples of such projects are:</p>
<ul>
<li>Facebook's <a href="https://instantarticles.fb.com/">Instant Articles</a></li>
<li>Apple's <a href="https://www.apple.com/news/">News</a></li>
<li>Google's <a href="https://www.ampproject.org/">Accelerated Mobile Pages</a></li>
</ul>
<p>First two of these examples are completely proprietary solutions designed to be used only within the closed software ecosystems of the corporations developing them. Google's Accelerated Mobile Pages, on the other hand, is an open-specification powered by open-source libraries that doesn't require an additional client but only a standards-compliant web-browser. Very briefly, AMP works by lazy-loading resources and by loading them as much asynchronously as possible to ensure that the user downloads only what s/he needs at the moment, and that happens in the fastest way possible.</p>
<p>The problem with AMP is that although it is an open-specification with open-source libraries, it currently depends on Google on three important areas:</p>
<ul>
<li><p>There are no available mechanisms to redirect users automatically to the AMP version of a web-page, and we have to depend on Google Search to do that for us (which is not opt-in, and users cannot opt-out either).</p></li>
<li><p>Pre-fetching AMP-pages works only on Google Search, although there are fully standards-compliant ways to do that in HTML 5 (explained later on).</p></li>
<li><p>Visitors coming from Google Search will visit the Google-cached copy of your AMP-page without leaving <code>google.com</code> at all.</p></li>
</ul>
<p>(Some web-sites [<em>e.g.</em> The New York Times] do not even allow users to access AMP-versions of their web-pages directly and instead redirects them to the mobile version [<a href="https://mobile.nytimes.com/2017/05/13/technology/google-education-chromebooks-schools.amp.html">for instance</a>].)</p>
<p>All these combined raises some very valid concerns regarding the overly-centralised nature of the open-source AMP project, in contrast to the decentralised nature of the Web that consist of hyperlinks to other web-pages that live on different domains and servers. <strong>Indeed, it wouldn't be an exaggeration to say that AMP is akin to Instant Articles and (Apple) News, while the difference being that Google's client works on a web browser and very well integrated to its Search.</strong></p>
<h3 id="is-lwp-an-enhancement-over-amp">Is LWP an enhancement over AMP?</h3>
<p><strong>NO.</strong> Although you can use LWP as a mechanism to serve AMP pages without relying on Google, you can use LWP to serve <em>any</em> web-page that you deem to be the <em>lighter</em> version of another.</p>
<p>Another significant difference is that while AMP focuses on mobile devices only, <strong>LWP embraces both mobile and desktop users</strong>, as we think that the quality of your Internet connection is what matters, and it does not only depend on the device you use, but also (and mainly) on the location (<em>i.e.</em> whether between the mountains or in the middle of a city), your economic status with respect to your ISP (<em>i.e.</em> how much bandwidth and gigabytes per month can you afford), and variety of other factors. <strong>According to Akamai's <a href="https://content.akamai.com/gl-en-pg9135-q1-soti-connectivity.html">Q1 2017 State of the Internet / Connectivity Report</a> the global average connection speed is 7.2 Mbps</strong>.</p>
<h2 id="how-lwp-works">How LWP works?</h2>
<h3 id="automatic-redirection">Automatic redirection</h3>
<p><strong><code>LWP</code> is a HTTP header, to be added in GET requests, indicating the user's preference on <em>light</em> web-pages.</strong></p>
<p>There are three different outcomes of a GET request regarading the <code>LWP</code> header:</p>
<ol style="list-style-type: decimal">
<li><strong>If the <code>LWP</code> header not exists in a GET request</strong>, the server MUST serve the requested resource <strong>wtihout</strong> any redirections.
<p>This is about backwards-compatibility and meeting the expectations: we should <strong>not</strong> surprise any software that is not LWP-aware and redirect them to a different <em>version</em> of a resource, which is, technically speaking, a different resource. Although we would not be breaking any specifications when we redirect, we would be acting against the expectations of <em>actual users</em>, who might get frusturated for not being able to access the <em>exact</em> resource s/he wants.</p>
</li>
<li><strong>If the <code>LWP</code> header in a GET request is set to <code>&quot;1&quot;</code></strong>, the server MUST respond with a 303 &quot;See Other&quot; where the <code>Location</code> is the URI of the <em>lighter</em> version of the requested resource, if exists. The client, then, MUST follow the 303 &quot;See Other&quot; response just as usual.
<p>The client SHALL NOT assume that the server is redirecting because of the <code>LWP</code> header, as it might be caused by something entirely else as well. Nevertheless, in both cases the client is ought to follow the HTTP specification for the response from the server.</p></li>
</ol>
<p><strong>Why 303 &quot;See Other&quot;?</strong></p>
<ul>
<li><p>Because of the semantics; compare the following two quotations:</p>
<blockquote>
<p>The new URI is not a substitute reference for the originally requested resource.</p>
<p><a href="https://www.ietf.org/rfc/rfc2616.txt">303 &quot;See Other&quot; - RFC 2616</a></p>
</blockquote>
<p>and</p>
<blockquote>
<p>The requested resource resides temporarily under a different URI.</p>
<p><a href="https://www.ietf.org/rfc/rfc2616.txt">302 &quot;Found&quot; - RFC 2616</a></p>
</blockquote>
<p>Since <em>light</em> pages are <strong>not</strong> substitute references for the original pages (since they are technically different <strong>documents</strong>), we thought that 303 &quot;See Other&quot; would be a better fit.</p></li>
<li><p>Because of the caching rules:</p>
<blockquote>
<p>The 303 response MUST NOT be cached, but the response to the second (redirected) request might be cacheable.</p>
<p><a href="https://www.ietf.org/rfc/rfc2616.txt">303 &quot;See Other&quot; - RFC 2616</a></p>
</blockquote>
<p>So, every single time, the redirection depends on the respond from the server, but if 303 &quot;See Other&quot; received for a given request, it can be served from the cache whenever possible.</p></li>
</ul>
<ol start="3" style="list-style-type: decimal">
<li><p><strong>If the <code>LWP</code> header in a GET request is set to <code>&quot;0&quot;</code></strong>, the server MUST respond with a 303 &quot;See Other&quot; where the <code>Location</code> is the URI of the <em>heavier</em>/original version of the requested resource, if exits. The client, then, MUST follow the 303 &quot;See Other&quot; response just as usual.</p>
<p>Any client software that uses <code>LWP</code> header can safely be assumed to be LWP-aware, hence, if it's set to zero, the server MUST redirect the client to the original version of the resource.</p></li>
</ol>
<h3 id="pre-fetching">Pre-fetching</h3>
<p>If you think that the user might follow some of the links presented in your web-page, you can instruct the browser to <em>pre-fetch</em> them by adding the appropriate <code>&lt;link&gt;</code>s in the <code>&lt;head&gt;</code>:</p>
<pre><code>&lt;link rel=&quot;prefetch&quot; href=&quot;https://example.com/test&quot;&gt;</code></pre>
<p>Pre-fetching is <strong>already</strong> a Web standard, so this section is provided as a friendly guide on how to do that without relying on others and using only standards-compliant ways.</p>
<h4 id="pre-fetching-faq">Pre-fetching FAQ</h4>
<p><em>From: <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ">https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ</a></em></p>
<ul>
<li><strong>Is link prefetching standards compliant?</strong>
<p>Yes, link prefetching as outlined in this document does not violate any existing web standards. [...] However, the exact mechanism employed by Mozilla is not yet standardized. [...] Standardization of this technique is part of the scope of HTML 5, see the current working draft, <a href="http://www.whatwg.org/specs/web-apps/current-work/#link-type-prefetch">section §5.11.3.13. Link type &quot;prefetch&quot;</a>.</p>
</li>
<li><strong>Will browser prefetch documents from a different host?</strong>
<p>Yes. There is no same-origin restriction for link prefetching.</p>
</li>
<li><strong>Do prefetched requests contain a Referer: header?</strong>
<p>Yes, prefetched requests include a HTTP <code>Referer:</code> header indicating the document from which the prefetching hint was extracted.</p>
</li>
<li><strong>Do users have a preference to disable link prefetching?</strong>
<p>Yes, there is a hidden preference that users can set to disable link prefetching at least on Mozilla Fireox.</p>
</li>
<li><strong>Which browsers support link prefetching?</strong>
<p>See <a href="https://caniuse.com/#feat=link-rel-prefetch">https://caniuse.com/#feat=link-rel-prefetch</a>.</p>
</li>
</ul>
<h2 id="how-to-use-lwp">How to use LWP?</h2>
<h3 id="configuring-an-apache-http-server">Configuring an Apache HTTP Server</h3>
<p>Thanks to <code>mod_rewrite</code>, enabling LWP support on Apache is a straightforward process. Let's say that <em>lighter</em> resources are located under <code>light/</code>, followed by the exact same path of the <em>heavier</em>/original resource. For instance, the lighter version of</p>
<pre><code>https://www.nytimes.com/2017/05/13/technology/google-education-chromebooks-schools.html</code></pre>
<p>would be</p>
<pre><code>https://www.nytimes.com/light/2017/05/13/technology/google-education-chromebooks-schools.html</code></pre>
<p>and so on. In this case, you can use the following configuration in your <code>.htaccess</code> in the <strong><a href="https://httpd.apache.org/docs/2.4/urlmapping.html#documentroot">DocumentRoot</a></strong>:</p>
<pre><code class="apacheconf"># Enable Rewrite Engine (duh).
RewriteEngine on


# If LWP header is equal to &quot;0&quot; (heavy/original content is preferred) AND
RewriteCond %{HTTP:LWP} =0

# if the effective URL starts with &quot;/light/&quot; or is just &quot;/light&quot; AND
RewriteCond %{REQUEST_URI} ^/light(/.*|)$

# if the will-be-redirected URL exists (check whether the file/directory exists)
RewriteCond %{DOCUMENT_ROOT}%1 -f [OR]
RewriteCond %{DOCUMENT_ROOT}%1 -d

# THEN redirect the client to the original URL minus &quot;light/&quot; prefix.
RewriteRule ^light/(.*)$ $1 [R=303,L]


# If LWP header is equal to &quot;1&quot; (lighter content is preferred) AND
RewriteCond %{HTTP:LWP} =1

# if the effective URL neither starts with &quot;/light/&quot; nor is just &quot;/light&quot; AND
RewriteCond %{REQUEST_URI} !^/light(/.*|)$

# (this is just to catch the path, to be used in the next group)
RewriteCond %{REQUEST_URI} ^(/.*|)$

# if the will-be-redirected URL exists (check whether the file/directory exists)
RewriteCond %{DOCUMENT_ROOT}%1 -f [OR]
RewriteCond %{DOCUMENT_ROOT}%1 -d

# THEN redirect the client to the orignal URL prefixed with &quot;light/&quot;
RewriteRule ^(.*) light/$1 [R=303,L]</code></pre>
<p>The configuartion will redirect the client only if redirection won't cause a 404 &quot;Not Found&quot; error, and this is achieved by checking if to-be-redirected file and/or directory exists: it's not the right way to do things, since there are other deciding factors whether a client can access a given file/directory, but it should be sufficient for demonstration purposes.</p>
<p><strong>That's all there is!</strong> Of course, depending on the structure and the complexity of your setup, you might want to handle redirection somewhere else in the stack or somewhat differently.</p>
<h3 id="using-light-web-pages-add-on">Using Light Web-Pages Add-On</h3>
<p><strong>Currently, the support for LWP on client side is implemented using Light Web-Pages Add-On</strong>, that is developed using WebExtensions, and works on Google Chrome/Chromium and Mozilla Firefox. It is hoped that once LWP gains attention and enough support from the community, it will be supported natively by the web browsers and become a standard of the open Web.</p>
<img src="assets/lwp-addon-ss.png" alt="Screenshot of Light Web-Pages Add-On" style="display: block; margin-left: auto; margin-right: auto;"/>
<ul><li>For Mozilla Firefox: <a href="https://github.com/boramalper/light-web-pages/releases/download/v0.1.0/light_web_pages-v0.1.0.xpi">light_web_pages-v0.1.0.xpi</a></li><li>For Google Chrome/Chromium: <a href="https://github.com/boramalper/light-web-pages/releases/download/v0.1.0/light_web_pages-v0.1.0.crx">light_web_pages-v0.1.0.crx</a></li></ul>
<h3 id="demo">Demo</h3>
<p><a href="http://labs.boramalper.org/light-web-pages/demo">http://labs.boramalper.org/light-web-pages/demo</a></p>
<h2 id="license">License</h2>
<p>This document is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.</p>
<p>Light Web-Pages Add-On is licensed under an <a href="https://opensource.org/licenses/MIT">MIT License</a>.</p>
<hr />
<p>Do you have anything to contribute? Feel free to send me, Bora M. Alper, an <script type="text/javascript">
<!--
h='&#98;&#x6f;&#114;&#x61;&#x6d;&#x61;&#108;&#112;&#x65;&#114;&#46;&#x6f;&#114;&#x67;';a='&#64;';n='&#98;&#x6f;&#114;&#x61;';e=n+a+h;
document.write('<a h'+'ref'+'="ma'+'ilto'+':'+e+'" clas'+'s="em' + 'ail">'+'&#x65;&#x2d;&#x6d;&#x61;&#x69;&#108;'+'<\/'+'a'+'>');
// -->
</script><noscript>&#x65;&#x2d;&#x6d;&#x61;&#x69;&#108;&#32;&#40;&#98;&#x6f;&#114;&#x61;&#32;&#x61;&#116;&#32;&#98;&#x6f;&#114;&#x61;&#x6d;&#x61;&#108;&#112;&#x65;&#114;&#32;&#100;&#x6f;&#116;&#32;&#x6f;&#114;&#x67;&#x29;</noscript> or open an issue on the <a href="https://github.com/boramalper/light-web-pages">GitHub page</a> of the project!</p>
    </main>
    </body>
</html>