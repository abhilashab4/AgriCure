import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFReport from './PdfUpload';

const DiseaseInfoPage = ({ isAnalyzing, diseaseInfo, error }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
            Disease Diagnosis Results
          </h1>
        </div>
        <div>
        {diseaseInfo && (
            <PDFDownloadLink
              document={<PDFReport diseaseInfo={diseaseInfo} />}
              fileName={`plant-disease-report-${new Date().toISOString().split('T')[0]}.pdf`}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  'Generating PDF...'
                ) : (
                  <>
                    <FaDownload className="mr-2" />
                    Download Report
                  </>
                )
              }
            </PDFDownloadLink>
          )}
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center p-12">
              <ClipLoader color="#10B981" size={50} />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Analyzing your plant...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </div>
          ) : diseaseInfo ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {diseaseInfo.name}
                </h2>
                <div className="mb-4">
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    Probability: {diseaseInfo.probability}%
                  </span>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {diseaseInfo.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-2">Cause</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {diseaseInfo.cause}
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Symptoms</h3>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                    {diseaseInfo.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-semibold mb-2">Solutions</h3>
                  <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
                    {diseaseInfo.solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ul>

                  {diseaseInfo.youtubeLink && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-2">Learn More</h3>
                      <a
                        href={diseaseInfo.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
              <p className="text-yellow-600 dark:text-yellow-400 text-center">
                No disease detected. Please try with a clearer image.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DiseaseInfoPage;
