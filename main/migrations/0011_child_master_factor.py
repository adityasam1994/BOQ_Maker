# Generated by Django 3.2.4 on 2021-06-24 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_auto_20210623_1043'),
    ]

    operations = [
        migrations.AddField(
            model_name='child_master',
            name='factor',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]
