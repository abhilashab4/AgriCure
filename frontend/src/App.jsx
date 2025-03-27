import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaMoon, FaSun } from 'react-icons/fa';
import HomePage from './components/HomePage';
import DiseaseInfoPage from './components/DiseaseInfoPage';
import AboutPage from './components/AboutPage';


function MainPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setResult('Healthy plant detected! No diseases found.');
      }, 2000);
    }
  };

  const faqs = [
    { question: 'What types of pest can AgriCure detect?', answer: 'AgriCure can analyze a wide variety of crops, including common vegetables, fruits, and field plants. Our AI-powered system continuously evolves, enhancing its ability to detect pests and diseases accurately.' },
    { question: 'How accurate is the disease detection?', answer:  'Our AI model has been trained on thousands of plant images and achieves high accuracy in detecting common plant diseases. However, we recommend consulting with professionals for critical decisions.' },
    { question: 'Is my plant data secure?', answer:  'Yes, we take data privacy seriously. Your uploaded images are processed securely and are not stored permanently on our servers.' },
    { question: 'Is AgriCure accessible offline?', answer: 'Currently, AgriCure requires an internet connection for image analysis, but we are working on offline capabilities.' },
    { question: 'How can I ensure accurate results?', answer: 'Ensure the image is clear, well-lit, and focused on the affected plant area.' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <FaLeaf className="text-green-600 text-2xl mr-2" />
            <span className="text-xl font-bold text-green-600">AgriCure</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600">Home</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600">About</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600">
              <FaGithub className="text-xl" />
            </a>
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-green-600">
              {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage handleImageUpload={handleImageUpload} selectedImage={selectedImage} isAnalyzing={isAnalyzing} result={result} faqs={faqs} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/diseaseinfo/:diseaseName" element ={<DiseaseInfoPage/>}/>
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-8 text-center">
  <div className="flex justify-center">
    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600 text-2xl">
      <FaGithub />
    </a>
  </div>
  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">© 2025 AgriCure</p>
</footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainPage />
    </Router>
  );
}

export default App;