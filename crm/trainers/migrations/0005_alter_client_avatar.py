# Generated by Django 4.2.7 on 2024-04-26 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainers', '0004_alter_client_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='avatar',
            field=models.ImageField(default='unnamed.jpg', upload_to='avatars'),
        ),
    ]
