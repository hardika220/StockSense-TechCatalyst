from django.contrib import admin
from .models import StockMovement


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = (
        'date_time',
        'product_name',
        'reference_number',
        'sku',
        'operation',
        'source',
        'destination',
        'display_quantity',
        'status',
    )
    list_filter = ('operation', 'status', 'source', 'destination')
    search_fields = ('product_name', 'sku', 'reference_number', 'source', 'destination')
    readonly_fields = ('date_time',)

    def display_quantity(self, obj):
        sign = "+" if obj.operation == "Receipt" else ("-" if obj.operation == "Delivery" else "")
        return f"{sign}{obj.quantity} {obj.unit}"
    display_quantity.short_description = "Quantity"