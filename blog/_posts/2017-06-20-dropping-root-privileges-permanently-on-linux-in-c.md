---
id: 441
title: Dropping root Privileges Permanently on Linux in C
date: 2017-06-20T18:24:50+02:00
author: Bora M. Alper
layout: post
guid: http://blog.boramalper.org/?p=441
permalink: /dropping-root-privileges-permanently-on-linux-in-c/
categories:
  - Software Engineering
tags:
  - C
  - linux
  - programming
  - security
---
If you would like to drop `root` privileges **permanently** on Linux using C:

```c
#define _GNU_SOURCE  // for secure_getenv()


int drop_root_privileges(void) {  // returns 0 on success and -1 on failure
	gid_t gid;
	uid_t uid;

	// no need to "drop" the privileges that you don't have in the first place!
	if (getuid() != 0) {
		return 0;
	}

	// when your program is invoked with sudo, getuid() will return 0 and you
	// won't be able to drop your privileges
	if ((uid = getuid()) == 0) {
		const char *sudo_uid = secure_getenv("SUDO_UID");
		if (sudo_uid == NULL) {
			printf("environment variable `SUDO_UID` not found\n");
			return -1;
		}
		errno = 0;
		uid = (uid_t) strtoll(sudo_uid, NULL, 10);
		if (errno != 0) {
			perror("under-/over-flow in converting `SUDO_UID` to integer");
			return -1;
		}
	}

	// again, in case your program is invoked using sudo
	if ((gid = getgid()) == 0) {
		const char *sudo_gid = secure_getenv("SUDO_GID");
		if (sudo_gid == NULL) {
			printf("environment variable `SUDO_GID` not found\n");
			return -1;
		}
		errno = 0;
		gid = (gid_t) strtoll(sudo_gid, NULL, 10);
		if (errno != 0) {
			perror("under-/over-flow in converting `SUDO_GID` to integer");
			return -1;
		}
	}

	if (setgid(gid) != 0) {
		perror("setgid");
		return -1;
	}
	if (setuid(uid) != 0) {
		perror("setgid");
		return -1;
	}

	// change your directory to somewhere else, just in case if you are in a
	// root-owned one (e.g. /root)
	if (chdir("/") != 0) {
		perror("chdir");
		return -1;
	}

	// check if we successfully dropped the root privileges
	if (setuid(0) == 0 || seteuid(0) == 0) {
		printf("could not drop root privileges!\n");
		return -1;
	}

	return 0;
}
```

I hope this would save you some time so that you won&#8217;t spend an hour like me, trying to find a proper solution!

**The code is provided &#8220;as is&#8221;, without warranty of any kind, express or implied.**

## Sources

[c &#8211; Dropping root privileges &#8211; Stack Overflow](https://stackoverflow.com/questions/3357737/dropping-root-privileges)

`man sudo` ([Sudo Manual](https://www.sudo.ws/man/1.8.18/sudo.man.html#ENVIRONMENT))