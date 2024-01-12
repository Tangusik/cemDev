from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import CharField

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'reg_date', 'birth_date', 'state', 'balance')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('area', 'act_date', 'act_time_begin',
        'sport')

class UserAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        username = CharField(required=True)
        password = CharField(required=True)

        fields = ['username', 'password']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class TarinerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Trainer
        fields = ['user', 'otchestv', 'birthdate', 'role', "state"]
        depth = 1
