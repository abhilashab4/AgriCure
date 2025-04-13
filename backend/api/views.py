import torch
import torchvision.transforms as transforms
from PIL import Image
import io
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DiseaseInfo
from .serializers import DiseaseInfoSerializer
from rest_framework import status

# Load the trained model
model_path = "D:/Aetherion/AgriCure/backend/model_files/model.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define the correct model architecture
class PlantDiseaseCNN(torch.nn.Module):
    def __init__(self, num_classes=15):  # Ensure same num_classes
        super(PlantDiseaseCNN, self).__init__()
        self.conv1 = torch.nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = torch.nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.conv3 = torch.nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.pool = torch.nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = torch.nn.Linear(128 * 16 * 16, 256)
        self.fc2 = torch.nn.Linear(256, num_classes)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = self.pool(torch.relu(self.conv3(x)))
        x = x.view(x.shape[0], -1)  # Flatten
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Initialize and load the trained model
model = PlantDiseaseCNN(num_classes=15)
model.load_state_dict(torch.load(model_path, map_location=device))
model.to(device)
model.eval()

# Define Transformations

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.RandomRotation(20),  # Rotate images randomly up to 20 degrees
    transforms.RandomHorizontalFlip(p=0.5),  # Flip images horizontally with 50% probability
    transforms.RandomVerticalFlip(p=0.5),  # Flip images vertically with 50% probability
    transforms.ColorJitter(brightness=0.2, contrast=0.2),  # Adjust brightness and contrast
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

@api_view(['GET', 'POST'])
def detect_disease(request):
    if "image" not in request.FILES:
        return Response({"error": "No image uploaded"}, status=400)

    image_file = request.FILES["image"]
    image = Image.open(io.BytesIO(image_file.read())).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        prediction = torch.argmax(output, dim=1).item()

    # Class labels (Modify based on your model)
    class_labels = [
    'Pepper Bell Bacterial Spot', 'Pepper Bell Healthy', 'Potato Early Blight',
    'Potato Late Blight', 'Potato Healthy', 'Tomato Bacterial Spot', 'Tomato Early Blight',
    'Tomato Late Blight', 'Tomato Leaf Mold', 'Tomato Septoria Leaf Spot',
    'Tomato Spider Mites Two-Spotted Spider Mite', 'Tomato Target Spot',
    'Tomato Yellow Leaf Curl Virus', 'Tomato Mosaic Virus', 'Tomato Healthy'
    ]

    result = class_labels[prediction] if prediction < len(class_labels) else "Unknown"

    return Response({
        "prediction": result,
    })



@api_view(['POST', 'GET'])
def diseaseinfo(request):
    if request.method == 'POST':
        data = request.data
        info = DiseaseInfo.objects.create(
            name=data['name'],
            description=data['description'],
            cause=data['cause'],
            symptoms=data['symptoms'],
            prevention=data['prevention'],
            solution=data['solution'],
        )
        serializer = DiseaseInfoSerializer(info, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        info = DiseaseInfo.objects.all()
        serializer = DiseaseInfoSerializer(info, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET','POST'])
def get_disease(request, name):
    info = DiseaseInfo.objects.get(name=name)
    serializer = DiseaseInfoSerializer(info, many=False)
    return Response(serializer.data)



