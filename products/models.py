from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(
        max_length=10, 
        blank=True, 
        help_text="Prefix used in SKUs, e.g., RAW, FUR, GRO"
    )
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    UNIT_CHOICES = [
        ("pcs", "Pieces"),
        ("kg", "Kilograms"),
        ("l", "Liters"),
        ("box", "Boxes"),
        ("m", "Meters"),
    ]

    name = models.CharField(max_length=200)
    sku = models.CharField(
        max_length=100, 
        unique=True, 
        help_text="e.g. RAW-SR-001, FUR-CH-042"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products"
    )
    
    current_stock = models.IntegerField(default=0)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default="pcs")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    reorder_threshold = models.IntegerField(
        default=10,
        help_text="Stock level at or below which low stock alert is triggered"
    )
    reorder_quantity = models.IntegerField(
        default=50,
        help_text="Suggested quantity to order when replenishing stock"
    )
    
    # Replaced is_active with is_available
    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_low_stock(self):
        return self.current_stock <= self.reorder_threshold

    def __str__(self):
        return f"{self.name} ({self.sku})"