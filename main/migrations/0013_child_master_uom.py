# Generated by Django 3.2.4 on 2021-06-24 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_child_master_factor'),
    ]

    operations = [
        migrations.AddField(
            model_name='child_master',
            name='uom',
            field=models.CharField(blank=True, default=None, max_length=50, null=True),
        ),
    ]
