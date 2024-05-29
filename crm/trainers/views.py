import datetime
from datetime import date, timedelta
from django.utils import timezone
from django.shortcuts import render, get_object_or_404
from .models import *

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.db.models import Q
import json

from django.views.decorators.csrf import csrf_exempt

from .serializers import *
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])             #DONE
def log_in(request):
    serializer = UserAuthSerializer(data = request.data)
    if serializer.is_valid():
        user = authenticate(**serializer.validated_data)
        if user is not None:
            login(request, user)
            return Response({'status': 'Success'})
        else:
            return Response({'error': 'Invalid credentials'}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view(['GET'])              #DONE
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_trainer(request):
    serializer = TrainerCreationSerializer(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(username= serializer.data['email'],
                                        email= serializer.data['email'],
                                        password = serializer.data['password'],
                                        first_name = serializer.data['first_name'],
                                        last_name = serializer.data['last_name'])

        role = get_object_or_404(Role, pk=serializer.data['role'])
        Trainer.objects.create(user = user, middleName=serializer.data['middleName'],
                               birthDate = serializer.data['birthDate'], role=role)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET','POST'])             #Получение всех ролей и создание новых
@permission_classes([IsAuthenticated])
def roles(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = RoleSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            roles = Role.objects.all()
            serializer = RoleSerializer(roles, context={'request': request},many=True)
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_role(request, id):
    role = get_object_or_404(Role, pk=id)
    role.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET','POST'])                           #Получение всех состояний тренеров и создание новых
@permission_classes([IsAuthenticated])
def tr_statuses(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = TrainerStateSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            tr_statuses = TrainerState.objects.all()
            serializer = TrainerStateSerializer(tr_statuses, context={'request': request},many=True)
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_tr_status(request, id):
    tr_status = get_object_or_404(TrainerState, pk=id)
    tr_status.delete()
    return Response(status=status.HTTP_202_ACCEPTED)



@api_view(['GET','POST'])                           #Получение всех состояний клиентов и создание новых
@permission_classes([IsAuthenticated])
def cl_statuses(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = ClientStateSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            cl_statuses = ClientState.objects.all()
            serializer = ClientStateSerializer(cl_statuses, context={'request': request},many=True)
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cl_status(request, id):
    cl_status = get_object_or_404(ClientState, pk=id)
    cl_status.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET','POST'])                           #Получение всех площадок и создание новых
@permission_classes([IsAuthenticated])
def areas(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = AreaSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            areas = Area.objects.all()
            serializer = AreaSerializer(areas, context={'request': request},many=True)
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_area(request, id):
    area = get_object_or_404(Area, pk=id)
    area.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['POST', 'GET'])                           #Получение всех видов спорта и создание новых
@permission_classes([IsAuthenticated])
def sport_types(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = SportTypeSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            sport_types = SportType.objects.all()
            serializer = SportTypeSerializer(sport_types, context={'request': request},many=True)
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_sport_type(request, id):
    sport_type = get_object_or_404(SportType, pk=id)

    sport_type.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


@api_view(['GET','POST'])                           #Получение всех абонементов и создание новых
@permission_classes([IsAuthenticated])
def abonements(request):                         
    trainer = request.user.trainer
    if trainer.role.title.lower() == "директор":
        if request.method == "POST":
            serializer = AbonementCreationSerializer(data = request.data)
            if serializer.is_valid():
                data = serializer.validated_data

                if data['is_lesson_count']:
                    count = data['lesson_count']
                else:
                    count = None

                if data['is_duration']:
                    duration = data['duration']
                    duration_type = data['duration_type']

                    if duration_type == 'days':
                        dur = timedelta(days=int(duration))
                    elif duration_type == 'weeks':
                        dur = timedelta(weeks=int(duration))
                    elif duration_type == 'month':
                        dur = timedelta(days=int(duration) * 30)
                else:
                    dur = None

                sport_type = get_object_or_404(SportType, pk=data['sport_type'])
                abonement = Abonement.objects.create(title=data['title'], price=data['price'], lessonCount=count, duration=dur, sportType=sport_type)
                return Response(status=status.HTTP_201_CREATED)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            abonements = Abonement.objects.all()
            serializer = AbonementSerializer(abonements, context={'request': request},many=True)
            
            return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_abonement(request, id):
    abonement = get_object_or_404(Abonement, pk=id)
    abonement.delete()
    return Response(status=status.HTTP_202_ACCEPTED)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_edit(request):
    serializer = UserEditSerializer(data = request.data)
    user = request.user
    if serializer.is_valid():
        data = serializer.validated_data
        if "first_name" in data:
            User.objects.filter(pk=user.id).update(first_name = data['first_name'])
        if "last_name" in data:
            User.objects.filter(pk=user.id).update(last_name = data['last_name'])
        if "email" in data:
            User.objects.filter(pk=user.id).update(email = data['email'])
            User.objects.filter(pk=user.id).update(username = data['email'])
        if "otchestv" in data:
            Trainer.objects.filter(pk = request.user.id).update(middleName = data['otchestv'])
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=400)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_state_edit(request):
    if request.method ==  "GET":
        tr_states = TrainerState.objects.all()
        serializer = TrainerStateSerializer(tr_states, context={'request': request}, many=True)
        return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    else:
        serializer = TrainerStateEditSerializer(data = request.data)
        if serializer.is_valid():
            trainer = get_object_or_404(Trainer,pk = request.user.id)
            trainer_state = get_object_or_404(TrainerState, pk = serializer.validated_data['state'])
            trainer.state = trainer_state
            trainer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=400)

#________________________________________________________ Страница юзера

@api_view(['GET','DELETE','POST'])   #детальная инфа о клиенте
@permission_classes([IsAuthenticated])
def client_detail(request, pk):
    client = get_object_or_404(Client, pk=pk)
    if request.method == "GET":
        serializer = ClientSerializer(client, context={'request': request}, many=False)
        return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        serializer = ClientEditSerializer(data = request.data)
        if serializer.is_valid():
            if 'firstName' in serializer.data:
                client.firstName = serializer.data["firstName"]
            if 'lastName' in serializer.data:
                client.lastName = serializer.data['lastName']
            if 'middleName' in serializer.data:
                client.middleName = serializer.data['middleName']
            if 'birthDate' in serializer.data:
                client.birthDate = serializer.data['birthDate']
            client.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=400)


@api_view(['GET','POST'])   #детальная инфа о клиенте
@permission_classes([IsAuthenticated])
def client_abonements(request, pk):
    if request.method == "GET":
        client = get_object_or_404(Client, pk=pk)
        cl_abonements = PurchaseHistory.objects.filter(client=client)
        serializer = AbonementhistorySerializer(cl_abonements, context={'request': request},many=True)
        return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    elif request.method == "POST":
        serializer = AbonementAddSerializer(data = request.data)
        client = get_object_or_404(Client, pk = pk)
        if serializer.is_valid():
            ab = get_object_or_404(Abonement, pk = serializer.data['abonement'])
            if ab.duration is not None: 
                end_date = datetime.date.today() + ab.duration
            else:
                end_date = None
            stat = get_object_or_404(PurchaseHistoryStatus, pk=1)
            ab.clients.add(client, through_defaults={"activitiesLeft": ab.lessonCount, "endDate":end_date, "status":stat})
            client.balance -= ab.price
            client.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=400)

@api_view(["DELETE"])   #детальная инфа о клиенте
@permission_classes([IsAuthenticated])
def client_abonements_delete(request, pk, ab_id):
    if request.method == "DELETE":
        client = get_object_or_404(Client, pk=pk)
        del_ab = get_object_or_404(PurchaseHistory, pk = ab_id)
        del_ab.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_balance(request, pk):
    serializer = AddBalanceSerializer(data = request.data)
    client = get_object_or_404(Client, pk=pk)
    if serializer.is_valid():
        client.balance += serializer.data['balance']
        client.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    else:
        return Response(serializer.errors, status=400)
@api_view(['GET'])  # детальная инфа о клиенте
@permission_classes([IsAuthenticated])
def client_groups(request, pk):
    if request.method == "GET":
        client = get_object_or_404(Client, pk=pk)
        cl_groups = Group.objects.filter(clients__in=[client])

        serializer = GroupSerializer(cl_groups, context={'request': request}, many=True)

        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(['GET'])  # детальная инфа о клиенте
@permission_classes([IsAuthenticated])
def client_activities(request, pk):
    if request.method == "GET":
        client = get_object_or_404(Client, pk=pk)
        cl_acts = Lesson.objects.filter(clients__in=[client]).order_by("actDate", "actTimeBegin")

        serializer = LessonSerializer(cl_acts, context={'request': request}, many=True)

        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
#__________________________
@api_view(['GET','POST','DELETE'])   #список всех клиентов
@permission_classes([IsAuthenticated])
def client_list(request):
    if request.method == "GET":
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, context={'request': request},many=True)
        return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})
    elif request.method== "POST":
        serializer = ClientSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_client(request):
    serializer = ClientSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])   #список всех тренеров
