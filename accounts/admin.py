from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    fieldsets = UserAdmin.fieldsets + (
        (
            "StockSense Information",
            {
                "fields": (
                    "role",
                    "phone",
                )
            }
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "StockSense Information",
            {
                "fields": (
                    "email",
                    "role",
                    "phone",
                )
            }
        ),
    )

    list_display = (
        "username",
        "email",
        "role",
        "phone",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "role",
        "is_active",
        "is_staff",
    )