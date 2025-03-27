import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#4CAF50',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  probability: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#666666',
  },
  recommendationTitle: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    color: '#333333',
  },
  recommendation: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 15,
    color: '#666666',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#888888',
    fontSize: 10,
  },
});

const PDFReport = ({ diseaseInfo }) => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}> Plant Disease Report</Text>
          <Text style={styles.text}>{`Generated on: ${currentDate}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>{diseaseInfo.name}</Text>
          <Text style={styles.probability}>
            Confidence Level: {diseaseInfo.probability}%
          </Text>
          
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.text}>{diseaseInfo.description}</Text>

          <Text style={styles.recommendationTitle}>Recommended Actions</Text>
          {diseaseInfo.recommendations.map((recommendation, index) => (
            <Text key={index} style={styles.recommendation}>
              • {recommendation}
            </Text>
          ))}
        </View>

        <Text style={styles.footer}>
          © {new Date().getFullYear()} 
        </Text>
      </Page>
    </Document>
  );
};

export default PDFReport;