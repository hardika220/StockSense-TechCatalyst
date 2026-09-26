from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER", "Warehouse Manager"
        INVENTORY_MANAGER = "INVENTORY_MANAGER", "Inventory Manager"
        STAFF = "STAFF", "Staff"

    email = models.EmailField(unique=True)

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    role = models.CharField(
        max_length=30,
        choices=Role.choices,
        default=Role.STAFF
    )

    def __str__(self):
        return f"{self.username} - {self.role}"