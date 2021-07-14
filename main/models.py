from django.db import models
from django.utils.timezone import now

# Create your models here.

class myuser(models.Model):
    username = models.CharField(max_length=150, default=None, blank=True, null=True)
    password = models.CharField(max_length=150, default=None, blank=True, null=True)
    active = models.BooleanField(default = True)

class resource_category(models.Model):
    category_value = models.CharField(max_length=150, default=None, blank=True, null=True)
    category_name = models.CharField(max_length=150, default=None, blank=True, null=True)

class master_db(models.Model):
    code = models.CharField(max_length=150, default=None, blank=True, null=True)
    name = models.CharField(max_length=500, default=None, blank=True, null=True)
    price = models.FloatField(null=True, blank=True, default=0)
    uom = models.CharField(max_length=50, default=None, blank=True, null=True)
    category = models.CharField(max_length=150, default=None, blank=True, null=True)
    remark = models.TextField(default=None, null=True, blank = True)

    class Meta:
        ordering = ('code',)

class boq(models.Model):
    name = models.CharField(max_length=500, default=None, blank=True, null=True)
    code = models.CharField(max_length=150, default=None, blank=True, null=True)
    description = models.TextField(default=None, null=True, blank = True)
    factor1 = models.FloatField(null=True, blank=True, default=1)
    factor2 = models.FloatField(null=True, blank=True, default=1)
    factor3 = models.FloatField(null=True, blank=True, default=1)
    factor4 = models.FloatField(null=True, blank=True, default=1)
    data = models.TextField(default=None, null=True, blank = True)
    date_created = models.DateTimeField(default=now)
    won = models.BooleanField(default=False)

    class Meta:
        ordering = ('name',)

class excel_boq_data(models.Model):
    boq_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    data = models.TextField(default=None, null=True, blank = True)

class item(models.Model):
    heading = models.CharField(max_length=150, default=None, blank=True, null=True)
    boq_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    dry_amount = models.FloatField(null=True, blank=True, default=0)
    sell_amount = models.FloatField(null=True, blank=True, default=0)

class child_master(models.Model):
    item_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    master_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    quantity = models.FloatField(default=None, null=True, blank=True)
    uom = models.CharField(max_length=50, default=None, blank=True, null=True)
    price = models.FloatField(null=True, blank=True, default=0)
    amount = models.FloatField(null=True, blank=True, default=0)
    factor = models.CharField(max_length=10, default=None, blank=True, null=True)
    sell_price = models.FloatField(null=True, blank=True, default=0)
    sell_amount = models.FloatField(null=True, blank=True, default=0)
    remark = models.TextField(default=None, null=True, blank = True)

    class Meta:
        ordering = ('item_id',)

class master_item(models.Model):
    code = models.CharField(max_length=150, default=None, null=True, blank=True)
    name = models.CharField(max_length=150, default=None, null=True, blank=True)
    comp_count = models.PositiveIntegerField(default=None, null=True, blank=True)
    components = models.TextField(default=None, null=True, blank=True)
    remark = models.TextField(default=None, null=True, blank = True)

    class Meta:
        ordering = ('name',)

class master_item_edit(models.Model):
    boq_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    master_id = models.PositiveIntegerField(default=None, null=True, blank=True)
    code = models.CharField(max_length=150, default=None, null=True, blank=True)
    name = models.CharField(max_length=150, default=None, null=True, blank=True)
    comp_count = models.PositiveIntegerField(default=None, null=True, blank=True)
    components = models.TextField(default=None, null=True, blank=True)
    remark = models.TextField(default=None, null=True, blank = True)

    class Meta:
        ordering = ('name',)