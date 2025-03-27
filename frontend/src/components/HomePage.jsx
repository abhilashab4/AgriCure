import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaCamera, FaRobot, FaClipboardList } from "react-icons/fa";
import { Disclosure, Transition } from "@headlessui/react";
import axios from "axios";

const HomePage = ({ faqs }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState("");

  // Handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Send image to backend for prediction
  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setResult("");

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult("Error detecting disease. Try again.");
    }
    setIsAnalyzing(false);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-24 pb-12 bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            AI-Powered Plant Health Diagnostics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Keep your plants healthy with advanced AI technology that detects diseases instantly
          </p>
          <div className="max-w-xl mx-auto">
            <label className="relative group cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200">
                <FaUpload className="mr-2" />
                Upload Plant Image
              </div>
            </label>
          </div>
        </div>
      </motion.section>


      {/* Image Preview & Results */}
{imagePreview && (
  <section className="py-8 bg-white dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <div className="max-w-2xl mx-auto text-center">
        <img src={imagePreview} alt="Plant" className="rounded-lg shadow-lg mb-6 mx-auto" />

        <button
          onClick={analyzeImage}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Image"}
        </button>

        {result && (
          <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg mt-4">
            <p className="text-gray-900 dark:text-white font-semibold">Disease: {result}</p>
            
            {/* Learn More Button */}
            <a
              href={`http://127.0.0.1:8000/api/disease-info/${encodeURIComponent(result)}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        )}
      </div>
    </div>
  </section>
)}

      

       {/* How It Works */}
       <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How AgriCure Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaCamera, title: 'Capture', description: 'Take a clear photo of your plant leaf' },
              { icon: FaRobot, title: 'Analyze', description: 'Our AI processes the image for disease patterns' },
              { icon: FaClipboardList, title: 'Diagnose', description: 'Get detailed health analysis and recommendations' }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg text-center"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-green-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <Disclosure key={index} as="div" className="mb-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-green-500">
                      <span className="text-gray-900 dark:text-white">{faq.question}</span>
                      <span className={`transform ${open ? "rotate-180" : ""} transition-transform duration-200`}>
                        ▼
                      </span>
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;