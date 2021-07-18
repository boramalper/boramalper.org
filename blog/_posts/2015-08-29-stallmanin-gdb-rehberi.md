---
id: 257
title: "Stallman'ın gdb Rehberi"
date: 2015-08-29T23:17:53+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=257
permalink: /stallman-in-gdb-rehberi/
categories:
  - Yazılım Mühendisliği
tags:
  - C
  - Cpp
  - debugging
  - gdb
  - GNU
  - hata ayıklama
  - programming
  - Stallman
---
Eski blogun yedeğine bakarken denk geldiğim bu eski çeviriyi, işinize yarayacağını umarak, burada da paylaşmak istedim. Çeviri biraz sorunlu ve de eskik yerler var!

## Sıkça Sorulan Sorular

### Debugging nedir?

Debugging (hata ayıklama), programlardaki hataları ayıklama işlemine verilen addır. Diğer bir deyişle; hatayı bulana kadar kodu baştan sona incelemektir.

### Debugger nedir?

Debugger (hata ayıklayıcı), başka programları çalıştıran bir programdır. Debugger, programcının; çalıştırdığı program üzerinde oynamasına izin verir. Programı istediğiniz yerde durdurabilir, hafızadaki değişkenleri takip edip &ndash; değiştirebilir ve fonksiyonları çağırabilirsiniz.

### Neden debugger kullanayım ki? printf yeterli değil mi?

Bir debugger kullanmak, -genelde- programınızdaki hataları bulmanın en etkili yoludur. Programınızın debugging için detaylı çıktı vermesi yanlış değildir (hatta bazen tek/en kolay yoldur). Ancak _Segmentation Fault_ ve sonsuz döngü gibi hatalarda debugger hayat kurtarır.

* * *

## gdb&#8217;ı Nasıl Kullanırım?

### Debugging için nasıl derlerim?

Debugging için programınızın özel olarak derlenmesi gerekmektedir. Bu özel derleme sırasında programa; _Debugging Symbols_ denilen, debugger&#8217;ın anlayabileceği türden özel bilgiler eklenir. Bu bilgiler olmadan debugger düzgün çalışamaz.

Programı derlerken gcc&#8217;a **-g** argümanını ekleyin: `gcc -g program.c -o programname`

**Not:** Eğer birden çok dosyadan oluşan bir programınız varsa, her bir dosya **-g** argümanı ile derlenmeli ve bağlarken de yine **-g** argümanı kullanılmalıdır.

### Debugger&#8217;ı nasıl çalıştırırım?

`gdb programadı`yazarak gdb&#8217;ı çalıştırabilirsiniz. Programınızı çalıştırmaya başlamak için de `run arg1 "arg2" ...` komutunu verin.

### Çalışan bir programı nasıl baştan başlatabilirim?

kill komutu ile programı sonlandırabilir; ve run komutu ile tekrar başlatabiliriniz.

### gdb&#8217;dan nasıl çıkabilirim?

**quit** komutu ile çıkabilirsiniz.

### gdb komutları için nereden yardım alabilirim?

**help** komutu ile yardım alabilirsiniz: `help gdb_command`

* * *

## Programımın Çalışmasını Nasıl Takip Ederim?

gdb&#8217;ı programlarınız için bir **[interpreter](http://en.wikipedia.org/wiki/Interpreter_%28computing%29)**([yorumlayıcı](http://tr.wikipedia.org/wiki/Yorumlay%C4%B1c%C4%B1)) gibi düşünebilirsiniz. Programınıza sinyal göndererek istediğiniz zaman durdurabilirsiniz. Normalde bu Ctrl+C kombinasyonuyla &ndash;**SIGINT** sinayli göndererek- yapılır. Bu programınızı sonlandıracaktır; ancak gdb bu sinyali yakalayarak programı durdurur. Aynı zamanda **breakpoint**(duraklama noktası)&lsquo;leri kullanarak programınızı belirli bir satırda veya fonksiyon çağırısında durdurabilirsiniz. Programınız durduğunda, kaynak kodun &#8216;neresinde&rsquo; olduğunu inceleyebilirsiniz. **Scope**&lsquo;daki değişkenlere bakabileceğiniz gibi hafızadaki ve **register**&#8216;daki değişkenleri de görebilirsiniz. Aynı zamanda değişkenleri ve hafızayı değiştirerek programınıza olan etkilerini inceleyebilirsiniz.

