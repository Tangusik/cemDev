from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('login', views.log_in, name='login'),                      #DONe
    path('logout', views.log_out, name='logout'),                   #DONe
    #___________schedule
    path("schedule", views.schedule),                               #DONe                                 
    path("scheduleAll", views.schedule_all),                        #DONe
    path("schedule_trainer/<int:id>", views.schedule_trainer),      #DONe
    path("mark/<int:id>", views.mark),
    path("presences/<int:id>",views.presences_lesson),              #DONe

    #___________clients
    path('client_list', views.client_list),                         #DONe
    path('add_client', views.add_client),                           #DONe
    path('all_groups', views.all_groups),                           #DONe
    path('group_creation', views.group_creation),                   #DONe

    #___________colleagues
    path('trainer_list', views.trainer_list),                       #DONe
    path("trainer_groups", views.trainers_groups),                  #DONe
    path("trainer_create", views.create_trainer),                   #DONe
    path("trainer_delete/<int:id>", views.delete_trainer),          #DONe


    #___________main_info
    path("trainer_card", views.trainer_info_card),                  #DONe
    path("change_tr_state", views.user_state_edit),                 #DONe
    path("user_edit", views.user_edit),                             #DONe

    #___________main
    path("roles", views.roles),                                     #DONe
    path("delete_role/<int:id>", views.delete_role),                #DONe
    path("tr_statuses", views.tr_statuses),                         #DONe
    path("tr_status_delete/<int:id>", views.delete_tr_status),      #DONe
    path("cl_statuses", views.cl_statuses),                         #DONe
    path("cl_status_delete/<int:id>", views.delete_cl_status),      #DONe
    path("areas", views.areas),                                     #DONe
    path("area_delete/<int:id>", views.delete_area),                #DONe
    path("sport_types", views.sport_types),                         #DONe
    path("sport_type_delete/<int:id>", views.delete_sport_type),    #DONe
    path("abonements", views.abonements),                           #DO     тут как создать если абонемент по времнеи, а не количесвту уроков
    path("abonement_delete/<int:id>", views.delete_abonement),      #DONe

    #___________client_detail_info
    path("client/<int:pk>", views.client_detail),                   #DONe
    path("client/<int:pk>/abonements", views.client_abonements),    #DONe
    path("client/<int:pk>/abonements/<int:ab_id>", views.client_abonements_delete), #DONe
    path("client/<int:pk>/groups", views.client_groups),            #DONe
    path("client/<int:pk>/acts", views.client_activities),          #DONe
    path("client/<int:pk>/addbalance", views.add_balance),          #DONe


    # добавить группу 1

    # предупреждение о накладках занятий 3
    # поиск клиента и расписание по группам 2
    # посещение возраст абонементы текущии дата начала и окончания абонемента 1
    # история занятий у клиента 1
    # остановка абонемента и сокращение в случае нарушений 1
    # ручное изменение текущего абонемента и удаление абонемента 1
    # основной и дополнительный абонемент 3
    # "заморозки" 1
    # статистика по количеству людей (таблицы)
    # 3
    # фильрауции клиентов и групп с заморозками 2
    # фотографии клиентов 3
    # авто рассылка через тг бот и напоминание об оплате (др) приветствие 3
    # кнопка чат с клиентом в тг 3
    # братья и сёстры 1
    # неактивен 1
    ]