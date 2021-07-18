---
layout: post
title:  "Self-Hosting: Initial Lessons"
date:   2019-09-08 13:21:00 +0100
categories: [autonomy, self-hosting]
---

Establishing my digital *autonomy* was always a goal that seemed too hard to
realise, until I've said "if not me, who?" If I, as a prospective computer
scientist, could not manage to achieve this goal, was there any hope for others
(majority of which) has neither the skills nor the interest & time?

Without further ado, here are the initial lessons I've learned in the past
month:

# 0 - No Silver Bullet
[Analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis) is a thing.
Unless you internalise the fact that there is no silver bullet, you'd
frusturate yourself for no reason and end up with an over-engineered solution or no solution at all.

You'll inevitably have some duct tapes here and there holding pieces together,
some hard-coded variables in your configs. There'll always be "more" to do, such
as setting up SELinux, fail2ban, fine-tuning your MySQL database, and even in
the absence of anything, you'll feel tempted to try how long would it take you
to restore your backups. In the end, all is okay; you'll learn things organically.

For reference, I use a single VPS on AWS ([t3.micro](https://aws.amazon.com/ec2/instance-types/t3/))
and use Docker to containerise my apps. My only rule is that **every app except
the essential ones (ssh, nginx, docker daemon, and portainer) must be
containerised.** I found that this rule alone is enough to keep things tidy,
as containers ensure that no app is stepping on another's toes, and also Compose
& Docker files automate and document things to a large degree.

# 1 - Use Elastic/Floating IPs
Assuming you are also opting for a VPS rather than building a [homelab](https://www.reddit.com/r/homelab/),
I strongly advise you to get an IP address that you can assign to whatever machine
you want (which is called "elastic" or "floating" IP in AWS and DigitalOcean
jargon). They don't even cost you any extra if they are attached to a VPS.

The beauty of elastic IPs is that they add another level of indirection at IP
level so that if you hardcode the IP address of your server in your configs
(say you are using PiHole), you don't need to worry too much about changing
servers down the road.

# 2 - When in Doubt, Delegate
If you are afraid of loosing data or messing things up where it's intolerable,
delegate. To me, PiHole crashing is not as big of a concern but even if the 1%
of my e-mails do not reach their destination (or vice versa), that is absolutely
intolerable. Therefore I've delegated that to [FastMail](https://www.fastmail.com)
instead, and am immensely happy with their service (e-mail, contacts, calendar,
and WebDAV).

Realising that there is more to autonomy than just self-hosting is also
important. For instance, losing my notes is also something I cannot risk,
therefore I opt for [Joplin](https://joplinapp.org/) + Dropbox, which is far better
than locking myself into Evernote/Google Keep/Notion.so. Besides Dropbox
gives me the peace of mind that even if Joplin accidentally wipes all my notes,
I can restore them using its recovery features.

# 2 - "Genesis"
I have a docker-compose stack called "Genesis" on my server which consists of
the following services:

- [acme.sh](https://acme.sh/)\\
  to get wildcard [Let's Encrypt](https://letsencrypt.org/) certificates using
  [DNS verification](https://github.com/Neilpang/acme.sh/wiki/dnsapi)
- [portainer](https://www.portainer.io/)\\
  to manage Docker from my browser
- nginx\\
  as a static file server and reverse proxy

All other stacks are set up by portainer which also helps me to manage them more
easily.

The reason I recommend this is because I found acme.sh much *cleaner* than
Certbot, both in terms of containerisability and also its ways of operating. I
use [DNS challenge](https://letsencrypt.org/docs/challenge-types/) instead of
more-common HTTP challenge as that way I don't need to worry about making
acme.sh and my web server (nginx) operate in harmony, and also because it allows
you to issue wildcard certificates, which are very convenient when you are
setting up virtual hosts for your services.

portainer makes management easier, but not as much as I anticipated either. If
you can directly use images on a registry, that's fine, but when you need to
build them yourself or to provide some additional files (such as configs), it
falls short unfortunately; I had to start from the command line `docker-compose up -d`.

nginx is great, and gets out of your way. I placed my ssl settings at [`http`
context of `nginx.conf`](https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts#the-http-context)
so that they are applied for every virtual host. Speaking of which, I maintain
a short `.conf` file for each virtual host under `/etc/nginx/conf.d/` directory
of the nginx container so that I can activate/deactivate them by adding/renaming
and signalling `docker kill --signal=HUP nginx`.

# 3 - Private and Public
I classify my services in two:

- public services\\
  at `*.boramalper.org` which are accessible by the outside world
- private services\\
  at `*.x.boramalper.org` which are *not* accessible by the outside
  world

For all web services, nginx acts as a reverse proxy for handling virtual hosts,
HTTPS traffic, and authorisation.

Authorisation is quite simple, yet effective: all private services can be
accessed only from the server itself (*i.e.* client IP should match the server's
public IP), which is done by an SSH proxy. I use Firefox & [FoxyProxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/)
to setup which traffic to redirect through a SOCKS5 proxy (*i.e.* redirect all
requrests to `*.x.boramalper.org`).

To be able to use SOCKS proxy, make sure `AllowTcpForwarding yes` is in your
`/etc/ssh/sshd_config`.

Currently, my private services include [Pi-hole](https://pi-hole.net/) for
DNS-based ad & tracker blocking and [GoAccess](https://goaccess.io/) for
log-based web analytics; my public services include my web-sites only. As you
might realise, the separation is not always clear either: while the web
dashboard of Pi-hole is private, its port 53 had to be open to ouside world.

# 4 - Docker Volumes vs Bind Mounts
Sadly [Docker Volumes](https://docs.docker.com/storage/volumes/) are marketed as
"bind mounts on stereoids" which is simply wrong, they are *different*.

As a rule of thumb:

- if you would like to treat data storage as "black box", use volumes
- if you need to "interact" with the filesystem, use bind mounts
  - By interact I mean interacting *with the files directly*, such as adding
    or removing *files*, backing up *files*, reading *files* etc.

Before deciding which one to use, you should analyse your use-case based on the
rule above. For instance, [Seafile](https://seafile.com/) consists of a MySQL
database and a data directory. Since you wouldn't want to interact with
MySQL data on a filesystem level ([even for backups](https://mariadb.com/kb/en/library/mysqldump/)),
it makes sense to use volumes. Whereas if you read [Seafile's documentation](https://manual.seafile.com/maintain/backup_recovery.html#backing-up-seafile-library-data)
they recommend good ol' `rsync` for backing up the data directory so it'll make
your life much easier to use bind mounts for that.

Lastly, for bind mount directories, it's a good idea to spend some time on
directory structure before it gets too messy.

# 5 - Take Notes
Note taking is the first step of automation. During your journey you'll
encounter lots of problems to solve, oddities to comprehend, glitches that you
won't be able to explain and so on. It's crucial to document all these, to
develop your own skills, to save time in future, and if you feel generous, to
help others too.

It's perhaps not as easy to write an [Ansible](https://ansible.com/) playbook
for every small task you've done, but you can surely type down a few words and
copy-paste some commands to make sure they won't be lost in the histories of
your browser and command shell.

# 6 - Monitoring
The irony with health monitoring is that when your server is in trouble, it
might not be healthy enough to let you know so it's best to delegate that to
someone else; even if they are not necessarily more reliable than you, the
chances are, you both won't fail at the same time.

The basic idea is that you will "ping" a HTTP endpoint at certain times
(indicated by either a regular interval or a [cron expression](https://crontab.guru/#0_3_*_*_6)).
If you miss a ping or two, the service triggers and reports the failure to you.

[Healthchecks.io](https://healthchecks.io/) is [open-source](https://github.com/healthchecks/healthchecks)
and offers the best free-plan (20 checks vs 1) but if you are willing to spend
around $20/month, [Cronitor](https://cronitor.io/) is *far better*, as it can
check *proactively*: Not only wait for your ping, but it can ping your
HTTP services itself and decide if they are healthy using assertions
(*e.g.* response body contains `xxx`), with limited support for TCP & UDP too
(based on mean/max response time).

You can integrate this into your existing [Docker healthchecks](https://docs.docker.com/compose/compose-file/compose-file-v2/#healthcheck).
Assume you have a healthcheck `./is-healthy.sh` that returs 0 if the container
is healthy and 1 if unhealthy.

```yaml
services:
  my_service:
    # ...

    healthcheck:
      test: ["CMD", "./is-healthy.sh"]
      interval: 1m
      timeout: 10s
      retries: 3
      start_period: 40s
```

Unfortunately neither wget nor curl is installed on Debian/Ubuntu base images,
but Alpine comes with BusyBox's implementation of wget which you can use.

```yaml
services:
  my_service:
    # ...

    healthcheck:
      # If curl is installed:
      test: ["CMD-SHELL", "./is-healthy.sh && curl -fsS --retry 3 https://hc-ping.com/e7cab1cb-c655-443a-934a-079c76ac82e0 > /dev/null"]

      # Or for Alpine-based systems:
      # (Unlike the curl solution above, this doesn't support retries.)
      test: ["CMD-SHELL", "./is-healthy.sh && wget --spider -q -T 5 https://hc-ping.com/e7cab1cb-c655-443a-934a-079c76ac82e0"]

      interval: 1m
      timeout: 10s
      retries: 3
      start_period: 40s
```

# Final Remarks
I love self-hosting; to make an analogy, it's like building your own world in
Minecraft but in real-life and it's also actually useful. I wanted to share
what I jot down along the process with others in the hopes of discussing these
points and to help & encourage beginners too.

> I've noticed that people who have never worked with steel have trouble seeing
> this—that the motorcycle is primarily a mental phenomenon. They associate
> metal with given shapes—pipes, rods, girders, tools, parts—all of them fixed
> and inviolable, and think of it as primarily physical. But a person who does
> machining or foundry work or forge work or welding sees "steel" as having no
> shape at all. Steel can be any shape you want if you are skilled enough, and
> any shape but the one you want if you are not.
>
> [...]
>
> That's all the motorcycle is, a system of concepts worked out in steel.
> There's no part in it, no shape in it, that is not out of someone's mind.

― Zen and the Art of Motorcycle Maintenance (1974)
