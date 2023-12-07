from .models import *
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'reg_date', 
        'birth_date', 'state', 'balance')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('area', 'act_date', 'act_time_begin',
        'sport')

