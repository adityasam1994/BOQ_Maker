# Generated by Django 3.2.4 on 2021-07-05 05:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_rename_excel_boq_excel_boq_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='boq',
            name='data',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
