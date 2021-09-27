from rest_framework import serializers
from .models import WasteMoney, Category


class WasteMoneySerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteMoney
        fields = ('name', 'price', 'date', 'description', 'budget_id', 'category_id')

    def create(self, validated_data):
        validated_data_without_budget = {}
        for key, value in validated_data.items():
            if key != 'budget':
                validated_data_without_budget[key] = value
        budget = validated_data['budget']
        new_waste_money = budget.waste_money.create(**validated_data_without_budget)
        budget.balance -= new_waste_money.price
        budget.save()
        return new_waste_money


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
