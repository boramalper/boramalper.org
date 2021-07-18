---
id: 211
title: "Python'un Sihirli Metodları"
date: 2015-07-27T14:16:53+02:00
author: Bora M. Alper
layout: post
guid: https://blog.boramalper.org/?p=211
permalink: /python-un-sihirli-metodlari/
categories:
  - Yazılım Mühendisliği
tags:
  - çeviri
  - magic methods
  - python
  - rehber
  - sihirli metodlar
---
## Çeviriye Giriş

Merhaba,

Python'ın en önemli özelliklerinden biri olan _sihirli metodlar_ (ing: _magic methods_), ne yazık ki ne resmi belgelerde, ne de diğer kaynaklarda gereğince anlatılmamış. Konuyla ilgili kaynakları araştırdığım sırada karşıma çıkan Rafe Kettler'ın [yazısı](http://www.rafekettler.com/magicmethods.html), hem kapsamlı oluşu hem de akıcılığıyla oldukça işime yaradı. Sizlerin de işine yaracağını umarak, Türkçe'ye çevirmeye karar verdim.

Çeviri sırasında bazı eklemeler ve çıkarmalarda bulundum, bazı yerleri de düzenledim. Daha rahat oknabilmesi için bazı cümleleri çevirirken değiştirdim. Asıl olarak Python 2 için yazılmış olan metinin, Python 3'teki farklılıklarını da yazdım.

Türkçe terimlerin yanına İngilizce asıllarını da belirttim; ancak ne yazık ki bazı İnglizce kelimelerin Türkçe karşılığı tam olarak yok (benim cahilliğimse düzeltmekten çekinmeyiniz) varsa da bize İngilizcesinden bile daha yabancı! Bu yüzden bazı kelimelerin İngilizcesini kullanmak zorunda kaldım. Ne demişler, _galat-ı meşhur, lügat-ı fasihten evlâdır_.

İşinize yaraması dileğiyle, Mert Bora Alper

## Giriş

Bu rehber, birkaç ay süren blog yazılarının toplamıdır. Konu, **sihirli metodlar**.

Sihirli metodlar nedir? Onlar, nesne-yönelimli Python'un her şeyidir. Sınıflarınıza &#8220;sihir&#8221; eklemek için tanımlayabileceğiniz özel metodlardır. Her zaman çift alt-tire ile sarılırlar (örn: `__init__` veya `__lt__`). Ne yazık ki, gerektiği kadar iyi bir şekilde belgelendirilmemişler; Python'daki tüm sihirli metodlar, Python belgelerinin aynı bölümünde yer alıyor, ancak tasniften ve örnekten yoksun bir halde.

Python belgelerindeki bir kusur olarak gördüğüm şeyi düzeltmek üzere, Python'un sihirli metodları hakkında örneklerle bezenmiş, sade bir İngilizce kullanarak yazmaya başladım. Haftalık blog yazılarından oluşan seri, şimdi bitirmiş olarak bu rehberi oluşturuyor.

Beğenmenizi umuyorum. Onu bir giriş rehberi, bir hafıza tazeleyici, veya bir referans olarak kullanabilirsiniz.

## Oluşturma ve Hazırlama

En basit sihirli metod olan `__init__`i herkes bilir. Bir nesnenin hazırlanırkenki davranışını belirleyen metoddur o. Ancak, ben `x = BirSınıf()` yazdığım zaman, ilk çağırılan metod `__init__` değildir. `__new__` adındaki metod ile, nesne _oluşturulduktan_ (yani yaratıldıktan) sonra, yine aynı argümanlar ile `__init__`i çağırılır. Nesnenin ömrünü tamamladığında ise `__del__` metodu devreye girer. Şimdi bu 3 sihirli metoda daha yakından bakalım:

`__new__(cls, [...)`

:   Bir nesnenin örneklenmesi (ing: _instantiation_) sırasında çağırılan ilk metod `__new__`dir. İlk argümanı örneklenen sınıf (`cls`), daha sonrakiler ise örnekleme sırasında gönderilen argümanlardır. `__new__`in kullanımı oldukça nadirdir; ancak özellikle `string` veya `tuple` gibi değişmeyen (ing: _immutable_) sınıfların alt-sınıflaması (ing: _subclassing_) sırasında kullanılır. Kullanışlı bir metod olmadığından detaylara girmek istemiyorum, ancak isteyenler için [Python belgelerinde](http://www.python.org/download/releases/2.2/descrintro/#__new__) etraflıca anlatılmış.

`__init__(self, [...)`

:   Bir nesnenin oluşturulduktan sonra hazırlanması (ing: _initialization_) için çağırılan metod. İlk argümanı, `__new__` tarafından döndürülen nesnedir (`self`). Diğer argümanlar ise yine örnekleme sırasında gönderilen argümanlardır. Örneğin `x = BirSınıf(4, "şey")` dediğimizde `__init__`, `4` ve `"şey"`i argüman olarak alır. Python'daki sınıf tanımlamalarının hemen hepsinde `__init__` kullanılır.

`__del__(self)`

:   Eğer `__new__` ve `__init__` nesneleri inşa ediyorsa, `__del__` metodu da yıkılmasını sağlar. Zannedilenin aksine, `del nesne` ifadesine karşılık **gelmez** (yani `del nesne` != `nesne.__del__()`); ancak nesne _çöpe_ dönüştüğü zaman (ing: _garbage collected_) çağırılır. Kaldırılma sırasında fazladan temizlemeye gerek duyan (dosya ve soketlerin kapatılması gibi) nesneler için oldukça işe yarar. Ancak **dikkatli olun**, çünkü Python yorumlayıcısı sonlandığı sırada hafızada bulunan nesneler için `__del__` metodunun çağırılacağı garanti edilmez. Aslında, bu yüzden, `__del__` asla kullanılmamalıdır, çünkü ne zaman çağırılacağı belli değildir; dikkatli kullanın!

Toparlamak gerekirse, `__init__` ve `__del__`in bir arada olduğu (saçma) bir örnek:

```python
from os.path import join

class DosyaNesnesi:
    """Dosya nesnelerini sararak, silinme sırasında dosyanın
    kapatılmasını sağlar. Yalnızca örnek içindir,
    gerçek hayatta kullanmayınız!"""

    def __init__(self, konum="~", ad="örnek.txt"):
        # `konum` da bulnunan `ad` adındaki dosyayı okuma&yazma
        # için aç
        self.file = open(join(filepath, filename), "r+")

    def __del__(self):
        self.file.close()
        del self.file
```

## Opearatörler ve Sınıflar

Python'un sihirli metodlarını kullanmanın en büyük artılarından biri, nesnelerin dahili (ing: _built-in_) türler gibi davranmasını sağlamaktır. Böylece, en temel işlemleri yaparken; çirkin, sezgiden uzak, ve standart dışı yöntemleri kullanmak zorunda kalmazsınız. Bazı dillerde, aşağıdaki gibi bir şey kullanılır:

```python
if örnek.eşittir(başka_örnek):
    # bir şey yap
```

Bunu tabii ki Python'da da yapabilirsiniz, ancak bu karışıklığa ve sözcük fazlalığına neden olur. Farklı kütüphaneler, aynı işlemler için farklı isimler kullanabilir, bu da bir programcı için gereksiz ezber demektir ki, biz bunu istemeyiz. Sihirli metodların bize verdiği güçle, bir metod tanımlayabilir (bu durumda `__eq__`) ve neyi _kastettiğimizi_ söyleyebiliriz.

```python
if ornek == baska_ornek:
    # bir şey yap
```

Bu, sihirli metodların gücünün sadece bir kısmı. Sihirli metodları kullanarak operatörlerin ne anlama geldiğini, onlarla neyi kastettiğimizi belirtebiliriz. Böylece kendi oluşturduğumuz sınıfları, tıpkı dahili türler gibi kullanabiliriz.

### Karşılaştırma sihirli metodları

Tuhaf metod çağrıları yerine Python operatörlerini kullanarak nesneleri karşılaştırabilmemiz için tasarlanmış bol miktardaki sihirli metodu kullanabiliriz. Aynı zamanda, yine aynı metodları kullanarak Python'un varsayılan davranışlarını değiştirebiliriz. Aşağıda bu metodların bir listesi ve ne yaptığı yer alıyor:

`__cmp__(self, diğer)`

:   `__cmp__` en temel karşılaştırma sihirli metodudur. Kendisi tüm karşılaştırma operatörlerinin(< , ==, != gibi) davranışını sağlayabilir, ancak bu her zaman istediğiniz şekilde olmayabilir (örneğin, eğer bir örneğin diğerine _eşit olmasının koşulu başka, ve diğerinden_ _büyük_ olmasının koşulu başka ise). `__cmp__`; eğer `self < diğer` ise negatif bir sayı, `self == diğer` ise sıfır, `self > diğer` ise pozitif bir sayı döndürmelidir. Genellikle, hepsini tek seferde tanımlamaktansa, gerek duyduğunuz her karşılaştırmayı tek tek tanımlamanız önerilir; ancak eğer karşılaştırma kriterleriniz tüm operatörler için aynı ise, `__cmp__` metodu sizi gereksiz kod tekrarından kuratabilir. **Python 3 ile kaldırılmıştır.**

`__eq__(self, diğer)`

:   Eşitlik operatörünün (`==`) davranışını belirler.

`__ne__(self, diğer)`

:   Eşitsizlik operatörünün (`!=`) davranışını belirler.

`__lt__(self, diğer)`

:   Küçüktür operatörünün (`<`) davranışını belirler.

`__gt__(self, diğer)`

:   Büyüktür operatörünün (`>`) davranışını belirler.

`__le__(self, diğer)`

:   Küçük-eşit operatörünün (`<=`) davranışını belirler.

`__ge__(self, diğer)`

:   Büyük-eşit operatörünün (`>=`) davranışını belirler.

Örnek olarak, kelimeleri modelleyen bir sınıf düşünelim. Kelimeleri alfabetik sıraya göre karşılaştırmak isteyebileceğimiz gibi, ki Python'da olan budur, onları bir başka kritere göre de karşılaştırabiliriz, uzunluk veya hece sayısı gibi. Bu örnekte, uzunluklarına göre karşılaştıracağız:

```python
class Kelime(str):
    """Kelime uzunluğuna göre karşılaştırmaları tanımlayan bir
    sınıf."""

def __new__(cls, kelime):
    # __new__'i kullanmak *zorunda* olduğumuza dikkat et. Böyle
    # olmasının nedeni, str'in değişmez (immutable) bir tür
    # olmasıdır. Bu da, nesne oluştuktan sonra (__new__
    # metodunun nesneyi oluşturduğunu hatırlayınız) onu
    # değiştirememek demektir.
    if " " in kelime:
        print("Boşluk karakteri var! Boşluk karakterine kadar "
              "olan kısım kullanılacak.")
        kelime = kelime[:kelime.index(" ")]
        return str.__new__(cls, kelime)

def __gt__(self, diğer):
    return len(self) > len(diğer)
def __lt__(self, diğer):
    return len(self) < len(diğer)
def __ge__(self, diğer):
    return len(self) >= len(diğer)
def __le__(self, diğer):
    return len(self) <= len(diğer)
```

Şimdi iki `Kelime` oluşturarak (`Kelime("hast")`, `Kelime("höst")`) onları uzunluklarına göre karşılaştırabiliriz. `__eq__` ve `__ne__` metodlarını tanımlamadığımıza dikkat edin, çünkü bu bazı tuhaf durumlara yol açabilirdi (örn: `Sozcuk("hast") == Sozcuk("höst")` ifadesi `True` olurdu). Bu iki metodu tanımlamadığımız için, miras aldığımız `str` sınıfının `__eq__` ve `__ne__` metodlarını kullanacak.

`__cmp__` metodu haricinde, `functools` modülündeki `@total_ordering` dekoratörünü de kullanarak, tüm karşılaştırma ifadelerini tanımlanıza gerek kalmadan, yalnızca `__eq__`, ve küçük/_-eşit_ veya büyük/_-eşit_ operatörlerini tanımlayarak aynı sonuca ulaşabilirsiniz. Bu yöntem bizi gereksiz tekrarlardan kurtarsa da performans açısından sıkıntılıdır. Son olarak, Python 3'te `__cmp__` metodunun artık yer almadığını unutmayın!

### Sayısal sihirli metodlar

Tıpkı karşılaştırma operatörlerinde olduğu gibi, sayısal operatörlerin davranışlarını da sihirli metodlar araclığıyla tanımlayabiliriz. Kemerlerinizi bağlayın millet, bunlardan çok fazla var&#8230; Tasnif etmek adına, sayısal sihirli metodları 5 kategoriye ayırdık: tekli (ing: _unary_) operatörler, normal aritmetik operatörleri, ters aritmetik operatörleri (bundan daha sonra bahsedeceğiz), birleşik atama ve tür dönüşümleri.

#### Tekli operatörler ve fonksiyonlar

Yalnızca bir tane argüman alan operatörler ve fonksiyonlara (örn: negatifleme, mutlak değer, vs.) _tekli_ denir.

`__pos__(self)`

:   Tekli pozitif operatörünün davranışını belirler. (örn: `+nesne`)

`__neg__(self)`

:   Tekli negatif operatörünün davranışını belirler. (örn: `-nesne`)

`__abs__(self)`

:   Dahili `abs()` fonksiyonunun davranışını belirler.

`__invert__(self)`

:   Ters çevirme (ing: _invertion_) (nam-ı diğer _değil_ (ing: _not_)) operatörünün (`~`) davranışını belirler. (örn: `~nesne`)

`__round__(self, n)`

:   Dahili `round()` fonksiyonunun davranışını belirler. `n`, virgülden sonraki yuvarlanacak basamak sayısıdır.

`__floor__(self)`

:   `math.floor()` fonksiyonunun davranışını belirler; diğer bir deyişle, en yakın tam sayıya aşağı-yuvarlar.

`__ceil__(self)`

:   `math.ceil()` fonksiyonunun davranışını belirler; diğer bir deyişle, en yakın tam sayıya yukarı-yuvarlar.

`__trunc__(self)`

:   `math.trunc()` fonksiyonunun davranışını belirler; diğer bir deyişle, virgülden sonraki kısmı budar.

#### Normal aritmetik operatörleri

Şimdi tipik iki argümanlı operatörleri (ve bikaç fonksiyonu) işleyeceğiz: `+`, `-`, `*` ve benzeri. Pek çoğu izaha gerek duymayan türden.

`__add__(self, diğer)`

:   Toplamayı belirler. (örn: `nesne + diğer`)

`__sub__(self, diğer)`

:   Çıkarmayı belirler. (örn: `nesne - diğer`)

`__mul__(self, diğer)`

:   Çarpmayı belirler. (örn: `nesne * diğer`)

`__floordiv__(self, diğer)`

:   `//` operatörü kullanılarak, tam sayı bölme işlemini belirler. (örn: `nesne // diğer`)

`__div__(self, diğer)`

:   Python 2'de `/` operatörü ile bölme işlemini belirler. (örn: `nesne / diğer`)

`__truediv__(self, diğer)`

:   Python 2'de, `from __future__ import division` ifadesi geçerliyken, Python 3'te ise varsayılan olarak, `/` operatörü kullanıldığında `__truediv__` çağırılır. (örn: `nesne / diğer`)

`__mod__(self, diğer)`

:   Mod alma operatörünü (`%`) belirler. (örn: `nesne % diğer`)

`__divmod__(self, diğer)`

:   Dahili `divmod()` fonksiyonunu belirler. (örn: `divmod(nesne, diğer)`)

`__pow__(self, üs)`

:   Üs alma operatörünün (`**`) davranışını belirler. (örn: `nesne ** üs`)

`__lshift__(self, diğer)`

:   Sola bit kaydırma operatörünün (`<<`) davranışını belirler. (örn: `nesne << diğer`)

`__rshift__(self, diğer)`

:   Sağa bit kaydırma operatörünün (`>>`) davranışını belirler. (örn: `nesne >> diğer`)

`__and__(self, diğer)`

:   Bitsel _ve_ (`&`) operatörünün davranışını belirler. (örn: `nesne & diğer`)

`__or__(self, diğer)`

:   Bitsel _veya_ (`|`) operatörünün davranışını belirler. (örn: `nesne | diğer`)

`__xor__(self, diğer)`

:   Bitsel _ayrıcalı veya_ operatörünün (`^`) davranışını belirler. (örn: `nesne ^ diğer`)

#### Ters aritmetik operatörleri

Bu başlık için daha sonra bahsedeceğiz demiştik değil mi? Korkmanıza gerek yok, sandığınızdan çok çok daha basit bir şey! Örnek üzerinden gidelim:

```python
nesne_a * nesne_b         # bu...
nesne_a.__mul__(nesne_b)  # ... aslında bu demektir
```

Diyelim ki `nesne_a`nın `__mul__` diye bir metodu olmasın; o halde çarpma işleminin `nesne_b.__mul__(bir_nesne)` şeklinde yazılabileceğini düşünebilirsiniz; ancak bu iki dönüşüm her zaman aynı sonucu vermeyebilir (matris çarpımı, örneğin). Ancak `nesne_b`, _ters çapma_ metoduna sahip olsaydı, hem nesnelerin sırasını korumuş (`nesne_a * nesne_b` != `nesne_b * nesne_a`) olurduk, hem de sorunu çözebilirdik. İşte bu nedenden ötürü, _ters aritmetik operatörleri_ dediğimiz bir dizi sihirli metod Python'da yer almaktadır.

Ters artimetik operatörlerinin çağırılması için _normal artimetik operatörlerinin_ tanımlanmamış olması veya `NotImplemented` döndürmesi gerekir. Başka bir deyişle, verdiğimiz örnek üzerinden gidecek olursak, `nesne_b.__rmul__(nesne_a)` çağrısı için ya `nesne_a`nın `__add__` metodundan yoksun olması, ya da `nesne_a.__add__(nesne_b)` ifadesinin `NotImplemented` döndürmesi gerekir.

Ters aritmetik metodları, normal aritmetik metodlarının başına &#8216;r' harfinin eklenmesi ile elde edilir; `__add__` ⇒ `__radd__`, `__rshift__` ⇒ `__rrshift__` gibi.

#### Birleşik atama

Python'da birleşik atama (`+=`, `/=` gibi) operatörleri için de tanımlanmış olan pek çok shirili metod vardır:

```python
x = 5
x += 1  # mantıken: x = x + 1
        # gerçekte: x = x.__iadd__(1)
```

Birleşik atama metodları, normal aritmetik metodlarının başına &#8216;i' harfinin eklenmesi ile elde edilir; `+=` için `__add__`&#8216;den `__iadd__`, `>>=` için `__rshift__`&#8216;den `__irshift__` gibi. Normal aritmetik metodlarından olan ancak bir operatör değil, dahili metod olan `__divmod__` metodunun, birleşik atamada karşılığı yoktur.

#### Tür dönüşümleri

Python, dahili tür dönüşüm fonskiyonları (`float()`, `str()` gibi) için de tanımlanmış olan çeşitli sihirli metodlara sahiptir:

`__int__(self)`

:   Dahili `int()` fonksiyonunun davranışını belirler. Döndürülen değer, `int` sınıfının bir örneği olmak zorundadır. (örn: `int(nesne)`)

`__long__(self)`

:   `long` türüne dönüşümü tanımlar. **Python 3 ile kaldırılmıştır.** (örn: `long(nesne)`)

`__float__(self)`

:   Dahili `float()` fonksiyonunun davranışını belirler. Döndürülen değer, `float` sınıfının bir örneği olmak zorundadır. (örn: `float(nesne)`)

`__complex__(self)`

:   Dahili `complex()` fonksiyonunun davranışını belirler. Döndürülen değer, `complex` sınıfının bir örneği olmak zorundadır. **Python 2'de desteklenmez.** (örn: `complex(nesne)`)

`__oct__(self)`

:   Dahili `oct()` fonksiyonunun davranışını belirler. **Herhangi bir değer döndürebilir!** **Python 3'te desteklenmez.** (örn: `oct(nesne)`)

`__hex__(self)`

:   Dahili `hex()` fonksiyonunun davranışını belirler. Döndürülen değer, `str` sınıfının bir örneği olmak zorundadır. **Python 3'te desteklenmez.** (örn: `hex(nesne)`)

`__index__(self)`

:   Dilim ifadesi (ing: _slice expression_) içerisinde kullanılan bir nesnenin, `int` türüne dönüşümünü belirler. Örnek:

```python
nesne = BirSınıf()
l = [0, 1, 2, 3, 4]
l[1:nesne] # ⇒ l[1:nesne.__index__()]
```

`__coerce__(self, diğer)`

:   Dahili `coerce()` fonksiyonunun davranışını belirler. Farklı türdeki sayıları aynı türe çevirmek için kullanılır. Eğer tür dönüşümü mümkün değilse `None`; mümkün ise, aynı türe dönüştürülmüş, sırasıyla `self` ve `diğer`i içeren bir demet (`tuple`) döndürür. Tür dönüşümü sırasında veri kaybı yaşanmamasına dikkat edilmelidir (`float` türünü `int`e dönüştürmek yerine tam tersinin yapılması gibi).

```python
sayı = Sayı(42)
sonuç = coerce(sayı, 3.14159265)
# ⇒ sayı.__coerce__(3.14159265)
print(sonuç) # (42.0, 3.14159265)

sonuç2 = coerce(3.14159265, sayı)
# ⇒ tuple(reversed(sayı.__coerce__(3.14159265)))
print(sonuç2) # (3.14159265, 42.0)
```

**Python 3 ile kaldırılmıştır.**

## Sınıfların Gösterimi

Genellikle sınıflarınızın bir _string_ gösteriminin olması oldukça yararlıdır. Python'da, sınıfların gösterimiyle ilgili dahili fonksiyonların nasıl davranacağını belirleyen metodlar mevcuttur.

`__str__(self)`

:   Dahili `str()` fonksiyonunun davranışunı belirler. (Bu metodu _Tür dönüşümleri_ başlığında da ele alabilirdik.) (örn: `str(nesne)`)

`__repr__(self)`

:   Dahili `repr()` fonksiyonunun davranışını belirler. `str()` ile `repr()` arasındaki en büyük fark, iki fonksiyonun hedef kitlesidir. `repr()` fonksiyonunun çıktısı (çoğunlukla) makine tarafından okunabilir (ing: _machine-readable_) (ki hatta geçerli bir Python kodu dahi olabilir bu); ancak `str()` çıktısının insanlar tarafından okunması hedeflenmiştir. (örn: `repr(nesne)`)

`__unicode__(self)`

:   `__str__` fonksiyonu gibi bunu da _Tür dönüşümleri_ başlığında ele alabilirdik. Kendisi, dahili `unicode()` fonksiyonunun davranışını belirler. `__str__()` ile aynı hedefi taşısa da, Python 2'deki `str`&#8211;`unicode` türleri ararasındaki farktan doğmuş olup, **Python 3 ile kaldırılmıştır**. (örn: `unicode(nesne)`)

`__bytes__(self)`

:   Dahili `bytes()` fonksiyonunun davranışını belirler. Python 2'deki dahili `str` türünün Python 3'teki karşılığıdır. **Python 3 ile eklenmiştir.**

`__format__(self, formatstr)`

:   Sınıfınızın örneği, [yeni usül string biçimlendirme](http://pyformat.info/)de (`.format()`) kullanıldığındaki davranışı belirler. Örneğin, `"Merhaba, {:bicim}!".format(nesne)` ifadesi `nesne.__format__("bicim")` şeklindeki bir çağrıya neden olacak, döndürülen sonuç da `{:bicim}` kısmının yerine geçecektir.

`__hash__(self)`

:   Dahili `hash()` fonksiyonunun davranışını belirler. Bir tam sayı (`int`) döndürmek zorundadır; döndürülen sonuç, sözlüklerde (`dict`) hızlıca anahtar karşılaştırılması yapmak için kullanılır. Bu da genelde `__eq__` metodunun da tanımlanmasını gerektirir. Unutmayın ki, `a == b` demek `hash(a) == hash(b)` ifadesinin doğru olmasını gerektirir. **Python, varsayılan olarak tanımlar.**

`__nonzero__(self)`

:   Dahili `bool()` fonskiyonunun davranışını belirler. `True` veya `False` döndürmelidir. Bunu nasıl belirleyeceğiniz size kalmış. **Python 3'te ismi `__bool__` olarak değiştirilmiştir.** (örn: `bool(nesne)`)

`__dir__(self)`

:   Dahili `dir()` fonksiyonunun davranışını belirler. Bu metod, nesnenin sahip olduğu niteliklerin (ing: _attributes_) listesini döndürür. Python, varsayılan olarak tanımladığı için bunu tekrardan tanımlamak gereksiz olabilir, ancak (bir sonraki bölümde göreceğiniz)`__getattr__` ya da `__getattribute__` metodlarından birini tanımlamışsanız veya nitelikleri dinamik olarak başka bir yolla oluşturuyorsanız gerekli olabilir. (örn: `dir(nesne)`)

`__sizeof__(self)`

:   `sys.getsizeof()` fonksiyonunun davranışını belirler. Nesnenizin kaç byte boyutunda olduğunu döndürmelidir. Daha çok C ile yazılmış Python sınıfları için kullanılır; ancak farkında olmanız iyi olabilir. (örn: `sys.getsizeof(nesne)`)

* * *

Rehberimizini sıkıcı kısımlarını bitirdik sayılır. Şimdi temel sihirli metodları bitirdiğimize göre, daha gelişmiş olanlara geçebiliriz.

## Niteliklere Erişimi Denetlemek

Python'a başka dillerden geçmiş pek çok kişi, Python sınıflarının sarmalamayı (ing: _encapsulation_) gerçekten desteklememesinden yakınır; yani, özel (ing: _private_) niteliklerin (ing: _attribute_) ve onlara erişmek için açık (ing: _public_) erişim metodlarının (ing: _getters and setters_) tanımlanamayışından. Doğrudan bu kadar uzak olunamazdı! Python sarmalamanın büyük kısmını, fazladan erişim metodları ile değil, &#8220;sihir&#8221; ile gerçekleştirmektedir. Bakınız:

`__getattr__(self, nitelik)`

:   Kullanıcı (henüz veya asla) varolmayan bir niteliğe erişmeye çalıştığındaki davranışı belirler. Bu, sık karşılaşılan yazım hatalarını yakalamak ve düzeltmek, kullanılmasına karşı çıkılmış (ing: _deprecated_) nitelikler hakkında uyarı vermek (ancak isterseniz uyarıdan sonra işleme devam edebilirsiniz), veya `AttributeError` hatasını farklı şekillerde işlemek için kullanabilirsiniz. Yalnızca var olmayan nitelikler için çağırıldığından, gerçek bir sarmalama çözümü değildir.

`__setattr__(self, nitelik, değer)`

:   `__getattr__`ın aksine, `__setattr__` gerçek bir sarmalama çözümüdür. Nitelik var olsun veya olmasın, bir atama işleminin (`nesne.nitelik = değer` ⇒ `nesne.__setattr__(nitelik, değer)`) davranışını belirler, ki bu da nitelikler için özel kurallar belirleyebilmeniz anlamına gelir. Ancak listenin sonunda göstereceğimiz üzere, `__setattr__`ı kullanırken dikkatli olmalısınız.

`__delattr__(self, nitelik)`

:   `__setattr__` ile tıpatıp aynıdır, ancak bu metod niteliklerin silinmesi sırasında çağırılır. `__setattr__`da olduğu gibi bunda da önlemler alınmazsa (`__delattr__` metodunun içinde `del self.name` çağrısı yapmak gibi örneğin) sonsuz özyineleme içine girebilirsiniz.

`__getattribute__(self, nitelik)`

:   Bütün bu anlattıklarımızdan sonra, `__getattribute__`, arkadaşları `__setattr__` ve `__delattr__` ile birbirlerini tamamlıyor; ancak kullanmanızı önermiyorum; çünkü var olsun veya olmasın, ne zaman bir niteliğe erişilmek istense bu metod çağrılır. `__getattribute__` yalnızca yeni-biçim sınıflarla (ing: _new-style classes_) kullanılabiliyor (Python 2'de yeni-biçim sınıf oluşturmak için `object` sınıfını miras almanız gerekir, Python 3'te tüm sınıflar yeni-biçimdir). Suç ortakları (`__setattr__` ve `__delattr__`) gibi sonsuz özyineleme sorunlarından muzdariptir; bunu aşmak için, üst-sınıfınızın (ing: _base class_) `__getattrbiute__` metodunu çağırabilirsiniz (şimdi neden yeni-biçim sınıflarla çalıştığını anladınız&#8230;). Aynı çözüm `__setattr__` ve `__delattr__` için de geçerlidir.

Nitelik erişim metodlarını kullanırken hataya düşmek çok kolaydır. Şu örneğe bakınız:

```python
def __setattr__(self, nitelik, değer):
    exec("self.{} = değer".format(nitelik))
    # her nitelik ataması sırasında, __setattr__ çağırıldığından,
    # bu ifade sonsuz özyineleme döngüsüne girecektir. Çünkü
    # aslında bu ifade, self.__setattr__("nitelik", değer)
    # ifadesinden başka bir şey değildir! Metod sürekli kendini
    # çağırdığından, en sonunda stack dolacak ve Python hata
    # verecektir.


def __setattr__(self, name, value):
    self.__dict__[name] = value
    # burada olan ise sınıfın sözlük elemanını (__getattribute__
    #  ile) alıp daha sonra (ilerde göreceğimiz __setitem__ ile)
    # *sözlük ataması* yapmaktır
```

Tekrar belirtelim, Python'un sihirli metodları inanılmaz derece güçlüdür, ve büyük güç, büyük sorumluluk getirir. Sihirli metodları nasıl kullanmanız gerektiğini bilirseniz ancak hatasız kod yazabilirsiniz.

Yani, niteliklere özelleştirilmiş erişim hakkında ne öğrendik? Basitçe kullanabileceğiniz bir şey olmadığını gördük. Aslında abartılı derecede güçlü ve sezgi-dışılar. Ancak var olmalarının önemli bir nedeni var: Python _kötü_ şeyleri imkansız kılmak istemiyor, yalnızca zorlaştırmak istiyor. Özgürlük harikulade bir şey, bu yüzden istediğinizi yapabilmelisiniz. Aşağıda hazır bir örnek üzerinde nitelik erişim metodlarını inceleyeceğiz (`super`&#8216;ı kullandığımıza dikkat edin, çünkü bütün sınıflar `__dict__` niteliğine sahip olmayabilir):

```python
# Python 3 için
class ErisimSayaci:
    """Bir değer ve bir erişim sayacı içeren bir sınıf. Değer her
    değiştiğinde sayaç artıyor."""

def __init__(self, deger):
    super().__setattr__("sayac", 0)
    super().__setattr__("deger", deger)

def __setattr__(self, nitelik, deger):
    if nitelik == "deger":
        super().__setattr__("sayac", self.sayac + 1)
    elif nitelik == "sayac":
        raise AttributeError("Sayacı değiştiremezsiniz!")
    else:
        super().__setattr__(nitelik, deger)
```

## Özel Diziler Yaratmak

Python sınıflarınızın dahili diziler (`dict`, `tuple`, `list`, `str` vb.) gibi davranması için birkaç yol var. Bunlar benim açık ara en sevdiğim metodlar, çünkü size inanılmaz bir kontrol yetisi veriyorlar ve bir dizi global fonksiyonun nesneleriniz üzerinde pürüzsüzce çalışmasını sağlıyorlar. Güzel şeylerden bahsetmeden evvel, gerekenlere kısaca bakalım.

### Gerekenler

Madem ki Python'da kendi dizilerinizi yaratmaktan bahsediyoruz, o halde _protokollerden_ de bahsetmek gerek. Protokoller, diğer dillerde _arayüz_ (ing: _interface_) dedikleri, tanımlamanız gereken metodlar kümesine çok benzer. Ancak, Python protokolleri tamamen gayri resmidir ve açık bir bildirimi yoktur. Daha çok bir rehber gibidirler.

Neden şimdi protokollerden bahsediyoruz ki? Çünkü Python'daki özel _container_ türleri bu protokollerden bazılarını gerektiriyor. Değişmez (ing: _immutable_) container'lar için bir protokol var: `__len__` ve `__getitem__` metodlarını tanımlamanız yeterli. Değişir (ing: _mutable_) container protokolü ise bir önceki metodlara ek olarak, `__setitem__` ve `__delitem__` metodlarını gerektiriyor. Son olarak, eğer nesnenizin yinelenebilir (ing: _iterable_) olmasını istiyorsanız, bir yineleyici (ing: _iterator_) döndüren `__iter__` metoduna sahip olması gerek. Döndürülen yineleyicinin _yineleyici protokolü_ne uygun olması gerekir ki, bu da (kendini döndüren) `__iter__` metodu ve `__nex__`tir (Python 2'de `next` olarak adlandırılır).

### Container'ların arkasındaki sihir

Daha fazla beklemeden, işte karşınızda container'ların kullandığı sihirli metodlar:

`__len__(self)`
:   Container'ın uzunluğunu (diğer bir deyişle içerdiği eleman sayısını) döndürür. Değişir ve değişmez container protokollerinin bir parçasıdır.

`__getitem__(self, anahtar)`

:   `self[key]` ifadesi kullanılarak bir elemana erişildiğindeki davranışı belirler. Bu da değişir ve değişmez container protokollerinin bir parçasıdır. Ayrıca bir hata olması durumunda uygun _exception_&#8216;ları yükseltmelidir (ing: _raise_): Eğer anahtarın (ing: _key_) türü yanlışsa `TypeError`, anahtara karşılık gelen bir değer yoksa `KeyError` yükseltilmelidir.

`__setitem__(self, anahtar, değer)`

:   `self[key] = value` ifadesi kullanılarak bir elemana atama yapıldığındaki davranışı belirler. Yalnızca, değişir container protokolünün bir parçasıdır. Yine gerekli durumlarda `KeyError` ve `TypeError` yükseltilmelidir.

`__delitem__(self, anahtar)`

:   `del self[key]` ifadesi kullanılarak bir eleman silindiğindeki davranışı belirler. Yalnızca, değişir container protokolünün bir parçasıdır. Yine gerekli durumlarda, gerekli exception'lar yükseltilmelidir.

`__iter__(self)`

:   Container için bir yineleyici döndürür. Bu dahili `iter()` fonksiyonunun davranışını belirlediği gibi, `for x in container` türündeki döngülerde de kullanılır. Yineleyiciler, kendi başına bir nesnedir, ve bu nesne, kendi kendini döndüren (`return self`) bir `__iter__` metoduna, ve bir sonraki elemanı döndüren `__next__` metoduna sahip olmalıdır.

`__reversed__(self)`

:   Dahili `reversed()` fonksiyonunun davranışını belirler. Dizinin ters çevrilmiş halini döndürmelidir. Bu metodu yalnızca eğer diziniz sıralıysa (`list` ya da `tuple` gibi) tanımlayın.

`__contains__(self, eleman)`

:   `in` ve `not in` sözcükleri ile yapılan aidiyet sorgularının davranışını belirler. Bunun neden dizi protokolünün bir parçası olmadığını sorabilirsiniz: bu metod tanımlı değil ise, Python yineleyiciyi yineleyerek tek tek bakar ve eğer bulursa `True` döndürür.

`__missing__(self, anahtar)`

:   `__missing__` metodu `dict` sınıfının alt-sınıfları tarafından kullanılır. Erişilen anahtarın sözlükte bulunmaması halinde bu metod çağırılır (örneğin bir `s` sözlüğü için eğer sözlükte `deneme` anahtarı yer almıyorsa, `d["deneme"]` ifadesi `d.__missing__("anahtar")` haline gelir).

## Tür İncelemeleri

**Çevirmenin notu:** Bu bölümün asıl başlığı _reflection_; ancak nasıl çevirmem gerektiğini kestiremediğimden (yine aynı kavramı karşılayan) _type introspection_&#8216;ın çevirisi olarak _Tür İnceleme_yi uygun gördüm.

**Çevirmenin notu:** Ne çevirdiğim yazıda ne de internette, bahsedilen `__instancecheck__` ve `__subclasscheck__` metodları hakkında _çalışan_ bir örnek bulamadım, ne yaptıysam çalıştıramadım. Bu yüzden, bu metodların nasıl çalıştığını anlayana dek bu bölümü boş bırakıyorum.

## Çağrılabilir nesneler

Bazılarınızın çoktan bilebileceği üzere, Python'da fonksiyonlar birinci sınıf nesnelerdir (yani bir fonksiyon, başka bir fonksiyon döndürebilir, fonksiyonları argüman olarak alabilir vs.). Bu inanılmaz güçlü bir özelliktir.

Python'daki özel bir sihirli metod, sınıflarınızın örneklerinin tıpkı fonksiyonlar gibi çağırılabilmesini sağlar, böylece onları &#8220;çağırabilirsiniz&#8221; (ing: _call_). Bu da Python'da programlamayı çok daha zevkli yapar!

`__call__(self, [argümanlar...])`
:   Bir sınıfın herhangi bir örneğinin fonksiyonlar gibi çağırılabilmesini sağlar. Temel olarak, bu `nesne(argüman)` çağrısının `nesne.__call__(argüman)` olması demektir.

`__call__` metodu, sıkça durum değiştiren örnekler için kullanışlı olabilir. Bir örneği &#8220;çağırmak&#8221; onun durumunu değiştirmenin sezgisel ve temiz bir yoludur. Düzlemdeki bir noktayı ele alalım:

```python
class Nokta:
    """Düzlemdeki bir noktayı belirten sınıf. Noktanın konumu,
    nokta "çağırılarak" güncellenebilir."""

    def __init__(self, x, y):
        self.x, self.y = x, y

    def __call__(self, x, y):
        self.x, self.y = x, y

n = Nokta(3, 4)
n(4, 3)
# ve güncellendi...
```

## Bağlam Yöneticileri

Python 2.5 ile yeni bir anahtar-kelime (ing: _keyword_) tanıtıldı: `with`. Bağlam yöneticileri fikren yeni değil (daha önce kütüphanenin bir parçasıydı), ancak [PEP 343](https://www.python.org/dev/peps/pep-0343/) ile birinci-sınıf dil ögesi durumuna erişti. Daha önce bunun gibi `with` ifadeleri görmüş olabilirsiniz:

```python
with open("metin.txt") as dosya:
    # dosya ile bir şeyler yap
```

Bağlam yöneticileri, hazırlama (ing: _initialization_ veya _setup_) ve temizleme (ing: _destruction_ veya _cleanup_) işlemlerini otomatik olarak hallederler. Bu işlemlerin nasıl yapılacağı iki sihirli metod ile belirlenebilir:

`__enter__(self)`

:   `with` bloğunun başında yapılması gerekenleri belirler. Döndürülen değer, `with` ifadesinin _hedefine_ (diğer bir deyişle, `as` sözcüğünden sonraki değişkene) atanır.

`__exit__(self, exception_türü, exception_değeri, traceback)`

:   `with` bloğundan çıkılırkenki davranışı belirler. _Exception_ları idare etmeli, yıkımı/temizliği gerçekleştirmeli (açık olan dosya ve soketleri kapatmak gibi), kısacası `with` bloğu sona erdiğinde yapılması gereken ne varsa yapmalıdır. Eğer blok başarıyla çalıştırılmışsa, `exception_türü`, `exception_değeri` ve `traceback` argümanları `None`dır. Değilse, _exception_ları kendiniz idare edebileceğiniz gibi (bu durumda `True` döndürürsünüz), `False` döndürerek topu kullanıcıya da atabilirsiniz (eğer bir hata oluşmadığı halde `False` döndürülürse, Python bunu sorun etmez!).

`__enter__` ve `__exit__` metodları, inşa ve yıkım süreçleri iyi belirlenmiş sınıflar için yararlı olabilir. Bu metodları, ayrıca genel bağlam yöneticileri oluşturmak için de kullanabilirsiniz. Örneğin:

```python
class Kapatıcı:
    """Bir *with* ifadesindeki nesneyi otomatik olarak *kapat*an
    bir bağlam yöneticisi"""

def __init__(self, nesne):
    self.nesne = nesne

def __enter__(self):
    return self.nesne  # *hedef*e (as'ten sonraki değişken)
                       # atanması için

def __exit__(self, exception_türü, exception_değeri, traceback):
if hasattr(self.nesne, "kapat"):
    self.nesne.kapat()
    print("Nesne başarıyla kapatıldı.")
else:
    print("Nesne 'kapat' metoduna sahip olmadığından "
          "kapatılamadı!")

if traceback:
    print("Ayrıca, with bloğu içerisinde bir exception oluştu; "
          "durumu idare etmeniz için size gönderiyoruz:")
      return False
else:
    return True  # hiçbir hata oluşmadı


class Dosya:  # sözde bu bir dosya olsun...
    # artık aklınıza ne gelirse...

    def kapat(self):
        # Aşağıdaki ifadeyi yorum olmaktan çıkarın ve ne olduğunu
        # gözlemleyin
        # raise Exception("Tüh! Kapatamadık...")

        print("Dosya başarıyla kapatıldı.")
```

Şimdi deneyelim!

```python
>>> from sihirlimetodlar import Kapatıcı, Dosya
>>> with Kapatici(Dosya()) as dosya:
...     pass  # dosya ile bir şeyler yap
Dosya başarılya kapatıldı.
Nesne başarıyla kapatıldı.
>>> with Kapatici(Dosya()) as dosya:
...     dosya.oku()  # henüz `oku` adlı bir metodumuz yok ki!
Dosya başarıyla kapatıldı.
Nesne başarıyla kapatıldı.
Ayrıca, with bloğu içerisinde bir exception oluştu; durumu idare
etmeniz için size gönderiyoruz
Traceback (most recent call last):
File "baglam.py", line 40, in &lt;module&gt;
  bir_dosya.oku()  # henüz oku adında bir metodumuz yok!
AttributeError: 'Dosya' object has no attribute 'oku'
>>> with Kapatici("str'lerin kapat metodu yoktur!") as katar:
...     pass
Nesne 'kapat' metoduna sahip olmadığından kapatılamadı!
```

Gördüğünüz gibi `Kapatıcı` adlı sarmalayıcımız (ing: _wrapper_) doğru ve yalnış bütün kullanımları başarıyla idare etti. İşte bu, bağlam yöneticilerinin ve sihirli metodların gücüdür. Ek olarak, Python standart kütüphanesi [contextlib](https://docs.python.org/3/library/contextlib.html) adında bir modüle sahiptir, ve içinde `Kapatici` ile aynı işleve sahip `contextlib.closing` ve daha pek çok bağlam yöneticisi bulunur!

## Soyut Temel Sınıflar

**Çevirmenin Notu:** Yazar <https://docs.python.org/2/library/abc.html> adresini yazmakla yetinmiş; ancak bu (hele ki Python belgelerinin de İngilizce olduğunu göz önüne alırsak) hiç içime sinmiyor. Şimdilik ben de aynısını yapmakla yetinmek zorundayım, ama en kısa sürede bir çevirisini ekleyeceğim (elbette siz de çevirebilirsiniz!).

## Desriptor Nesneleri Oluşturmak

Descriptor'lar, üzerinde okuma (ing: _get_), atama (ing: _set_), ve silme (ing: _delete_) işlemi uygulandığı zaman, başka nesneleri de değiştiren/etkileyen sınıftır. Descriptor'lar tek başına bulunmaz, bir sınıfın içinde yer alırlar. Descriptor'lar, nesne-yönelimli veritabanları ve niteliklerinin değerleri birbirine bağlı olan sınıflar için kullanışlı olabilir. Özellikle de farklı (ölçü) birimlerindeki nitelikler ve hesaplanması gerekenler (bir noktanın orijine uzaklığı gibi)&#8230;

Descriptor olabilmesi için, bir sınıfın `__get__`, `__set__` ve `__delete__` metodlarından en az birini tanımlamış olması gerekir.

`__get__(self, örnek, sahip)`

:   Descriptor'un değeri okunduğundaki davranışı belirler. `örnek`, descriptor'u içeren nesnedir. `sahip` de `örnek`in sınfı, diğer bir deyişle descriptor'u içeren sınıftır.

`__set__(self, örnek, değer)`

:   Descriptor'un değeri değiştindeki (atama) davranışı belirler. `değer`, descriptor'a atanmak istenen değerdir.

`__delete__(self, örnek)`

:   Descriptor'un değeri silindiğindeki davranışı belirler.

Şimdi sırada descriptor'ların kullanışlı bir uygulaması var: ölçüm birimi dönüşümleri.

```python
class Metre:
    """Metre için descriptor."""

    def __init__(self, değer=0.0):
        self.değer = float(değer)

    def __get__(self, örnek, sahip):
        return self.değer

    def __set__(self, örnek, değer):
        self.değer = float(değer)

class Foot:
    """Foot (ayak) için descriptor."""

    def __get__(self, örnek, sahip):
        return örnek.meter * 3.2808

    def __set__(self, örnek, değer):
        örnek.meter = float(değer) / 3.2808

class Mesafe:
    """Metre ve Foot cinsinden mesafe belirten sınıf."""
    metre = Metre()
    foot = Foot()
```

## Kopyalama

Bazen, özellile de değişir nesnelerle çalışırken, bir nesneyi kopyalayıp, kopyasını oluşturduğunuz nesneyi değiştirmemek isteyebilirsiniz. Python'un [`copy`](https://docs.python.org/3/library/copy.html)&#8216;si işte burada devreye giriyor. Ancak (şanslıyız ki), Python modülleri hissetmekten yoksun da, bir Linux-tabanlı robot devriminden korkmamıza gerek yok; ancak Python'a şeyleri nasıl verimli bir şekilde kopyalayacağını söylememiz gerek.

`__copy__(self)`
:   `copy.copy()` fonksiyonunun davranışını belirler. `copy.copy()`, nesnenizin _sığ kopyasını_ (ing: _shallow copy_) döndürür, yani döndürülen şey yepyeni bir nesne olmasına karşın, nitelikleri, kopyası alınan nesne ile aynı olabilir.

Diğer bir deyişle: Python'da niteliklerin bir nesneyi _tuttuğunu_ (veya _içerdiğini_) değil, ona _işaret ettiğini_ (ing: _point_ veya _reference_) unutmayınız. Bu da yeni bir nesne oluşturmamıza karşın, yeni nesnenin niteliklerinin, eski nesnenin niteliklerinin işaret ettiği ile aynı nesnelere işaret ettiği anlamına gelir. Tam olarak ifade etsem de, anlaşılabilirlikten uzak olduğunun farkındayım, ama deneye deneye çok rahat bir şekilde anlayabilirsiniz.

`__deepcopy__(self, memodict={})`
:   `copy.deepcopy()` fonksiyonunun davranışını belirler. `copy.deepcopy()`, nesnenizin _derin kopyasını_ (ing: _deep copy_) döndürür, yani döndürülen nesne yenidir, ve nitelikleri de yeni oluşturulmuş nesnelere işaret eder. `memodict` argümanı daha önce kopyalanmış nesneleri depolamak için kullanılır; bu süreci optimize ettiği gibi sonsuz öz-yinelemeleri de önlemek için gerekli olabilir. Bir niteliği ayrıca derin-kopyalamak istediğinizde, o nitelik üzerinde `copy.deepcopy()` fonksiyonunu, `memodict`i kullanarak çağırın.

Peki bu sihirli metodları nerede kullanacağız? Her zaman olduğu gibi, varsayılan davranışın yetmediği, daha detaylı kontrole gerek duyduğunuz her durumda kullanabilirsiniz. Örneğin, aynı türün bütün nesnelerin arasında paylaşılması gereken bir nesneyi, kopyalama sırasında, kopyalamak yerine oluşturulan kopyalara verebiliriz.

## Nesnelerinizi Pickle'lamak

**Çevirmenin Notu:** _Pickling_ (pi-kıl-ing) kelimesini nasıl çevireceğimi bilemediğimden aynen bıraktım. Kelime, nesnelerin (daha sonra tekrar nesneye dönüştürülebilecek bir şekilde) kodlanması demek. Örneğin bir _pipe_ ya da soket üzerinden göndermek, veyahut bir dosyaya kaydedip sonra tekrar okumak için nesnelerinizi _pickle_layabilirsiniz. _Serialization_ veya _marshaling_ olarak da bilinir.

Eğer Pythoncularla (ing: _Pythonistas_) vakit geçirdiyseniz, en azından pickling'in ne olduğunu duymuşsunuzdur. Pickling, Python veri yapılarının _serialization_ sürecine denir, ve bir nesneyi depolayıp, daha sonra geri almak istediğinizde inanılmaz kullanışlıdır. Aynı zamanda endişelerin ve karışıklığın temel kaynağıdır da.

Pickling o kadar önemlidir ki, kendi modlünün (`pickle`) yanında kendi _protokolü_ ve de sihirli metodları vardır. Ama önce, var olan türleri nasıl picklelayacağımıza bakalım: Eğer Pythoncularla (ing: _Pythonistas_) vakit geçirdiyseniz, en azından pickling'in ne olduğunu duymuşsunuzdur. Pickling, Python veri yapılarının _serialization_ sürecine denir, ve bir nesneyi depolayıp, daha sonra geri almak istediğinizde inanılmaz kullanışlıdır. Aynı zamanda endişelerin ve karışıklığın temel kaynağıdır da.

Pickling o kadar önemlidir ki, kendi modlünün (`pickle`) yanında kendi _protokolü_ ve de sihirli metodları vardır. Ama önce, var olan türleri nasıl picklelayacağımıza bakalım:

### Pickling: Okyanustan bir Yudum

Haydi pickling'in içine dalalım! Diyelim ki kaydedip daha sonra okumak istediğiniz bir sözlüğünüz (`dict`) var. Sözlüğün içeriğini bir dosyaya yazabilirsiniz; tabii doğru bir sentaks kullanmak şartıyla! Daha sonra (kullandığınız sentaksa da bağlı olarak) dahili `exec()` fonksiyonu ile veya kendi yazdığınız fonksiyonlarla okumanız gerek. Ancak tüm bu süreç en hafif tabirle _tehlikeli_: Depoladığınız veri önemliyse (_ki önemli ki depoluyoruz değil mi?.._), veri bozulabilir, programınızı çökertecek şekilde değiştirilebilir veya daha kötüsü zararlı kodları çalıştırabilir. Bu yüzden onun yerine biz pickle'layacağız:

**Çevirmenin Notu:** Yazarın sonda söylediği şeyi ben başta söyleyeyim: **pickle güvenli değildir!** Resmi Python belgelerinde de yazdığı üzere, **yalnızca güvendiğiniz kayanklardan _ve güvenli bir kanal aracılığıyla_ gelen pickle verisini okuyun!** Bir pickle verisi programınızı çökertebilir ve daha _fena_ şeyler de yapabilir. Bir üst paragrafta kast edilen şey, sizin yazacağınız herhangi bir çözüme _nazaran_ daha güvenli ve stabil olduğudur.

```python
import pickle

sozluk = {...}
pickle_dosyasi = open("sozluk.pkl", "wb")  # binary modda açtık!
pickle.dump(sozluk, pickle_dosyasi)        # sozluk'u pickle'la ve
                                           # pickle_dosyasina'a kaydet
pickle_dosyasi.close()
```

Şimdi, birkaç saat sonra, onu geri istiyoruz. Tek yapmamız gereken onu geri pickle'lamak:

```python
import pickle

pickle_dosyasi = open("sozluk.pkl", "rb")
sozluk = pickle.load(pickle_dosyasi)
pickle_dosyasi.close()

print(sozluk)
```

Ne oldu? Tam da beklediğiniz şey. Sanki en başından beri `sozluk` bizimleymiş gibi&#8230;

Pickle'ladığınız nesneler her Python sürümünde çalışmayabilir; bunun için `load`, `dump` ve kardeş fonksiyonlardaki `protocol` argümanına dikkat edin. Detaylı bilgiyi resmi belgelerde bulabilirsiniz.

### Kendi nesnelerinizi pickle'lamak

Pickle'lamak yalnızca dahili türler için değildir; pickle protokolünü uygulayan her sınıf pickle'lanabilir. Pickle protokolü, Python nesnelerinin nasıl davranacağını belirleyen 4 ihtiyari (_opsiyonel_) metoda sahiptir (C uzantıları için durum biraz farklıdır; ancak bu konumuzun dışında):

`__getinitargs__(self)`

:   Nesneniz geri pickle'landığında (ing: _unpickling_) `__init__` metodunun çağırılmasını istiyorsanız, `__init__` metoduna gönderilecek argümanların demetini (`tuple`) döndüren `__getinitargs__` metodunu tanımlayabilirsiniz. Bu metod yalnızca Python 2'de ve eski-biçim sınıflarda çalışır.

`__getnewargs__(self)`

:   Yeni-biçim sınıflarda, geri-pickle'lama sırasında `__new__` metoduna gönderilecek argümanların demetini (`tuple`) döndürmelidir.

`__getnewargs_ex__(self)`

:   Pickle `protocol` >= 4 olduğunda, eğer bu metod mevuctsa, `__getnewargs__` yerine bu çağırılır.

`__getstate__(self)`

:   Nesnenin `__dict__` niteliğini depolamak/pickle'lamak yerine, başka bir nesnenin de depolanmasını isteyebilirsiniz. Döndürülen değer, geri-pickle'lama sırasında `__setstate__`e gönderilecektir.

`__setstate__(self, state)`

:   Nesne geri-pickle'landığı zaman, eğer `__setstate__` tanımlı ise, nesnenin _durumu_ (ing: _state_) doğrudan nesnenin \`**dict**&#8216; niteliğine atanmak yerine, bu metoda gönderilir.

`__reduce__(self)`

:   Genişletme türleri tanımlandığında (yani Python'un C API'si kullanılarak oluşturulmuş türlerde), Python'a onları nasıl pickle'layacağını söylemeniz gerekir. `__reduce__()` metodu, pickle'lanan nesne ona sahipse çağırılır. Python'un arayacağı global bir isimi temsil eden bir karakter dizisi (`str`) veya bir demet (`tuple`) döndürmelidir. Demet, 2 ila 5 eleman içerebilir:

  * Nesneyi yeniden yaratmak için kullanılan çağırılabilir bir nesne.
  * Yukarıdaki çağırılabilir nesneye gönderilecek olan argümanların demeti.
  * `__setstate__` metoduna gönderilecek olan _durum_. (tercihen)
  * Nesneye iliştirilecek (ing: _append_) olan nesneleri tek tek döndüren bir yineleyici (ing: _iterator_). Yineleyicinin döndürdüğü nesneler, geri-pickle'lanan nesnenin `.append()` metoduyla tek tek veyahut `.extend()` metoduyla topluca iliştirilebilir; bu nedenle nesnenin her iki metodu da desteklemesi gerekir. Özellikle, liste (`list`) gibi nesnelerin geri-pickle'lanması sırasında bu önemlidir. (tercihen)
  * Nesneye eklenecek anahtar-değer (ing: _key-value_) çifterlerini tek tek döndüren bir yineleyici. Yineleyicinin döndürdüğü nesneler, `nesne[anahtar] = değer` şeklinde eklenecektir; bu yüzden geri-pickle'lanan nesnenin `__setitem__` metoduna sahip olması gerekir. Özellikle, sözlük (`dict`) gibi nesnelerin geri-pickle'lanması sırasında bu önemlidir. (tercihen)

`__reduce_ex__(self, protocol)`
:   Bu metodun tanımlı olduğu durumlarda, `__reduce__` metodu yerine bu çağırılır. `__reduce__` metodundan tek farkı, kullanılan protokol sürümünün numarasını `protokol` argümanı olarak almasıdır.

### Bir örnek

Örnek olarak `Tahta` adlı bir sınıf oluşturalım; öyle ki içerdiği bütün geçmiş değerlerin tarihiyle breaber kaydını tutsun. Pickle'lama sırasında, içerdiği güncel değer değil değişim-kütüğü kaydedilsin. Geri-pickle'lama sırasında da değişim-kütüğünü geri yükleyip, güncel değer kısmını boş bırakalım.

```python
import time

class Tahta:
    def __init__(self, değer):
        self.son_degistirme = time.asctime()
        self.değer = değer
        self.kutuk = {}

    def degistir(self, yeni_değer):
        # Değeri değiştir; mevcut değeri kaydet
        self.kutuk[self.son_degistirme] = self.değer
        self.son_degistirme = time.asctime()
        self.değer = yeni_değer

    def kutuk_yazdir(self):
        print("Tahta nesnesi için değişim kütüğü:")
            for a, d in self.kutuk.items():
                print("\t{}\t{}".format(a, d))

    def __getstate__(self):
        # Kasıtlı olarak self.value ve self.son_degistirme'yi
        # döndürmüyoruz çünkü geri-pickle'ladığımızda *temiz*
        # bir Tahta nesnesi istiyoruz
        return self.kutuk

    def __setstate__(self, state):
        # tarihçeyi koru
        self.kutuk = state

        # temiz bir Tahta nesnesi istiyoruz
        self.değer, self.son_degistirme = None, None
```

* * *

## Sonuç

Bu rehberin hedefi, Python veya nesne-yönelimli programlama deneyimi ne olursa olsun, okura bir şeyler kazandırmaktı. Eğer Python'a yeni başlıyorsanız, özellik-dolu, temiz, ve kolay kullanımlı sınıflar oluşturmanın temelini öğrendiniz demektir. Eğer Python'da orta seviyeyseniz, sizin ve kullanıcılarınız tarafından yazılacak kod miktarını azaltan, şık konseptler ve stratejiler öğrendiniz demektir. Eğer uzman bir Pythoncuysanız, unuttuğunuz şeyleri hatırlamanıza ve arada birkaç ufak numara öğrenmenize yardımcı olduğumu umuyorum. Ne kadar deneyimli olursanız olun, umuyorum ki Python'un sihirli metodları arasındaki bu gezimiz sizin için de sihirli olmuştur. (Kusura bakmayın, yapmadan duramazdım!)

* * *

Bu eser  <a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Alıntı-Gayriticari-LisansDevam 3.0 Yerelleştirilmemiş Lisansı</a> ile lisanslanmıştır.\\
<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/3.0/"><img alt="Creative Commons Lisansı" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" /></a>

