from rest_framework import serializers
from .models import Earnings


class EarningsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Earnings
        fields = ('amount', '_from', 'date', 'description', 'budget_id')

    def create(self, validated_data):
        validated_data_without_budget = {}
        for key, value in validated_data.items():
            if key != 'budget':
                validated_data_without_budget[key] = value
        budget = validated_data['budget']
        new_earnings = budget.earnings.create(**validated_data_without_budget)
        budget.balance += new_earnings.price
        budget.save()
        return new_earnings