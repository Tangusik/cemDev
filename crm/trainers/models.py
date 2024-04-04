from django.db import models
from django.contrib.auth.models import User
import datetime

class Role(models.Model):
    title = models.CharField(blank=True, max_length=30)
    def __str__(self):
            return self.title

class ClientState(models.Model):
    title = models.CharField(blank=True, max_length=30)
    def __str__(self):
        return self.title


class SportType(models.Model):
    title = models.CharField(blank=True, max_length=50, default='Спорт')

    def __str__(self):
        return self.title

class Client(models.Model):
    avatar = models.ImageField(upload_to='avatars')
    firstName = models.CharField(blank=False, max_length=30, default='qwerty')
    lastName = models.CharField(blank=True, max_length=30)
    middleName = models.CharField(blank=True, max_length=30)
    address = models.CharField(blank=True, max_length=100)
    regDate = models.DateField(auto_now=True, blank=True)
    birthDate = models.DateField(auto_now=False, blank=False, default=datetime.date(2023, 1, 1))
    state = models.ForeignKey(ClientState, models.CASCADE, blank=True, null=True)
    balance = models.IntegerField(default=0, blank=False)
    def __str__(self):
        return self.firstName + self.lastName


class TrainerState(models.Model):
    title = models.CharField(blank=True, max_length=30)

    def __str__(self):
        return self.title


class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    middleName = models.CharField(blank=True, max_length=20)
    birthDate = models.DateField(auto_now=False)
    role = models.ForeignKey(Role, models.CASCADE, blank=True, null=True)
    state = models.ForeignKey(TrainerState, models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.user.first_name

class Area(models.Model):
    address = models.CharField(blank=True, max_length=50, default='Адрес площадки')
    def __str__(self):
        return self.address

class Family(models.Model):
    pass

class Abonement(models.Model):
    title = models.CharField(max_length=50, blank=False, default="имя абонемента")
    price = models.IntegerField(blank=False, default=0, null=True)
    duration = models.DurationField(blank=True, null=True)
    lessonCount = models.IntegerField(blank=True, null=True)
    clients = models.ManyToManyField(Client, through="PurchaseHistory")
    sportType = models.ForeignKey(SportType, on_delete=models.DO_NOTHING, blank=True)
    def __str__(self):
        return self.title
class Group(models.Model):
    title = models.CharField(max_length=20, blank=False)
    clients = models.ManyToManyField(Client)
    sportType = models.ForeignKey(SportType, on_delete=models.SET_NULL, blank=False, null=True)
    trainer = models.ForeignKey(Trainer, models.DO_NOTHING, blank=False, null=True)
    possibleAbonements = models.ManyToManyField(Abonement)
    def __str__(self):
        return self.title

class Lesson(models.Model):
    area = models.ForeignKey(Area, on_delete=models.DO_NOTHING, blank=True)
    actDate = models.DateField(auto_now=False, blank=False)
    actTimeBegin = models.TimeField(auto_now=False)
    actTimeEnd = models.TimeField(auto_now=False)
    clients = models.ManyToManyField(Client)
    trainer = models.ForeignKey(Trainer, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=20, default="Состоится")
    group = models.ForeignKey(Group, on_delete=models.CASCADE)


class Presence(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    presence = models.BooleanField(blank=False, default=False)

class PurchaseHistoryStatus(models.Model):
    title = models.CharField(max_length=30)
    def __str__(self):
        return self.title

class PurchaseHistory(models.Model):
    client = models.ForeignKey(Client, on_delete=models.DO_NOTHING)
    abonement = models.ForeignKey(Abonement, on_delete=models.DO_NOTHING)
    purchaseDate = models.DateField(blank=False, auto_now=True)
    status = models.ForeignKey(PurchaseHistoryStatus, on_delete=models.DO_NOTHING)
    activitiesLeft = models.IntegerField(blank=True, null=True)
    endDate = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.abonement.title + " " + self.purchaseDate.strftime("%d.%m.%Y")




