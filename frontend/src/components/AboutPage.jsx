import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaHeart, FaSeedling, FaUsers, FaLightbulb, FaRobot } from 'react-icons/fa';

const AboutPage = () => {
  const {t}=useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-12"
    >
      {/* Introduction */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-green-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('about.mission.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="py-16 bg-green-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FaSeedling className="text-5xl text-green-600 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('about.inspiration.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('about.inspiration.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <FaUsers className="text-5xl text-green-600 mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('about.team.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
            {t('about.team.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Agricure */}
      <section className="py-16 bg-green-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{t('about.whyagricure.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FaRobot,
                title: t('about.whyagricure.features.feature1.title'),
                description: t('about.whyagricure.features.feature1.description')
              },
              {
                icon: FaHeart,
                title: t('about.whyagricure.features.feature2.title'),
                description:  t('about.whyagricure.features.feature2.description')
              },
              {
                icon: FaLightbulb,
                title: t('about.whyagricure.features.feature3.title'),
                description:  t('about.whyagricure.features.feature3.description')
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center"
              >
                <feature.icon className="text-4xl text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('about.english.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('about.english.description')}
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200"
            >
              <FaGithub className="mr-2" />
              {t('about.english.buttonText')}
            </a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;