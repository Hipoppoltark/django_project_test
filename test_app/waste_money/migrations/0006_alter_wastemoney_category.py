# Generated by Django 3.2.5 on 2021-08-01 19:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('waste_money', '0005_alter_wastemoney_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wastemoney',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='waste_money', to='waste_money.category'),
        ),
    ]
