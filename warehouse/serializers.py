from rest_framework import serializers
from .models import Region, Warehouse, Location

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'name', 'created_at']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'warehouse', 'name', 'description', 'is_active', 'created_at']


class WarehouseSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(source='region.name', read_only=True)
    
    # Calculated dynamic fields for table representation
    products_count = serializers.SerializerMethodField()
    total_stock = serializers.SerializerMethodField()

    class Meta:
        model = Warehouse
        fields = [
            'id',
            'name',
            'region',
            'region_name',
            'manager_name',
            'location_address',
            'status',
            'products_count',
            'total_stock',
            'created_at',
            'updated_at',
        ]

    def get_products_count(self, obj):
        # Adjust according to your Inventory/Product relationships
        if hasattr(obj, 'stocks'):
            return obj.stocks.values('product').distinct().count()
        return 0

    def get_total_stock(self, obj):
        # Adjust according to your Inventory/Product relationships
        if hasattr(obj, 'stocks'):
            return sum(stock.quantity for stock in obj.stocks.all())
        return 0