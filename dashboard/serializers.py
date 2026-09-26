from rest_framework import serializers


class DashboardOverviewSerializer(serializers.Serializer):
    total_products = serializers.IntegerField()
    total_products_trend = serializers.CharField()
    low_stock_count = serializers.IntegerField()
    low_stock_trend = serializers.CharField()
    pending_receipts = serializers.IntegerField()
    pending_receipts_sub = serializers.CharField()
    pending_deliveries = serializers.IntegerField()
    pending_deliveries_sub = serializers.CharField()
    internal_transfers = serializers.IntegerField()
    internal_transfers_sub = serializers.CharField()


class StockMovementSerializer(serializers.Serializer):
    days = serializers.ListField(
        child=serializers.CharField()
    )
    receipts = serializers.ListField(
        child=serializers.IntegerField()
    )
    deliveries = serializers.ListField(
        child=serializers.IntegerField()
    )
    transfers = serializers.ListField(
        child=serializers.IntegerField()
    )


class LowStockItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    sku = serializers.CharField()
    quantity = serializers.IntegerField()
    unit = serializers.CharField()


class LowStockAlertsSerializer(serializers.Serializer):
    count = serializers.IntegerField()
    items = LowStockItemSerializer(many=True)


class DashboardSummarySerializer(serializers.Serializer):
    overview = DashboardOverviewSerializer()
    stock_movement = StockMovementSerializer()
    low_stock_alerts = LowStockAlertsSerializer()