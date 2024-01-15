from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import CharField, Serializer

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'reg_date', 'birth_date', 'state', 'balance',"id")

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('area', 'act_date', 'act_time_begin',
        'sport')

class UserAuthSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email',"id"]

class TarinerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = serializers.StringRelatedField()
    state = serializers.StringRelatedField()
    class Meta:
        model = Trainer
        fields = ['user', 'otchestv', 'birthdate', 'role', "state"]
        depth = 1

class ActivitySerializer(serializers.ModelSerializer):
    trainer = TarinerSerializer()
    clients = ClientSerializer(many=True)
    area=  serializers.StringRelatedField()
    sport=  serializers.StringRelatedField()
    class Meta:
        model = Activity
        fields = ("__all__")