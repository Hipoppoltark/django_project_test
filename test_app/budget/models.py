from django.db import models


class Budget(models.Model):
    balance = models.IntegerField()
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name

