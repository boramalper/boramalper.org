---
title: "Integrating reCAPTCHA into django.contrib.auth"
date: 2020-08-14T16:32:53+03:00
---

Say you have a Django project, in which you are using [`django.contrib.auth`](https://docs.djangoproject.com/en/2.2/ref/contrib/auth/) for login, logout, password change, and password reset user-flows so not to reinvent the wheel. Integrating reCAPTCHA into those flows might seem harder than it is, so this blog post explains an easy and clean solution.

## django-recaptcha
[django-recaptcha](https://github.com/praekelt/django-recaptcha) is a third party library to integrate [reCAPTCHA](https://en.wikipedia.org/wiki/ReCAPTCHA) into [Django forms](https://docs.djangoproject.com/en/2.2/topics/forms/).

Follow the [installation](https://github.com/praekelt/django-recaptcha#installation) steps on their README.

## The Solution
Before proceeding further, it is worth outlining how django-recaptcha helps us solve our problem:

1. django-recaptcha's `ReCaptchaField` is validated (along with other fields in the form) on a call to [`is_valid()`](https://docs.djangoproject.com/en/2.2/ref/forms/api/#django.forms.Form.is_valid).
2. `django.contrib.auth` has different views for each user-flow, such as login and password reset.

   For instance `django.contrib.auth.views.LoginView` is as follows:

   ```python
   class LoginView(SuccessURLAllowedHostsMixin, FormView):
       """
       Display the login form and handle the login action.
       """
       form_class = AuthenticationForm
       authentication_form = None
       redirect_field_name = REDIRECT_FIELD_NAME
       template_name = 'registration/login.html'
       redirect_authenticated_user = False
       extra_context = None

       # [...]
    ```
2. Each view has a `form_class` field that specifies the form that is used by the view.
3. So by overriding the `form_class` of the views we are interested in using our own forms, we can integrate reCAPTCHA into those user-flows without re-implementing those user-flows from scratch!
   - Without a valid captcha response, `is_valid()` will fail.

For the solution, I will work on the login user-flow only.

### Creating a New View and a New Form
To override the `form_class` of `LoginView`, let us create `MyLoginView`:

```python
from django.contrib.auth.views import LoginView
from my_app.forms import MyAuthenticationForm


class MyLoginView(LoginView):
    form_class = MyAuthenticationForm
```

What we are missing is `MyAuthenticationForm` so let us create it:

```python
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox
# ...or import ReCaptchaV2Invisible for reCAPTCHA v2 invisible
# ...or import ReCaptchaV3 for reCAPTCHA v3


class MyAuthenticationForm(AuthenticationForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)
```

The important thing to notice here is that by subclassing `django.contrib.auth` classes, we can surgically override their fields.

### Tying Up
1. Update your _app_ urls:

   ```python
   urlpatterns = [
       path("accounts/login/", my_app.auth.MyLoginView.as_view(), name="login"),
       # [...]
   ]
   ```
2. Make sure that your _project_ urls are in correct order:

   ```python
   urlpatterns = [
       path("", include("my_app.urls")),
       path("accounts/", include("django.contrib.auth.urls")),
       # [...]
   ]
   ```

   For instance if `my_app.urls` was included _after_ `django.contrib.auth.urls`, Django would not have hit our custom views.

That's it!
