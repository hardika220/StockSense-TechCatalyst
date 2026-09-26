from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Allows access only to users with ADMIN role.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "ADMIN"
        )


class IsWarehouseManager(BasePermission):
    """
    Allows access only to Warehouse Managers.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "WAREHOUSE_MANAGER"
        )


class IsInventoryManager(BasePermission):
    """
    Allows access only to Inventory Managers.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "INVENTORY_MANAGER"
        )


class IsStaff(BasePermission):
    """
    Allows access only to Staff users.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "STAFF"
        )