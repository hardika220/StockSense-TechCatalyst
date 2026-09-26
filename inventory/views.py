from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import InventoryItem
from .serializers import InventoryItemSerializer


class InventoryItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows inventory items to be viewed, created, updated, or deleted.
    Supports filtering by category and warehouse, as well as searching by product name or SKU.
    """
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

    def get_queryset(self):
        queryset = InventoryItem.objects.all()
        category = self.request.query_params.get('category', None)
        warehouse = self.request.query_params.get('warehouse', None)
        search = self.request.query_params.get('search', None)

        if category and category != 'All':
            queryset = queryset.filter(category__iexact=category)
            
        if warehouse and warehouse != 'All':
            queryset = queryset.filter(warehouse__iexact=warehouse)

        if search:
            queryset = queryset.filter(
                product_name__icontains=search
            ) | queryset.filter(
                sku__icontains=search
            )

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)