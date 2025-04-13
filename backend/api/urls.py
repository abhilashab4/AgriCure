from django.urls import path
from . import views
from django.conf import settings  # ✅ Import settings
from django.conf.urls.static import static  #
urlpatterns = [
    path('diseaseinfo/', views.diseaseinfo, name  = 'diseaseinfo'),
    path('diseaseinfo/<str:name>', views.get_disease, name = 'get-disease'),
    path('detect/', views.detect_disease, name='detect'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)