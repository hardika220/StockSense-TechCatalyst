from rest_framework import serializers
from .models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()

    class Meta:
        model = InventoryItem
        fields = [
            'id',
            'product_name',
            'sku',
            'category',
            'quantity',
            'unit',
            'price',
            'description',
            'warehouse',
            'status',
            'created_at',
            'updated_at',
        ]