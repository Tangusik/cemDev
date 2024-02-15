from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import CharField, Serializer, EmailField, IntegerField, BooleanField, DateField, DateTimeField


class ClientSerializer(serializers.ModelSerializer):
    state = serializers.StringRelatedField()
    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'birth_date', 'state', 'balance',"id")

class UserAuthSerializer(Serializer):
    username = CharField(required=True)
    password = CharField(required=True)

class UserEditSerializer(Serializer):
    first_name = CharField(required=False)
    last_name = CharField(required=False)
    otchestv = CharField(required=False)
    email = EmailField(required=False)


class TrainerStateEditSerializer(Serializer):
    state = IntegerField(required= True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email',"id"]

class TrainerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = serializers.StringRelatedField()
    state = serializers.StringRelatedField()
    class Meta:
        model = Trainer
        fields = ['user', 'otchestv', 'birthdate', 'role', 'state']
        depth = 1







class ActivitySerializer(serializers.ModelSerializer):
    trainer = TrainerSerializer()
    clients = ClientSerializer(many=True)
    area = serializers.StringRelatedField()
    sport = serializers.StringRelatedField()
    class Meta:
        model = Activity
        fields = ("__all__")

class ActivitiesSerializer(serializers.ModelSerializer):
    trainer = TrainerSerializer(many=False)
    clients = ClientSerializer(many=True)
    area = serializers.StringRelatedField()
    sport = serializers.StringRelatedField()
    class Meta:
        model = Activity
        fields = ("__all__")

class TeamSerializer(serializers.ModelSerializer):
    clients = ClientSerializer(many=True)
    sport_type = serializers.StringRelatedField()
    class Meta:
        model = Team
        fields = ('name','clients', 'sport_type')









class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ("__all__")

class TrainerStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerState
        fields = ("__all__")

class ClientStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientState
        fields = ("__all__")


class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ("__all__")

class SportTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportType
        fields = ("__all__")

class AbonementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abonement
        fields = ("title","price","duration","lesson_count","sport", )

class AbonementCreationSerializer(serializers.Serializer):
    title = CharField(required=True)
    price = IntegerField(required=True)
    is_duration = BooleanField(required=False)
    duration = IntegerField(required=False)
    duration_type = CharField(required=False)
    is_lesson_count = BooleanField(required=False)
    lesson_count = IntegerField(required=False)
    sport_type = IntegerField(required=True)

class AbonementhistorySerializer(serializers.ModelSerializer):
    abonement = AbonementSerializer()
    class Meta:
        model = PurchaseHistory
        fields = ['abonement', 'purchase_date', "status", 'activities_left', 'date_of_end']


class AbonementAddSerializer(serializers.Serializer):
    abonement = IntegerField(required = True)