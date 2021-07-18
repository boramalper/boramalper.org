---
id: 260
title: Sihirli SysRq Tuşu
date: 2015-08-29T23:33:49+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=260
permalink: /sihirli-sysrq-tusu/
categories:
  - Yazılım Mühendisliği
tags:
  - SysRq
---
Sihirli SysRq; kullanıcının, sistemin durumuna bağlı olamksızın, sistem seviyesinde(ing: low-level) işlemler gerçekleştirmek için Linux çekirdeğine gönderdiği tuş kombinasyonlarıdır.

<!--more-->

Tuş kombinasyonları Alt + SysRq (yoksa, PrintScrn) + <RADİKAL> şeklindedir. Radikal kısım klavye türüne göre (QWERTY, Dvorak, AZERTY, Colemak) değişir. Eğer Gnome/KDE gibi masaüstlerinde kombinasyonun başına Ctrl eklemeniz gerekebilir. Alt tuşu yerine dilerseniz AltGr&#8217;yi de kullanabilirsiniz. Bazı dizüstülerde SysRq tuşunu kullanmak için öncelikle Fn&#8217;e basmak gerebilir. Böyle durumlarda: (Ctrl +) Alt + Fn + SysRq + (burada Fn&#8217;i bırakın) + <RADİKAL> kombinasyonunu uygulamanız gerekir.

[table id=2 /]

Kitlenmiş bir sistemi güvenli bir şekilde yeniden başlatmak için QWERTY veya AZERTY klavyelerde REISUB (hatırlamak için: **R**eboot **E**ven **I**f **S**ystem **U**tterly **B**roken) kombinasyonlarını uygulayabilirsiniz. Eğer komutların çıktılarını göremiyorsanız, komutlar arası birkaç saniye beklemek iyi bir şeydir.

Bu özellik hem kernel derlenirken, hem de bir sysctl prametresi tarafından kontrol edilir. Bazı dağıtımlarda bu özellik güvenlik amacıyla varsayılan olarak kapalıdır. Etkinleştirmek için

<pre class="brush: bash; title: ; notranslate" title="">echo 1 &gt; /proc/sys/kernel/sysrq
</pre>

komutunu kullanabilirsiniz.

<pre class="brush: bash; title: ; notranslate" title="">echo RADİKAL &gt; /proc/sysrq-trigger
</pre>

komutu ile yukarıdaki key kombinasyonlarını komut satırından (veya programlarınızdan) da çalıştırabilirsiniz.

Unutulmamalıdır ki ciddi donanımsal veya yazılımsal sorunlarda ve panic durumlarında bu kombinasyonlar işe yaramayabilir.

* * *

Elimden geldiğince <a href="http://en.wikipedia.org/wiki/Magic_SysRq_key" target="_blank" rel="noopener noreferrer">Wikipedia</a>&#8216;dan çevirmeye çalıştım; ancak güdük İngilizcem ile pek de harika olduğu söylenemez. Yine de konu hakkında yeterince bilgilendirici veya en azından ilgi uyandırıcı olduğunu umuyorum.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a>  
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.