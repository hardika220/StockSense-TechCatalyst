from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from inventory.models import InventoryItem
from .serializers import DashboardSummarySerializer


class DashboardSummaryView(APIView):
    def get(self, request):
        total_products = InventoryItem.objects.count()

        low_stock_items = InventoryItem.objects.filter(
            quantity__gt=0,
            quantity__lt=10
        )

        out_of_stock_count = InventoryItem.objects.filter(
            quantity__lte=0
        ).count()

        # Dynamic Low Stock Alerts payload
        low_stock_alerts = [
            {
                "id": item.id,
                "name": item.product_name,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit": item.unit or "pcs",
            }
            for item in low_stock_items[:5]
        ]

        data = {
            "overview": {
                "total_products": total_products,
                "total_products_trend": "+12 this week",
                "low_stock_count": low_stock_items.count(),
                "low_stock_trend": "+5 since yesterday",
                "pending_receipts": 15,
                "pending_receipts_sub": "3 due today",
                "pending_deliveries": 10,
                "pending_deliveries_sub": "2 overdue",
                "internal_transfers": 8,
                "internal_transfers_sub": "1 in progress",
            },
            "stock_movement": {
                "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                "receipts": [100, 80, 150, 120, 140, 40, 20],
                "deliveries": [60, 90, 50, 80, 100, 30, 10],
                "transfers": [20, 15, 30, 25, 40, 10, 5],
            },
            "low_stock_alerts": {
                "count": low_stock_items.count(),
                "items": low_stock_alerts,
            },
        }

        serializer = DashboardSummarySerializer(data)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )