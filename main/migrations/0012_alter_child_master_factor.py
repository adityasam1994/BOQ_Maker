# Generated by Django 3.2.4 on 2021-06-24 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_child_master_factor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='child_master',
            name='factor',
            field=models.CharField(blank=True, default=None, max_length=10, null=True),
        ),
    ]
