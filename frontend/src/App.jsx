import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaLeaf, FaGithub, FaMoon, FaSun } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import HomePage from './components/HomePage';
import DiseaseInfoPage from './components/DiseaseInfoPage';
import AboutPage from './components/AboutPage';
import LanguageSelector from './components/LanguageSelector';


function MainPage() {
  const{t}=useTranslation();
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
    {
      question: t('faqs.questions.plants.question'),
      answer: t('faqs.questions.plants.answer')
    },
    {
      question: t('faqs.questions.accuracy.question'),
      answer:  t('faqs.questions.accuracy.answer')
    },
    {
      question: t('faqs.questions.security.question'),
      answer:  t('faqs.questions.security.answer')
    },
    {
      question: t('faqs.questions.offlineaccess.question'),
      answer:  t('faqs.questions.offlineaccess.answer')
    },
    {
      question: t('faqs.questions.accuracy2.question'),
      answer: t('faqs.questions.accuracy2.answer')
    }
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
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600">{t('nav.home')}</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-green-600">{t('nav.about')}</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-green-600">
              <FaGithub className="text-xl" />
            </a>
            <LanguageSelector/>
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
  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2"> {t('footer.copyright')}</p>
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