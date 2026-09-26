from django.db import models


class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "Algiers", "Oran", "Constantine"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Warehouse(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("maintenance", "Maintenance"),
        ("inactive", "Inactive"),
    ]

    name = models.CharField(max_length=150)  # e.g., "Main Warehouse", "North Hub"
    region = models.ForeignKey(
        Region,
        on_delete=models.CASCADE,
        related_name="warehouses",
        null=True,  # Allows existing database rows to be NULL
        blank=True, # Allows forms/admin to leave it blank initially
        help_text="Select region/city to filter warehouses"
    )
    manager_name = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="Manager name e.g., Ahmed Benali"
    )
    location_address = models.CharField(
        max_length=255, 
        blank=True, 
        default="",
        help_text="Specific street or industrial zone address"
    )
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default="active"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.region.name})"


class Location(models.Model):
    warehouse = models.ForeignKey(
        Warehouse,
        on_delete=models.CASCADE,
        related_name="locations"
    )
    name = models.CharField(
        max_length=100, 
        help_text="Storage bin/aisle inside warehouse, e.g., A-01, A-02"
    )
    description = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("warehouse", "name")

    def __str__(self):
        return f"{self.warehouse.name} -> {self.name}"