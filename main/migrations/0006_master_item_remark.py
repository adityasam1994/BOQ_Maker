# Generated by Django 3.2.4 on 2021-06-17 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_master_item_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='master_item',
            name='remark',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
