from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from budget.models import Budget


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    budgets = models.ManyToManyField(Budget)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email
