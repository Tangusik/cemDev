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

#___________DJ+React
    path('client_list', views.client_list),
    path('trainer_list', views.trainer_list),
    path("schedule", views.schedule),
    path("scheduleAll", views.schedule_all),
    path("trainer_card", views.trainer_info_card),
    path("trainer_groups", views.trainers_groups),

    #___________main
    path("roles", views.roles),
    path("tr_statuses", views.tr_statuses),
    path("cl_statuses", views.cl_statuses),
    path("areas", views.areas),
    path("sport_types", views.sport_types),
    path("abonements", views.abonements),
    path("change_tr_state", views.user_state_edit),
    #___________client_detail_info
    path("client/<int:pk>", views.client_detail),
    path("user_edit", views.user_edit),
    path("client/<int:pk>/abonements", views.client_abonements),
    path("client/<int:pk>/groups", views.client_groups),
    path("client/<int:pk>/acts", views.client_activities),

    #ИНФА о клиенте сюда же edit
            #абонементы сюда же добавление абонементов
            #пополнить баланс

    


    ]