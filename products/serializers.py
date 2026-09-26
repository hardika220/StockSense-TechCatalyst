from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "code",
            "description",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    is_low_stock = serializers.ReadOnlyField()

    class Meta:
        model = Product

        fields = [
            "id",
            "name",
            "sku",
            "category",
            "category_name",
            "current_stock",
            "unit",
            "price",
            "reorder_threshold",
            "reorder_quantity",
            "is_available",
            "is_low_stock",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "category_name",
            "is_low_stock",
            "created_at",
            "updated_at",
        ]