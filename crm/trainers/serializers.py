from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import CharField, Serializer

class ClientSerializer(serializers.ModelSerializer):
    state = serializers.StringRelatedField()
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'birth_date', 'state', 'balance',"id")




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


class TeamSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True)
    sport_type = serializers.StringRelatedField()
    class Meta:
        model = Team
        fields = ('name','clients', 'sport_type')