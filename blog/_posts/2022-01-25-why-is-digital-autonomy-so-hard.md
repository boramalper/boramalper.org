---
title: "Why Is Digital Autonomy So Hard?"
date: 2022-01-25T20:24:00Z
---

**BLUF:** I believe email _addresses_ are the most prominent form of digital identity and our reliance on the domain names of others in "our" email addresses is a huge risk that is not talked about enough. Similarly, cloud storage services are getting increasingly important as file systems are the only truly cross-platform mechanisms in sharing data between devices, yet none of the off-the-shelf offerings is working well. Unless one confines themselves (and the people they interact with) within the walled gardens of Apple, Google, or Microsoft, it is prohibitively expensive and/or difficult to break free.

**Situation/Task:** I wanted to set up separate email accounts for my family members using a domain name that I purchased and buy cloud storage that I could share with them.

**Actions:** I have considered the following alternatives:
- [iCloud+](https://support.apple.com/en-us/HT201238)
    - Can be shared with up to 6 people.
    - Supports custom email domains.
    - $2.99/month for 200 GB, which is pretty cheap. 
    - Unsurprisingly, it is really hard to use it anywhere other than Apple's ecosystem, especially on Linux, and Android but there is [partial support for Windows](https://support.apple.com/en-us/HT204571). This was a dealbreaker.
    - Consequently, you pay the price at the purchase of your Apple hardware. Still, not too bad.
- [Google One](https://one.google.com/)
    - It can be [shared](https://one.google.com/faq/plan-sharing?hl=en) with up to 6 people _in the same region_.
    - Being abroad from my family, I would require two different subscriptions which is not too bad given that Google's pricing is (for now) quite generous.
    - Google Photos is _the_ best out there.
    - Google Docs Editors is also quite good, but vendor lock-in is a serious threat as they are not even represented as files on your drive that you can download to your computer but links---manual exports don't count.
    - Custom domains are not supported, which is a dealbreaker.
    - It can cost as little as $2 per month for 100 GB shared between all members.
- [Microsoft 365 Family](https://www.microsoft.com/en-ie/microsoft-365/onedrive/compare-onedrive-plans)
    - You need to buy the domain name on GoDaddy _and_ delegate DNS management to Microsoft & GoDaddy _altogether_.
    - [Cannot add more than one custom domain](https://answers.microsoft.com/en-us/outlook_com/forum/all/o365-family-subscription-limited-to-one-domain-for/a5b6e751-7840-4626-b4c8-aaf8a295b660) either.
    - Consequently, I would not be able to use my current email address (which is on my personal domain) whilst providing my family members with their own email addresses. This was a dealbreaker for me.
    - It costs $10 per month for up to 6 people.
- [Fastmail](https://www.fastmail.com/)
    - What I have been using happily for my current email.
    - Practically unlimited number of custom domains and aliases.
    - CalDAV + CardDav support that works seamlessly on all platforms including macOS, Linux, iOS and Android (using [DAVx5](https://www.davx5.com/)).
    - The main user costs a minimum of $5/month and each additional user with their own mailbox costs $3/month for 2 GB of storage (and $5/month for 30 GB).
        - For a family of four, that makes \\(5 + 3 \times 3 = 14\\) USD per month _for email alone_.
- [Dropbox](https://www.dropbox.com/)
    - I have been using somewhat grudgingly due to its [3-devices](https://help.dropbox.com/accounts-billing/settings-sign-in/computer-limit) limitation.
    - Truly cross-platform (including an official Linux client) and platform agnostic, which is precisely what one may want in a cloud storage system.
    - Presumably has one of the best (if not _the best_) synchronisation engines out there with features such as faster local syncs, delta transfers, and more advanced conflict resolution algorithms.
    - In contrast to Google One, the pricing is far from being incremental: you either pay zero on the Basic plan and make do with 2 GB, or $20 per month for a whopping 2 TB of space.
    - Together with Fastmail, Dropbox would cost me $34 per month.
- [Hetzner Storage Share](https://www.hetzner.com/storage/storage-share) (hosted [Nextcloud](https://nextcloud.com/))
    - No artificial limitations on the number of users, or signed-in devices except the number of subdomains (which is practically never a big deal).
    - A free/open-source software hosted by a reliable cloud vendor so kind of the best of both worlds. It is platform-agnostic and has an official Linux client.
    - That being said, the clients are not top quality:
        - During my month-long trial, I have observed many synchronisation conflicts that turned out to be okay, but nevertheless worrying.
        - Android app crashed frequently while "auto" uploading photos so I had to restart the app manually until the initial sync was completed.
        - Synchronisations are somewhat slow, and it is hard to track their progress.
    - It seems to be designed with enterprise use in mind more than individuals, friends, and families. There are a plethora of non-polished features that makes it a jack of all trades but master of none.
        - I would have loved to see a built-in office suite that wasn't laggy and buggy.
        - A gallery solution with some EXIF-based basic categorization and search capabilities would be 10x more useful than a mere "dump of photos" in `InstantUpload/`.
    - Consequently to all above, the user experience was quite dissatisfactory.
    - It costs €4.90 per month for 500 GB.
    - Together with Fastmail, it would have cost me ~$20 per month.
- [Seafile](https://www.seafile.com/en/home/)
    - Another open-source cloud storage solution that I have heard nearly only good things about.
    - [Only a small number (5) of little-known hosting providers](https://www.seafile.com/en/partner/)
    - Self-hosting is out of the question since, as with email, I consider those too critical to risk any self-inflicted failures.
- I have not considered any enterprise solutions such as [Google Workspaces](https://workspace.google.com/intl/en_us/) or [Microsoft 365 F3](https://www.microsoft.com/en-us/microsoft-365/compare-microsoft-365-enterprise-plans) since I do not want to manage their complexity and also because of their significant differences (from branding to the suite of available apps) from consumer offerings.

**Results:** I simply gave up. I still use Fastmail for myself and created a basic account for my little brother (as he enjoys his custom email address tremendously) but did not extend the plan to my parents. I tried really hard to like Nextcloud but I am getting tired of its papercuts so I am eyeing Dropbox again for better or worse, will see how much I can keep up the fight.

**Comments:** Why does it have to be so hard? Why is it so hard to find email providers that allow us to use more than one custom domain with multiple users? Why does it cost a small fortune to simply share storage space with multiple users for file synchronisation? How is file synchronisation still not a solved problem? How much additional effort does maintaining a Linux client require (and is it more than the cross-platform custom GUI toolkit you developed for your corporate branding)?

> Easy things should be easy, and hard things should be possible. \
> &mdash;[Larry Wall](http://www.wall.org/~larry/)

Also read: [Self-Hosting: Initial Lessons]({% post_url 2019-09-08-self-hosting-initial-lessons %})