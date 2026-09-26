from django.db import models


class InventoryItem(models.Model):
    # Core fields matching the "Add Product" modal
    product_name = models.CharField(max_length=255, default="Unnamed Product", verbose_name="Product Name")
    sku = models.CharField(max_length=100, unique=True,default="TTU",verbose_name="SKU")
    category = models.CharField(max_length=100, default='Uncategorized', verbose_name="Category")
    quantity = models.IntegerField(default=0, verbose_name="Quantity")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, verbose_name="Price (₹)")

    # Additional fields visible in the inventory list view
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    unit = models.CharField(max_length=20, default="pcs", blank=True, null=True, help_text="e.g. pcs, bags, roll, pairs")
    warehouse = models.CharField(max_length=100, default="Main Warehouse", blank=True, null=True, verbose_name="Warehouse")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def status(self):
        """Calculates status dynamically based on quantity thresholds."""
        if self.quantity <= 0:
            return "Out of Stock"
        elif self.quantity < 50:
            return "Low Stock"
        return "In Stock"

    class Meta:
        verbose_name = "Inventory Item"
        verbose_name_plural = "Inventory Items"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.product_name} ({self.sku})"