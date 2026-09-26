import uuid
from django.db import models


class StockMovement(models.Model):
    OPERATION_CHOICES = [
        ('Receipt', 'Receipt'),
        ('Delivery', 'Delivery'),
        ('Transfer', 'Transfer'),
        ('Adjustment', 'Adjustment'),
    ]

    STATUS_CHOICES = [
        ('Completed', 'Completed'),
        ('Pending', 'Pending'),
        ('Cancelled', 'Cancelled'),
    ]

    # Data fields from table columns
    date_time = models.DateTimeField(auto_now_add=True, verbose_name="Date & Time")
    product_name = models.CharField(max_length=255, verbose_name="Product")
    reference_number = models.CharField(
        max_length=100, 
        unique=True, 
        verbose_name="Reference No.", 
        help_text="e.g. RCP-2026-001"
    )
    sku = models.CharField(max_length=100, verbose_name="SKU")
    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES, verbose_name="Operation")
    source = models.CharField(max_length=100, default="Supplier", verbose_name="Source")
    destination = models.CharField(max_length=100, default="Main Warehouse", verbose_name="Destination")
    quantity = models.IntegerField(default=0, verbose_name="Quantity")
    unit = models.CharField(max_length=20, default="pcs", help_text="e.g. pcs, kg, bag, m, pairs")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Completed", verbose_name="Status")

    class Meta:
        verbose_name = "Stock Movement"
        verbose_name_plural = "Stock Movements"
        ordering = ['-date_time']

    def __str__(self):
        return f"{self.operation} - {self.product_name} ({self.reference_number})"