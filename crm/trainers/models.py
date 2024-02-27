from django.db import models
from django.contrib.auth.models import User
import datetime

class Role(models.Model):
    name = models.CharField(blank=True, max_length=30)
    def __str__(self):
            return self.name

class ClientState(models.Model):
    name = models.CharField(blank=True, max_length=30)
    def __str__(self):
        return self.name


class SportType(models.Model):
    title = models.CharField(blank=True, max_length=50, default='Спорт')

    def __str__(self):
        return self.title

class Client(models.Model):
    first_name = models.CharField(blank=False, max_length=30, default='qwerty')
    last_name = models.CharField(blank=True, max_length=30)
    reg_date = models.DateField(auto_now=True, blank=True)
    birth_date = models.DateField(auto_now=False, blank=True, default=datetime.date(2023, 1, 1))
    state = models.ForeignKey(ClientState, models.CASCADE, blank=True, null=True)
    balance = models.IntegerField(default=0, blank=False)
    def __str__(self):
        return self.first_name + self.last_name


class TrainerState(models.Model):
    name = models.CharField(blank=True, max_length=30)

    def __str__(self):
        return self.name


class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    otchestv = models.CharField(blank=True, max_length=20)
    birthdate = models.DateField(auto_now=False)
    role = models.ForeignKey(Role, models.CASCADE, blank=True, null=True)
    state = models.ForeignKey(TrainerState, models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.user.first_name


class Address(models.Model):
    city = models.CharField(blank=False, default='123', max_length=30)
    street = models.CharField(blank=False, default='123', max_length=30)
    house = models.CharField(blank=True, max_length=30)
    building = models.CharField(blank=True, max_length=30)
    flat = models.CharField(blank=True, max_length=30)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)


class Area(models.Model):
    address = models.CharField(blank=True, max_length=50, default='Адрес площадки')

    def __str__(self):
        return self.address

class Parents(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    name = models.CharField(blank=True, max_length=30)
    last_name = models.CharField(blank=True, max_length=30)
    email = models.CharField(blank=True, max_length=30)
    telephone = models.CharField(blank=True, max_length=30)



class Team(models.Model):
    name = models.CharField(max_length=20, blank=False)
    clients = models.ManyToManyField(Client)
    sport_type = models.ForeignKey(SportType, on_delete=models.SET_NULL, blank=False, null=True)
    trainer = models.ForeignKey(Trainer, models.DO_NOTHING, blank=False, null=True)

    def __str__(self):
        return self.name

class Activity(models.Model):
    area = models.ForeignKey(Area, on_delete=models.DO_NOTHING, blank=True)
    act_date = models.DateField(auto_now=False, blank=False)
    act_time_begin = models.TimeField(auto_now=False)
    act_time_end = models.TimeField(auto_now=False)
    clients = models.ManyToManyField(Client)
    trainer = models.ForeignKey(Trainer, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=20, default="Состоится")
    sport = models.ForeignKey(SportType, models.DO_NOTHING, blank=False, null=True)


class Presence(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    presence = models.BooleanField(blank=False, default=False)

class News(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    expiry_date = models.DateTimeField('expiry date')
    text = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-pub_date']

class Abonement(models.Model):
    title = models.CharField(max_length=50, blank=False, default="имя абонемента")
    price = models.IntegerField(blank=False, default=0, null=True)
    duration = models.DurationField(blank=True, null=True)
    lesson_count = models.IntegerField(blank=True, null=True)
    clients = models.ManyToManyField(Client, through="PurchaseHistory")
    sport = models.ForeignKey(SportType, on_delete=models.DO_NOTHING, blank=True)


class PurchaseHistory(models.Model):
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    abonement = models.ForeignKey(Abonement, on_delete=models.DO_NOTHING)
    purchase_date = models.DateField(blank=False, auto_now=True)
    status = models.CharField(max_length=20, blank=False, default="активен")
    activities_left = models.IntegerField(blank=True, null=True)
    date_of_end = models.DateField(blank=True, null=True)