@permission_classes([IsAuthenticated])
def trainer_list(request):
    if request.method == 'GET':
        trainers = Trainer.objects.all()
        serializer = TrainerSerializer(trainers, context={'request': request}, many=True)
        return JsonResponse(serializer.data, safe = False, json_dumps_params={'ensure_ascii': False})




@api_view(['GET'])                  #В расписании занятия одного тренера, а не всех
@permission_classes([IsAuthenticated])
def schedule(request):
    trainer = Trainer.objects.get(user=request.user.id)
    acts = Lesson.objects.filter(trainer = trainer)
    serializer = LessonSerializer(acts, context={'request': request},many=True)
    return JsonResponse(serializer.data, safe=False , json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])              #инфа карточки тренера
@permission_classes([IsAuthenticated])
def trainer_info_card(request):
    trainer = Trainer.objects.get(user=request.user.id)
    serializer = TrainerSerializer(trainer, context={'request': request})
    return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])                      #Группы и клиенты тренера
@permission_classes([IsAuthenticated])
def trainers_groups(request):
    trainer = Trainer.objects.get(user=request.user.id)
    teams = Group.objects.filter(trainer = trainer)
    serializer = GroupSerializer(teams, context={'request': request}, many = True)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(['GET'])                      #Группы и клиенты тренера
