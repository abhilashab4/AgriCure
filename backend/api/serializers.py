from rest_framework.serializers import ModelSerializer
from .models import DiseaseInfo

class DiseaseInfoSerializer(ModelSerializer):
    class Meta:
        model = DiseaseInfo
        fields = '__all__'