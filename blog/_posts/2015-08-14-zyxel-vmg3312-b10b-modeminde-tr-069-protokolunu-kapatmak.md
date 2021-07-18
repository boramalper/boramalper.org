---
id: 232
title: ZyXEL VMG3312-B10B Modeminde TR-069 Protokolünü Kapatmak
date: 2015-08-14T16:09:06+02:00
author: Bora M. Alper
layout: post
guid: /assets/?p=232
permalink: /zyxel-vmg3312-b10b-modeminde-tr-069-protokolunu-kapatmak/
categories:
  - Özgür Bilişim
tags:
  - TR-069
  - tr069
  - TTNET
  - VMG3312-B10A
  - VMG3312-B10B
  - ZyXEL
---
İnternet servis sağlayıcılarının (kısaltma: İSS, örnek: TTNET) modeminizi uzaktan yönetebilmesi için tasarlanmış olan <a href="https://tr.wikipedia.org/wiki/TR-069" target="_blank" rel="noopener noreferrer">TR-069 protokolü</a>nün ZyXEL&#8217;in VMG3312-B10B modemi için nasıl kapatılacağını anlatacağım.

## Neden?

Nasıl yapılacağına başlamadan önce, bu protokolü neden kapatmak isteyebileceğinize değinelim. Bu protokol, İSS&#8217;lerin modeme uzaktan erişim sağlayarak ilk kurulumdaki ayarların otomatikman yapılması ve gelecekteki gerekli durumlarda modeme uzaktan müdahale edilmesine olanak sağlar. Diğer bir deyişle, iyi amaçlarla kullanılması umulan bir <a href="https://tr.wikipedia.org/wiki/Arka_kap%C4%B1" target="_blank" rel="noopener noreferrer">backdoor</a>&#8216;dur. Elbette İSS&#8217;iniz modeminize yalnızca kendisi erişebilecek şekilde gerekli güvenlik önlemlerini alır, ancak <a href="https://tr.wikipedia.org/wiki/Quis_custodiet_ipsos_custodes%3F" target="_blank" rel="noopener noreferrer">bizi internet servis sağlayıcımızdan kim koruyacaktır?</a>

Şüphelerimizi haklı çıkarırcasına, TTNET&#8217;in verdiği mevzubahis modemde bu protokolü kapatmamız engellenmiştir. Ben de, **nedeni her ne olursa olsun, sahip olduğumuz cihaz üzerinde istediğimiz değişiklikleri yapabilmemiz gerektiğine inanıyorum** (bakınız: _<a href="https://en.wikipedia.org/wiki/IOS_jailbreaking#Legal_status" target="_blank" rel="noopener noreferrer">Legal status of jailbreaking</a>_).
<!--more-->

## Nasıl?

Bu yazı ZyXEL&#8217;in VMG3312-B10B modemi için hazırlanmıştır; ancak VMG3312-B10**A** için de büyük ihtimalle aynıdır. Diğer ZyXEL modemleri hakkında hiçbir fikrim yok; ancak modeminiz ne olursa olsun tecrübelerinizi yorum göndererek bana ulaştırabilir, yazının gelişmesine ve başkalarının da özgürleşmesine katkıda bulunabilirsiniz.

**<a href="//www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Google Chrome</a> gereklidir.**

### 1. Aşama

  * Modeminizin web arayüzüne bağlanın: http://192.168.1.1/index.html (varsayılan)
  * En alttaki menülerden **Bakım** > **Yeniden başlat**&#8216;a tıklayın.

### 2. Aşama

* **Ctrl** + **Shift** + **I** (Iğdır&#8217;ın I&#8217;sı) veya **sağ-tık** > **Öğeyi Denetle (Inspect Element)**&#8216;ye tıklayın. Karşınıza aşağıdaki gibi bir görüntü gelecektir:[<img class="alignnone size-large wp-image-236" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-1-1024x576.png" alt="ZyXEL 1" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-1-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-1-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-1-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-1.png)\\


* Daha sonra **Ctrl** + **F** ile arama kutusunu açın.[<img class="alignnone size-large wp-image-237" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-2-1024x576.png" alt="ZyXEL 2" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-2-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-2-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-2-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-2.png)\\

* Tırnak işaretleri olmadan, yandaki metni kopyalayın: `<iframe`

* Kopyaladığınız metni arama kutusuna yapıştırın. Sarı ile işaretlenmiş bir kod parçası göreceksiniz:[<img class="alignnone size-large wp-image-239" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-3-1024x576.png" alt="ZyXEL 3" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-3-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-3-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-3-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-3.png)\\

* Tırnak işaretleri olmadan, yandaki metni kopyalayın: `pages/tabFW/tabFW.html?tabJson=../maintenance/tr069Client/tab.json&&tabIndex=0`

* Şimdi, yukarıdaki resimde kırmızı kutu içerisine alınmış olan kod parçasına dikkatli bakın: `src="pages/tabFW/tabFW.html` diye devam eden kısmı bulun:[<img class="alignnone size-large wp-image-242" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-4-1024x576.png" alt="ZyXEL 4" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-4-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-4-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-4-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-4.png)\\

* Bulduğunuz kısımdaki, _tırnak içerisinde bulunan mavi renkli kısma_ **sağ-tık** > **Edit attribute**&#8216;u seçin. Böylelikle tırnak içindeki mavi renkli kısmı değiştireceğiz:[<img class="alignnone size-large wp-image-248" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-5-1024x576.png" alt="ZyXEL 5" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-5-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-5-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-5-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-5.png)\\

* Daha sonra kopyaladığınız metni, değiştireceğimiz kısma yapıştırın (**Ctrl** + **V**):[<img class="alignnone size-large wp-image-250" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-6-1024x576.png" alt="ZyXEL 6" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-6-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-6-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-6-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-6.png)\\

* Yapıştırdıktan sonra **enter**&#8216;a basın ve sayfanın yüklenmesini bekleyin. Eğer başardıysanız aşağıdaki ekranı göreceksiniz:[<img class="alignnone size-large wp-image-251" src="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-7-1024x576.png" alt="ZyXEL 7" width="625" height="352" srcset="{{site.baseurl}}/assets/wp-content/uploads/2015/08/ZyXEL-7-1024x576.png 1024w, /assets/wp-content/uploads/2015/08/ZyXEL-7-300x169.png 300w, /assets/wp-content/uploads/2015/08/ZyXEL-7-624x351.png 624w" sizes="(max-width: 625px) 100vw, 625px" />](/assets/wp-content/uploads/2015/08/ZyXEL-7.png)\\

* Daha sonra _Bilgi:_ satırındaki _Devre Dışı Bırak_&#8216;ı seçip, sağ alttaki _Uygula_ düğmesine tıklayın.\\

## Sonuç

**Tebrikler!** Artık modeminizde TR-069 protokolünü kapatmış bulunmaktasınız.