### Yürütmeyi nasıl durdururum?

Ctrl+C kombinasyonu ile programınıza **SIGINT** sinyali göndererek:

    (gdb) run
    Starting Program: /home/ug/ryansc/a.out`

    Program received signal SIGINT, Interrupt.
    0x80483b4 in main(argc=1, argv=0xbffffda4) at loop.c:5
    5 while(1){
    ...
    (gdb)


### Yürütmeye nasıl devam ederim?

`continue` komutu ile yürütmeye devam edebilirsiniz.

### Yürütmeye satır-satır devam edebilir miyim?

Evet. Öncelikle programın durdurun. Ardından `next`veya `step` komutlarıyla programınızın içerisinde satır-satır ilerleyebilirsiniz.

    5   while(1){
    (gdb) next
    7   }
    (gdb)


**Not:** `next` ve `step` komutları farklıdır. Fonksiyon çağrısının olduğu bir satırda `next` fonksiyonun &lsquo;üzerinden&rsquo; geçecekken; `step` fonksiyonun içine girer.

**next**:

    (gdb)
    11     fun1();
    (gdb) next
    12 }


**step**:

    (gdb)
    11     fun1();
    (gdb) step;
    fun1 () at loop.c:5
    5    return 0;
    (gdb)
    </p>

### Değişkenleri nasıl incelerim?

`print degisken_adi` komutu ile.

**Not:** `print` komutu her zaman `$### = (değer)` formatında bir çıktı verir. `$###` kısmı şu ana kadar inclediğiniz değişkenlerin sayısını tutan bir sayaçtır.

### Değişkenleri nasıl değiştiririm?

`set x = y` komutu ile değişkenlerin değerlerini değiştirebilirsiniz.

**Not:** gdb&#8217;ın yeni sürümelerinde `set var x = y` şeklinde kullanmanız gerekebilir.

### Nasıl fonksiyon çağırabilirim?

`call fonksiyon(arg1, arg2)` komutu ile programınıza bağlanan(linking) herhangi bir fonksiyonu çağırabilirsiniz.

### Bir fonksiyondan nasıl çıkabilirim?

`finish` komutu ile programınızı, içinde bulunduğunuz fonksiyon sonlanana kadar çalıştırabilirsiniz. Fonksiyonun çalışması bittikten sonra program durur ve fonksiyondan döndürülen değeri(**return value**) yazdırır.

    (gdb) finish
    Run till exit from #0  fun1 () at test.c:5
    main (argc=1, argv=0xbffffaf4) at test.c:17
    17        return 0;
    Value returned is $1 = 1


* * *

## &ldquo;Breakpoint&#8221;leri Nasıl Kullanırım?

**Brekpoint**&lsquo;ler **debugger**&#8216;a programı belirtilen satırdı durdurmasını söyler. Aynı zamanda belirli fonksiyon çağrılarında durdurulması için de kullanılabilir.

### Bir satıra nasıl breakpoint koyabilirim?

Eğer programınız tek bir kaynak dosyadan oluşuyorsa `break satir_no` komutu ile koyabilirsiniz.

Eğer programınız birden çok kaynak dosyadan oluşuyorsa `break dosya:satir_no` komutunu kullanmanız gerekir.

    (gdb) break 19
    Breakpoint 1 at 0x80483f8: file main.c, line 19
    (gdb) break test.c:19
    Breakpoint 2 at 0x80483ff: file test.c, line 19


### Bir fonksiyona nasıl breakpoint koyabilirim?

`break fonksiyon_adi` komutu ile.

### Nasıl geçici breakpoint koyabilirim?

