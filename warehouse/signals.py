from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Warehouse, Location


@receiver(post_save, sender=Warehouse)
def create_default_warehouse_location(sender, instance, created, **kwargs):
    if created:
        Location.objects.create(
            warehouse=instance,
            name="RECEIVING-01",
            description="Default intake area for incoming stock movements",
            is_active=True,
        )