from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'reg_date', 'birth_date', 'state', 'balance')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('area', 'act_date', 'act_time_begin',
        'sport')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class TarinerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    #state = serializers.Field(source='state.name')
    #role = serializers.Field(source='role.name')

    class Meta:
        model = Trainer
        fields = ['user', 'otchestv', 'birthdate', 'role', "state"]
        depth = 1