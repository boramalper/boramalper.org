---
title: "Tor, Practical Privacy, and Censorship Resistance"
date: 2021-10-02T00:00:00Z
---

- It is more practical to think of privacy as a multi-faceted continuum rather than a binomial feature.
- Something often has to be traded-off for privacy and the compromise might not make sense in all cases, all the time.
- Tor Browser goes at [painstaking lengths](https://2019.www.torproject.org/projects/torbrowser/design/) to protect the privacy of its users, such as routing _all_ requests through Tor, which results in the infamous endless-CAPTCHAs ([patented by Google](https://www.google.com/patents/US9407661)), increased latencies, and a more frustrating experience overall that makes it unfit for everyday use.
- Instead, website operators are targeted and punished much more than their visitors, thus the need for privacy is wildly asymmetric between those two groups most of the time.
- Whilst there is HTTP (followed by HTTPS) at the one end and Tor at the other, there should be a middle ground that provides strong privacy guarantees to website operators while allowing visitors to access their services with ease.
- Currently, the onus is fully on the operators who resort to domain-cycling to evade DNS-based censorship attempts, grey CDNs to mask IP addresses of their servers, and bulletproof hosting services as a last resort against cease and desist requests.
- In the light of recent events such as the de-platforming of [Parler](https://www.eff.org/deeplinks/2021/01/beyond-platforms-private-censorship-parler-and-stack) in January and [Navalny's app](https://edition.cnn.com/2021/09/17/tech/navalny-app-google-facebook/index.html) a couple of weeks ago (just as [Navalny had warned](https://twitter.com/navalny/status/1347970421161922560) about setting a precedent when Twitter has banned Trump), [the increasing prevalence of deep packet inspection mechanisms](https://en.wikipedia.org/wiki/Deep_packet_inspection#By_governments), and IP-based blocks, there is decreasingly little breathing room for dissenting voices on the Internet.
- Tor is positioned as a privacy suite first and foremost, but it is also a censorship-resistant platform that can protect the privacy of website operators while providing a comfortable and _reasonably private_ browsing experience to their visitors.
- Mainstream browsers should integrate Tor to allow users to visit .onion websites just as any other, with only the requests to `*.onion` domains being routed through the Tor network.

## Try It
1. Install Tor daemon:

   ```bash
   sudo apt install tor
   # or, using Homebrew:
   brew install tor
   # or, using Chocolatey:
   choco install tor
   ```
1. Install Firefox, and [FoxyProxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) extension.
1. In FoxyProxy, add a new proxy:
    - Title: Tor
    - Proxy Type: SOCKS5
    - Proxy IP address: `127.0.0.1`
    - Port: `9050`
    - "Send DNS through SOCKS5 proxy" on
    - Color: `#7D4698` (see [Tor Styleguide](https://styleguide.torproject.org/visuals/))
1. Click "Save & Edit Patterns".
1. Add a new white pattern:
    - Name: Onions
    - Pattern: `*.onion`
    - Type: Wildcard
    - HTTP/s: all
    - Enabled: on
1. Click "Save" to complete the proxy setup.
1. Click the FoxyProxy button near the address bar, and select "Use Enabled Proxies By Patterns and Order".
1. Visit [ProPublica](http://p53lf57qovyuvwsc6xnrppyply3vtqm7l6pcobkmyqsiofyeznfu5uqd.onion/) to test your access to Tor Hidden Services.
1. Visit [ipinfo.io](https://ipinfo.io/) to confirm that other websites are accessed as usual.

Enjoy!
