from django.db import models
from budget.models import Budget


class Category(models.Model):
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name


class WasteMoney(models.Model):
    name = models.CharField(max_length=120)
    price = models.IntegerField()
    date = models.DateTimeField(auto_now=True)
    description = models.TextField(max_length=2000)
    budget = models.ForeignKey(Budget, related_name='waste_money', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name='waste_money', on_delete=models.CASCADE,
                                 null=True)

    def __str__(self):
        return self.name
