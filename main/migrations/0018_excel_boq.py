# Generated by Django 3.2.4 on 2021-06-29 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_master_db_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='excel_boq',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boq_id', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('data', models.TextField(blank=True, default=None, null=True)),
            ],
        ),
    ]
