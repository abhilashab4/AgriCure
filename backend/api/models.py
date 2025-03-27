from django.db import models

# Create your models here.
class DiseaseInfo(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    cause = models.TextField()
    symptoms = models.JSONField(default=list)  
    prevention = models.JSONField(default=list)  
    solution = models.CharField(max_length=1000)
    link = models.CharField(max_length=1000)
    image = models.ImageField(blank=True, null=True, upload_to='disease-info/')  
    

    def __str__(self):
        return self.name