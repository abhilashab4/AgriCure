
# AgriCure

AgriCure is an AI-powered crop disease detection system that helps farmers and agricultural experts identify plant diseases using image-based diagnosis. The system uses a trained deep learning model on the backend and provides an intuitive frontend for user interaction.

---

## Features

- **AI-Based Crop Disease Detection**
- **Django REST Framework Backend**
- **React + Tailwind CSS Frontend**
- **User-Friendly Interface**
- **Treatment Recommendations**
- **Future-Ready & Scalable**

---

## Tech Stack

| Layer      | Technology                   |
|------------|-------------------------------|
| Frontend   | React, Tailwind CSS           |
| Backend    | Django, Django REST Framework |
| ML Model   | PyTorch                       |
| Database   | SQLite (default)              |

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abhilashab4/AgriCure.git
cd AgriCure
```

---

## Backend Setup (Django)

#### Step 1: Create a Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate   # For Windows: venv\Scriptsctivate
```

#### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

#### Step 3: Apply Migrations

```bash
python manage.py migrate
```

#### Step 4: Run the Backend Server

```bash
python manage.py runserver
```

> The backend server will start at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Frontend Setup (React + Vite)

#### Step 1: Navigate to the Frontend Directory

```bash
cd ../frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Run the Frontend Server

```bash
npm run dev
```

> The frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## Folder Structure

```
AgriCure/
├── backend/
│   ├── api/
│   ├── model_files/
│   ├── manage.py
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

---

## Future Improvements

- Add support for more crops and plant types
- Include a dashboard for farmers to track predictions
- Add multi-language support
- Integrate chatbot for agri assistance
- Admin panel for data management and analytics
- Deploy using Docker & CI/CD pipeline

---

## License

This project is licensed under the [MIT License](LICENSE)

---

## Contact

**Author**: Abhilash B  
**GitHub**: [@abhilashab4](https://github.com/abhilashab4)
