# Generated by Django 3.2.4 on 2021-06-15 05:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_master_db_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='master_item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default=None, max_length=150, null=True)),
                ('components', models.TextField(blank=True, default=None, null=True)),
                ('comp_count', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.item')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
    ]