from django_filters import rest_framework as filters
from .models import WasteMoney


class WasteMoneyFilter(filters.FilterSet):
    start_date = filters.DateTimeFilter(field_name="date", lookup_expr='gte')
    end_date = filters.DateTimeFilter(field_name="date", lookup_expr='lte')

    class Meta:
        model = WasteMoney
        fields = ['start_date', 'end_date']
