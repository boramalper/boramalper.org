---
id: 113
title: Object System (an Object Oriented Approach to the File Systems)
date: 2015-02-16T21:35:47+02:00
author: Bora M. Alper
layout: post
guid: http://blog.boramalper.org/?p=113
permalink: /object-system/
categories:
  - Free Computing
tags:
  - file system
  - metadata
  - object oriented
  - object system
  - oop
  - programming
---
As computers become smaller, and data get bigger, we got more and more storage space and constantly producing more data to fill them: You can take [10 photos per second using an iPhone 6](https://www.apple.com/iphone-6/cameras/). You probably won&#8217;t do that people are taking dozens of selfies from different angles and at different times just in a concert, vacation, etc.

Problem is, when you have thousands of files in your drive, it becomes impossible to manage them. First of all, you need to **_locate_** the file before using it. Think about it, why you need to _locate_ a file to access it? You know what are you looking for, but you don&#8217;t know **_where_** it is. When did you (last time) walk through a categorized index of web sites to find the web site you are looking for? This is basically what you do, when you try to find a file in a (hopefully, categorized) hierarchy of directories in your file system.

<!--more-->

Categorizing files in a file system is also hard. That&#8217;s because there are often more than one way of categorizing them due to their different attributes and you must choose one of them. For example, how would you create a structure for your movies? You can simply use `[Movie Name]/[Files...]` or choose something more sophisticated like `[Theme]/[Director]/[Year]/[Movie Name]/[Files...]`. Let&#8217;s assume that you want to list all of <a href="http://www.imdb.com/name/nm0149196/" target="_blank" rel="noopener noreferrer">Ceylan</a>&#8216;s movies: If you chose the first option, then there is nothing you can do but searching IMDb; but if you chose second one, then you can try your chance by visiting every `[Director]` under every `[Theme]`.

People get sick and tired of this situation and they wrote programs: _Different_ programs for _different_ kinds of files from _different_ authors using _different_ file formats to store metadata, which leads us to an inconsistent user experience.

I don&#8217;t even want to mention that these files, as separate entities, are often related at some level. For example the WWI movies you have, have something common in your WWI books: They are all about WWI. People wrote programs for that too, for instance <a href="https://darkfeline.github.io/dantalian/" target="_blank" rel="noopener noreferrer">Dantalian</a>, <a href="https://code.google.com/p/dhtfs/" target="_blank" rel="noopener noreferrer">dhtfs</a>, <a href="http://www.tagsistant.net/" target="_blank" rel="noopener noreferrer">Tagsistant</a>, and <a href="http://tmsu.org/" target="_blank" rel="noopener noreferrer">TMSU</a>. These programs allow us to _tag_ files, some of them even support tags in an attribute-value way (`year=2010`). These tools are exploiting symbolic links, sometimes with a SQLite database, and providing a virtual file system using FUSE so that you can make queries by chaining tags like `ls ~/MountPoint/tags/live/Daft-Punk/music` and start listening <a href="https://en.wikipedia.org/wiki/Alive_2007" target="_blank" rel="noopener noreferrer">Alive</a>.

There are some reasons why I don&#8217;t like this approach:

  * Tags are good for building a relationship between different kind of files like movies and books; but why use them for the same kind of files? For example, let&#8217;s assume that we want to tag our photos using their EXIF data which contains <a href="https://en.wikipedia.org/wiki/Exchangeable_image_file_format#Example" target="_blank" rel="noopener noreferrer">nearly everything</a> (from the manufacturer of your camera to exposure time), and now all of these tags are populating your tag cloud. 
      * Tags are very primitive for that kind of extensive usage: They are simple strings and the more advanced ones are just keys-values which consist of strings too. But files have different attributes(_i.e._ metadata) which is not a string, but Boolean, date, integer, enum, and maybe more advanced types like binary data(_e.g._ cryptographic signature) and array of these types(_e.g._ a book which has more than one author).
  * They lack of proper use tools: Using coreutils on a virtual file system with tags as directories turn a simple search into a complicated query. 
      * Developing a framework for managing files are nothing but just a beginning. We should not assume users (from _end-_, to _super-_) to interact directly with our framework to manage their files. This would contradict with our goal that we set at the beginning: A better user (and developer) experience.

# Object System

Object System is a metadata-aware data store where data are instances of semantically inherited classes. What? Let me clarify:

  * <a href="http://c2.com/cgi/wiki?AlanKaysDefinitionOfObjectOriented" target="_blank" rel="noopener noreferrer">Everything is an object</a>.
  * Objects are instances of classes, where attributes and methods of an object are defined. 
      * Attributes are just strings where values may have different kind of types like string, date, boolean, integer, enum, floating point&#8230; and **pointers**! 
          * <a href="https://www.youtube.com/watch?v=MzGnX-MbYE4" target="_blank" rel="noopener noreferrer">Pointers are pointers</a>. I mean, pointers to objects in an Object System.
      * Methods are procedures that can alter its object. I don&#8217;t exactly know how to handle them, but using an embeddable scripting language (<a href="https://en.wikipedia.org/wiki/Squirrel_(programming_language)" target="_blank" rel="noopener noreferrer">Squirrel</a>?) with a special library seems likely. I&#8217;m open for suggestions.
  * Objects have their own values for attributes that are defined in their classes.
  * Classes are inherited in such a way that inheritance defines a semantic relationship between _base_ and _child_ classes. This relationship means that every instance of the _child_ can be treated as an instance of the _base_ class. (For instance, every _photo_ is also an _image_)

As some of your neurons are fired now, there are still some missing parts:

  * The `Object` is the root class, fountain of objects.
  * `Container` and `File` are base classes, which inherited from `Object`. As you can guess, they are used for containers and files respectively. 
      * Containers are object stores, you may think them like an archive file. They may contain _any_ kind of object. Unlike containers in OO languages, they are not arrays nor stacks, but you can access their objects using the `query()` method.
      * Files are, well, files.

Containers are especially useful for things like e-mails (with attachments) and web pages. Both of them consist of different files of different kinds, but we need them altogether. There is no way of accessing objects other than querying, but you need to get your e-mail&#8217;s body or index of the web page in a container: This is possible thanks to pointers. Containers may have self-pointers, which is pointers to inner objects. That way, we can access specific objects in containers without breaking consistency.

Also, objects in containers are not exposed to Object System, that means they will not appear in searches but their containing container may appear (Surely you can write your own routines to search recursively).

Like the root directory in UNIX systems, there is also root container which contains everything. It can be passed by operating system to programs or (because since that is not going to happen in a very near future&#8230;) you can use something like `objectsystem.getRoot()`.

## Permissions Management

Permissions are a bit hard to grasp at first but you will get it if you could come so far. This part consists of technical bits than concept so you can [skip](#beyond) it if you want.

As you will see soon, permission management is very powerful yet too complex. I think we can simplify it or at least define some <a href="http://www.windowsecurity.com/articles-tutorials/authentication_and_encryption/Understanding-Windows-NTFS-Permissions.html" target="_blank" rel="noopener noreferrer">standard permissions</a>.

Remember, _explicit > implicit_ and then _deny > allow_: For instance, an _explicit allow_ has higher precedence than an _implicit deny_.

### Permissions

There are 4 basic permissions that is applicable to different thing:

  1. **Read  
** Being able to see (notice) something, so it&#8217;s (generally) a must for other permissions. It also means reading (getting) data and/or metadata.
  2. **Append**  
    Being able to append to something, _without touching to existing data._
  3. **Write**  
    Being able to **change** an existing data, metadata or structure. _It also implies deleting._
  4. **Execute**  
    Being able to execute data.

#### Class

<a href="https://en.wikipedia.org/wiki/Existentialism#Concepts" target="_blank" rel="noopener noreferrer">Essence precedes existence</a>: You cannot access instances, if you cannot access their class.

##### Permissions:

  1. **Read  
** Means that user can read (also, see) the contents of a class and access its instances. _Required for following permission(s)._
  2. **Append  
** Means that a user can **append** new attributes and methods to a class **without modifying** existing ones.
  3. **Write  
** Means that a user can **modify** contents (attributes and methods) of a class.
  4. **Execute**  
    Means that user can create instances of a class.

##### Includes:

  * **Attributes**
  * **Methods**

#### Attribute

You can also specifically allow or deny access to an attribute in a class.

##### Permissions

  1. **Read  
** Means that user can read (notice) an attribute. _Required for following permission(s)._
  2. **Write**  
    Means that user can modify an attributes name or type. Since changing type of an attribute will also change the values of the class&#8217; instances&#8217;, user must have rights to do so.

#### Method

You can also specifically allow or deny access to a method in a class.

##### Permissions

  1. **Read  
** Means that user can read (notice) a method. _Required for following permission(s)._
  2. **Write**  
    Means that user can modify a method.

#### Objects (Instances)

##### Permissions

  1. **Read  
** Means that user can see an object and read data & metadata (_values_) of itself. To access a value, being able to access it&#8217;s attribute is a must.
  2. **Append  
** Means that user can append to objects data and metadata. Appending to metadata only available in list types.
  3. **Write**  
    Means that user can write (modify) to objects data and metadata.
  4. **Execute**  
    Means that user can execute an object.

##### Includes:

  * Values
  * behaviors

#### Value

You can also specifically allow or deny access to a value of an object. First of all, user must be able to _read_ an attribute to get its correspondent value.

##### Permissions

  1. **Read**  
    Means that user can get the value of an object for an attribute. If user don&#8217;t has this permission yet permitted to read its correspondent attribute, then implementation may return a null or completely omit this field.
  2. **Append**  
    Means that user can append elements to the value _which is a list_.
  3. **Write**  
    Means that user can change the value of an object.

#### Behavior

You can also specifically allow or deny access to a behavior of an object. I am aware that this naming is confusing but I don&#8217;t know how to say so: While you can _read_ a method of a class, being able to _execute_ a behavior of an object is different thing. I wanted to separate these things so that we can handle them accordingly.

##### Permissions

  1. **Execute**  
    Means that user can execute a behavior of an object.

## <a id="beyond"></a>Beyond

Providing a good framework for developers and their applications is good but not sufficient without them. Object System is capable to maintaining relationships between different objects but utilizing them is job of applications. Because that, developing initial applications is critical for building a user base.

One step further to a future where information at our fingertips or maybe even in front of our retinas.

Thanks for reading so far (1700 words)! Main reason of this article is getting feedback before start coding, so any comment will be very appreciated. :)