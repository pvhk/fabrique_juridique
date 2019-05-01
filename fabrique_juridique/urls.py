from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('calculateur', views.calculateur, name="calculateur"),
    path('demarche', views.show_demarche, name="demarche"),
    path('connexion', views.show_connection, name="connexion"),
    path('inscription', views.show_inscription, name="inscription"),
    path('auth', views.connexion, name="auth"),
    path('logout', views.logout_user, name="logoutuser"),
    path("calcul", views.calcul, name="calcul"),
    path('createuser', views.create_user, name="create_user")
]