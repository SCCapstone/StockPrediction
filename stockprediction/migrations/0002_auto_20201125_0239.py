# Generated by Django 3.0.2 on 2020-11-25 02:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stockprediction', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prediction',
            name='date_made',
        ),
        migrations.RemoveField(
            model_name='prediction',
            name='name',
        ),
    ]