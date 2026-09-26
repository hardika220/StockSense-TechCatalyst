from django.db import models


class DashboardMetric(models.Model):
    low_stock_threshold = models.IntegerField(default=10, help_text="Threshold below which products trigger alerts")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Dashboard Metric Setting"
        verbose_name_plural = "Dashboard Metric Settings"

    def __str__(self):
        return f"Settings (Low Stock Threshold: {self.low_stock_threshold})"