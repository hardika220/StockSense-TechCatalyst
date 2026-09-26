from django.contrib import admin
from .models import InventoryItem


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = (
        'product_name',
        'sku',
        'category',
        'display_quantity',
        'price',
        'warehouse',
        'status_badge',
        'updated_at',
    )
    list_filter = ('category', 'warehouse')
    search_fields = ('product_name', 'sku', 'category', 'description')
    readonly_fields = ('created_at', 'updated_at')

    def display_quantity(self, obj):
        return f"{obj.quantity} {obj.unit}" if obj.unit else f"{obj.quantity}"
    display_quantity.short_description = "Quantity"

    def status_badge(self, obj):
        return obj.status
    status_badge.short_description = "Status"