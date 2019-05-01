from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    return render(request, 'fabrique_juridique/index.html')
def calculateur(request):
    return render(request, 'fabrique_juridique/calculateur.html')
def show_connection(request):
    return render(request, 'fabrique_juridique/connexion.html')
def show_demarche(request):
    if not request.user.is_authenticated:
        return redirect('/')
    return render(request, 'fabrique_juridique/demarche.html')
def connexion(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        current_user = User.objects.get(email=email)
    except:
        return render(request,"fabrique_juridique/connexion.html",{"incorrect":"Identifiants incorrects !"})
    user = authenticate(request, username=current_user.username, password=password)
    if user is not None:
        login(request, user)
        return redirect('/')
    else:
        return render(request,"fabrique_juridique/connexion.html",{"incorrect":"Identifiants incorrects !"})
def create_user(request):
    email = request.POST["email"]
    first_name = request.POST["firstname"]
    last_name = request.POST["lastname"]
    username = first_name+last_name
    password = request.POST["password"]
    User.objects.create_user(username=username,email=email, password=password, first_name=first_name, last_name=last_name)
    return redirect("/connexion")
def calcul(request):
    anciennete = float(request.POST["anciennete"])
    average = float(request.POST["average"])
    if anciennete > 10:
        result = ((average * 1/4) * 10) + ((average * 1/3) * anciennete - 10)
    else:
        result = (average * 1/4) * anciennete
    return render(request,'fabrique_juridique/global/mathieu.html', {"result":round(result,0),"average":round(average,0)})
def logout_user(request):
    logout(request)
    return redirect('/')
def show_inscription(request):
    try:
        request.GET["emailnext"]
        return render(request, 'fabrique_juridique/inscription.html',{"emailnext":request.GET["emailnext"]})
    except:
        return render(request, 'fabrique_juridique/inscription.html')