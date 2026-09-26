from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryItemViewSet

router = DefaultRouter()
# Creates endpoints: GET /api/inventory/ and POST /api/inventory/
router.register(r"", InventoryItemViewSet, basename="inventory")

urlpatterns = [
    path("", include(router.urls)),
]