from django.db import models
from budget.models import Budget


class Earnings(models.Model):
    amount = models.IntegerField()
    _from = models.CharField(max_length=130)
    description = models.TextField()
    date = models.DateTimeField(auto_now=True)
    budget = models.ForeignKey(Budget, related_name='earnings', on_delete=models.CASCADE)

    def __str__(self):
        return self._from