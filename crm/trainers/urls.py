from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login_page'),
    path('login', views.log_in, name='login'),
    path('logout', views.log_out, name='logout'),
    

#     path('clients/team_creation', views.team_creation, name='team_creation'),
#     path('clients', views.clients, name='clients'),
    #path('client/<int:client_id>', views.client_info, name='client_info'),
#     path('trainers', views.trainers, name='trainers'),
#     path('trainers/add_action', views.trainers_add_action, name='trainers_add_action'),
#     path('main/edit_profile', views.edit, name="profile_edit"),
    #path('client/<int:client_id>/add_balance', views.add_balance, name='add_balance'),
    #path('client/<int:client_id>/buy_abonement', views.buy_abonement, name='buy_abonement'),
    #path('client/<int:client_id>/delete_abonement/<int:abonement_id>', views.delete_abonement, name='delete_abonement'),

    #___________schedule
    path("schedule", views.schedule),                               #DONE
    path("scheduleAll", views.schedule_all),                        #DONE

    #___________clients
    path('client_list', views.client_list),                         #DONE
    path('add_client', views.add_client),                           #DONE

    #___________colleagues
    path('trainer_list', views.trainer_list),                       #DONE
    path("trainer_groups", views.trainers_groups),                  #DONE
    path("trainer_create", views.create_trainer),

    #___________main_info
    path("trainer_card", views.trainer_info_card),                  #DONE
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
    path("client/<int:pk>/acts", views.client_activities),
    path("client/<int:pk>/addbalance", views.add_balance),


    #пополнить баланс
    #добавить тренера
    #получить все сущесвующие гурппы (не одного тренера, а все)
    #добавить группу


    ]