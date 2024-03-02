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
    path('add_client', views.add_client),                           #DONE
    path('all_groups', views.all_groups),                           #DONe
    path('group_creation', views.group_creation),                   #IN PROGRESS

    #___________colleagues
    path('trainer_list', views.trainer_list),                       #DONe
    path("trainer_groups", views.trainers_groups),                  #DONe
    path("trainer_create", views.create_trainer),                   #DONE
    path("trainer_delete/<int:id>", views.delete_trainer),          #DONE


    #___________main_info
    path("trainer_card", views.trainer_info_card),                  #DONe
    path("change_tr_state", views.user_state_edit),                 #DONE
    path("user_edit", views.user_edit),                             #DONE

    #___________main
    path("roles", views.roles),                                     #DONE
    path("delete_role/<int:id>", views.delete_role),                #DONE
    path("tr_statuses", views.tr_statuses),                         #DONE
    path("tr_status_delete/<int:id>", views.delete_tr_status),      #DONE
    path("cl_statuses", views.cl_statuses),                         #DONE
    path("cl_status_delete/<int:id>", views.delete_cl_status),      #DONE
    path("areas", views.areas),                                     #DONE
    path("area_delete/<int:id>", views.delete_area),                #DONE
    path("sport_types", views.sport_types),                         #DONE
    path("sport_type_delete/<int:id>", views.delete_sport_type),    #DONE
    path("abonements", views.abonements),                           #DONE
    path("abonement_delete/<int:id>", views.delete_abonement),      #DONE

    #___________client_detail_info
    path("client/<int:pk>", views.client_detail),                   #DONE
    path("client/<int:pk>/abonements", views.client_abonements),    #DONE
    path("client/<int:pk>/abonements/<int:ab_id>", views.client_abonements_delete), #DONE
    path("client/<int:pk>/groups", views.client_groups),            #DONE
    path("client/<int:pk>/acts", views.client_activities),          #DONE
    path("client/<int:pk>/addbalance", views.add_balance),          #DONE


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
    #
    # 3
    # фильрауции клиентов и групп с заморозками 2
    # фотографии клиентов 3
    # авто рассылка через тг бот и напоминание об оплате (др) приветствие 3
    # кнопка чат с клиентом в тг 3
    # братья и сёстры 1
    # неактивен 1


    ]