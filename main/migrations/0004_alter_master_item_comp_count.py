# Generated by Django 3.2.4 on 2021-06-15 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_master_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='master_item',
            name='comp_count',
            field=models.PositiveIntegerField(blank=True, default=None, null=True),
        ),
    ]