`break` komutu yerine `tbreak` komutunu kullanarak geçici **breakpoint**&lsquo;ler koyabilirsiniz. Geçici bir **breakpoint**, programı bir kez durdurduktan sonra kaldırılacaktır.

### Breakpoint&#8217;lerin listesini nasıl görebilirim?

`info breakpoints` komutu ile:

    Num Type           Disp Enb Address    What
    2   breakpoint     keep y   0x080483c3 in func2 at test.c:5
    3   breakpoint     keep y   0x080483da in func1 at test.c:10


### Breakpoint&#8217;leri nasıl kaldırırım?

`disable` komutu ile kaldırabilirsiniz. Örnek kullanımı aşağıda gösterilmiştir.

    (gdb) info breakpoints
    Num Type           Disp Enb Address    What
    2   breakpoint     keep y   0x080483c3 in func2 at test.c:5
    3   breakpoint     keep y   0x080483da in func1 at test.c:10
    (gdb) disable 2
    (gdb) info breakpoints
    Num Type           Disp Enb Address    What
    2   breakpoint     keep n   0x080483c3 in func2 at test.c:5
    3   breakpoint     keep y   0x080483da in func1 at test.c:10


_`Enb` sütununa dikkat edin._

### Breakpoint&#8217;i nasıl (pas) geçerim?

Bir **breakpoint**&lsquo;i belirtilen kez pas geçmek için `ignore breakpoint_no kac_kez` komutu kullanılır:

    (gdb) ignore 2 5
    Will ignore next 5 crossings of breakpoint 2.


* * *

## &ldquo;Watchpoint&#8221;leri Nasıl Kullanırım?

**Watchpoint**&lsquo;ler, **breakpoint**&#8216;lere benzerdirler; ancak **breakpoint**&#8216;lerden farklı olarak satırlarla veya fonksiyonlarla değil, değişkenlerle ilgilenirler. Bu değişkenler okunduğunda veya değişkenlere yazıldığında programı durdururlar.

Bu bölümde aşağıdaki örnek program kullanılacaktır:

```c
#include <stdio.h>

int main(int argc, char **argv)
{
  int x = 30;
  int y = 10;

  x = y;

  return 0;
}
```


### Nasıl bir &ldquo;write Watchpoint&rdquo; ayarlarım?

Eğer bir değişkenin değeri değiştiğinde -yani ona yazıldığında- programınızın durmasını istiyorsanız `watch` komutunu kullanmanız gerekir:

    (gdb) watch x
    Hardware watchpoint 4: x
    (gdb) next
    Hardware watchpoint 4: x

    Old value = 30
    New value = 10
    main () at deneme.c:11
    11        return 0;
    (gdb)


### Nasıl bir &ldquo;read Watchpoint&rdquo; ayarlarım?

`rwatch` komutu ile. Kullanımı `watch` komutu ile aynıdır.

### Nasıl bir &ldquo;read/write Watchpoint&rdquo; ayarlarım?

`awatch` komutu ile. Kullanımı `watch` komutu ile aynıdır.

### Watchpoint&#8217;leri nasıl kaldırırım?

**Breakpoint**&lsquo;lerdeki gibi kaldırabilirsiniz. `info breakpoints` komutu aynı zamanda **Watchpoint**&#8216;leri de gösterir.

* * *

## Dipnot

Yazıda pek çok İngilizce terimin geçtiğinin farkındayım ancak anlaşılmaz bir çeviri de olmasını istemedim. Eğer İngilizce terimlerin, Türkçe karşılıklarını bildirirseniz yazıyı düzenleyebilirim.

[Kaynaktaki 3. bölüm](http://www.unknownroad.com/rtfm/gdbtut/gdbstack.html)&lsquo;e tam olarak hakim olmadığım için çevirmek istemedim. Bu bölümü de çevirip, -mümkünse markdown formatında- yollarsanız yazıya ekleyebilirim.

Okuduğunuz için teşekkürler. :)

* * *

## Kaynak

<http://www.unknownroad.com/rtfm/gdbtut/gdbtoc.html>