from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import CharField, Serializer, EmailField, IntegerField, BooleanField, DateField, DateTimeField, TimeField


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

class ClientEditSerializer(Serializer):
    first_name = CharField(required=False)
    last_name = CharField(required=False)
    birth_date = DateField(required=False)


class TrainerStateEditSerializer(Serializer):
    state = IntegerField(required= True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("__all__")

class TrainerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = serializers.StringRelatedField()
    state = serializers.StringRelatedField()
    class Meta:
        model = Trainer
        fields = ['user', 'otchestv', 'birthdate', 'role', 'state']
        depth = 1


class TrainerCreationSerializer(serializers.Serializer):
    first_name = CharField()
    last_name = CharField()
    otchestv = CharField()
    email = EmailField()
    password = CharField()
    birth_date = DateField()
    role = IntegerField()





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
    trainer = TrainerSerializer()
    class Meta:
        model = Team
        fields = ('name','clients', 'sport_type','trainer')









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
        fields = ("title","price","duration","lesson_count","sport", "id")

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
        fields = ['abonement', 'purchase_date', "status", 'activities_left', 'date_of_end', 'id']


class AbonementAddSerializer(serializers.Serializer):
    abonement = IntegerField(required = True)

class AddBalanceSerializer(serializers.Serializer):
    balance=IntegerField(required =True)


class ClientIdSer(serializers.Serializer):
    id = IntegerField()


class ActCreationSerializer(serializers.Serializer):
    day_of_week = IntegerField()
    time_begin = TimeField()
    time_end = TimeField()


class GroupCreationSerializer(serializers.Serializer):
    team_name = CharField()
    trainer = IntegerField()
    sport_type = IntegerField()
    area = IntegerField()
    members = ClientIdSer(many = True)
    date_end = DateField()
    acts = ActCreationSerializer(many=True)

class MarkSerializer(serializers.Serializer):
    client_id = IntegerField(required=True)
    presence = BooleanField(required=True)