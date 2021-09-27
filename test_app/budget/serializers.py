from rest_framework import serializers
from .models import Budget


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id', 'balance', 'name')

    def create(self, validated_data):
        validated_data_without_user = {}
        for key, value in validated_data.items():
            if key != 'user':
                validated_data_without_user[key] = value
        return validated_data['user'].budgets.create(**validated_data_without_user)
