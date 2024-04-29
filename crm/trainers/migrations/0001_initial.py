
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Abonement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='имя абонемента', max_length=50)),
                ('price', models.IntegerField(default=0, null=True)),
                ('duration', models.DurationField(blank=True, null=True)),
                ('lessonCount', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(blank=True, default='Адрес площадки', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),


                ('avatar', models.ImageField(upload_to='avatars')),

                ('firstName', models.CharField(default='qwerty', max_length=30)),
                ('lastName', models.CharField(blank=True, max_length=30)),
                ('middleName', models.CharField(blank=True, max_length=30)),
                ('address', models.CharField(blank=True, max_length=100)),
                ('regDate', models.DateField(auto_now=True)),

                ('birthDate', models.DateField(default=datetime.date(2023, 1, 1))),

                ('balance', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ClientState',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Family',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('clients', models.ManyToManyField(to='trainers.client')),

                ('possibleAbonements', models.ManyToManyField(to='trainers.abonement')),

            ],
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('actDate', models.DateField()),
                ('actTimeBegin', models.TimeField()),
                ('actTimeEnd', models.TimeField()),
                ('status', models.CharField(default='Состоится', max_length=20)),
                ('area', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.area')),
                ('clients', models.ManyToManyField(to='trainers.client')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trainers.group')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseHistoryStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='SportType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='Спорт', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TrainerState',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Trainer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('middleName', models.CharField(blank=True, max_length=20)),
                ('birthDate', models.DateField()),
                ('role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trainers.role')),
                ('state', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trainers.trainerstate')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchaseDate', models.DateField(auto_now=True)),
                ('activitiesLeft', models.IntegerField(blank=True, null=True)),
                ('endDate', models.DateField(blank=True, null=True)),
                ('abonement', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.abonement')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.client')),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.purchasehistorystatus')),
            ],
        ),
        migrations.CreateModel(
            name='Presence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('presence', models.BooleanField(default=False)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trainers.client')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trainers.lesson')),
            ],
        ),
        migrations.AddField(
            model_name='lesson',
            name='trainer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.trainer'),
        ),
        migrations.AddField(
            model_name='group',
            name='sportType',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='trainers.sporttype'),
        ),
        migrations.AddField(
            model_name='group',
            name='trainer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.trainer'),
        ),
        migrations.AddField(
            model_name='client',
            name='state',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='trainers.clientstate'),
        ),
        migrations.AddField(
            model_name='abonement',
            name='clients',
            field=models.ManyToManyField(through='trainers.PurchaseHistory', to='trainers.client'),
        ),
        migrations.AddField(
            model_name='abonement',
            name='sportType',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='trainers.sporttype'),
        ),
    ]