@permission_classes([IsAuthenticated])
def all_groups(request):
    teams = Group.objects.all()
    serializer = GroupSerializer(teams, context={'request': request}, many = True)
    return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def group_creation(request):
    serializer = GroupCreationSerializer(data=request.data)

    if serializer.is_valid():

        team_name = serializer.data['team_name']
        members = serializer.data['members']
        tr = get_object_or_404(Trainer, pk=serializer.data['trainer'])
        sp_type = get_object_or_404(SportType, pk=serializer.data['sport_type'])
        area = get_object_or_404(Area, pk=serializer.data['area'])
        team = Group.objects.create(title=team_name, trainer=tr, sportType=sp_type)
        for abonement in serializer.data['abonements']:
            team.possibleAbonements.add(get_object_or_404(Abonement, pk=abonement))
        team.save()


        date_end = serializer.data['date_end']
        acts = serializer.data['acts']

        date1 = datetime.date.today()
        date2 = datetime.datetime.strptime(date_end, '%Y-%m-%d').date()

        all_days= all_days = (date1 + timedelta(days=i) for i in range((date2 - date1).days + 1))

        for act in acts:
            for act_date in all_days:
                if act_date.weekday() == act["day_of_week"]:
                    act = Lesson.objects.create(actDate=act_date, actTimeBegin=act["time_begin"],
                               actTimeEnd=act["time_end"],
                               trainer=tr, area=area,
                               status="Состоится", group = team)
                               
                    for client in members:
                        act.clients.add(get_object_or_404(Client, pk=client))
                    act.save()
        return Response(status=status.HTTP_201_CREATED)

    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def schedule_all(request):
    acts = Lesson.objects.all()
    serializer = LessonSerializer(acts, context={'request': request},many=True)
    return JsonResponse(serializer.data, safe=False , json_dumps_params={'ensure_ascii': False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def presences_lesson(request, id):
    act = get_object_or_404(Lesson, pk=id)
    presences = []
    for client in act.clients.all():
        presence = Presence.objects.get_or_create(lesson=act, client=client)
        presences.append(presence[0])
    serializer = PresencesSerializer(presences, context={'request': request},many=True)
    return JsonResponse(serializer.data, safe=False , json_dumps_params={'ensure_ascii': False})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_trainer(request, id):
    trainer = get_object_or_404(Trainer, pk=id)
    user = get_object_or_404(User, pk=id)
    user.delete()
    trainer.delete()
    return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_groups(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, context={'request': request},many=True)
    return JsonResponse(serializer.data, safe=False , json_dumps_params={'ensure_ascii': False})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def schedule_trainer(request,id):
    trainer = get_object_or_404(Trainer, pk=id)
    acts = Lesson.objects.filter(trainer=trainer)
    serializer = LessonSerializer(acts, context={'request': request},many=True)
    return JsonResponse(serializer.data, safe=False , json_dumps_params={'ensure_ascii': False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark(request, id):
    serializer = MarkSerializer(data=request.data)
    if serializer.is_valid():
        activity = get_object_or_404(Lesson, pk=id)
        presences = [dict(item) for item in serializer.data['presences']]
        for presence in presences:
            cl = get_object_or_404(Client, pk=presence["client"])
            cl_ab = get_object_or_404(PurchaseHistory, pk=presence["paid_by"])
            curr_presence = Presence.objects.get_or_create(client=cl, lesson=activity)[0]
            if curr_presence.presence != presence["presence"]:

                if presence['presence']:
                    curr_presence.paid_by = cl_ab
                else:
                    curr_presence.paid_by = None
                curr_presence.presence = presence["presence"]
                curr_presence.save()
                check_ab(cl_ab)

        return Response(status=status.HTTP_202_ACCEPTED)      
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def check_ab(purchase_history):
    inactive_status = get_object_or_404(PurchaseHistoryStatus, pk=2)
    active_status = get_object_or_404(PurchaseHistoryStatus, pk=1)
    if purchase_history.activitiesLeft:
        purchase_history.activitiesLeft = purchase_history.abonement.lessonCount - purchase_history.presence_set.all().count()
        
        if purchase_history.activitiesLeft == 0:
            purchase_history.status = inactive_status
        else:
            purchase_history.status = active_status

    elif purchase_history.endDate:
        if datetime.date.today() > purchase_history.endDate:
            purchase_history.status = inactive_status
    purchase_history.save()
    print(purchase_history.presence_set.all().count())

