from django.urls import path
from . import views

urlpatterns = [
    # path('diseaseinfo/', views.diseaseinfo, name  = 'diseaseinfo'),
    # path('diseaseinfo/<str:name>', views.get_disease, name  = 'get-disease'),
    path('detect/', views.detect_disease, name='detect'),

]