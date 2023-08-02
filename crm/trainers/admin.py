from django.contrib import admin
from .models import Client, Address, Team, Trainer, Activity, Abonement, SportType, TrainerState, ClientState, Role

admin.site.register(Activity)
admin.site.register(Client)
admin.site.register(Address)
admin.site.register(Team)
admin.site.register(Trainer)
admin.site.register(Abonement)
admin.site.register(SportType)
admin.site.register(TrainerState)
admin.site.register(ClientState)
admin.site.register(Role)