import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Reports() {
  const [reports, setReports] = useState([
    { id: 1, type: 'Blood Test', date: '2023-07-15', results: 'Normal', details: 'Hemoglobin: 14.2 g/dL, WBC: 7,500/μL, Platelets: 250,000/μL' },
    { id: 2, type: 'Blood Sugar', date: '2023-08-20', results: 'Elevated', details: 'Fasting: 140 mg/dL, Post-meal: 190 mg/dL' },
    { id: 3, type: 'Cholesterol', date: '2023-06-10', results: 'Normal', details: 'Total Cholesterol: 180 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL' },
    { id: 4, type: 'Urine Analysis', date: '2023-09-01', results: 'Normal', details: 'pH: 6.5, Protein: Negative, Glucose: Negative' },
    { id: 5, type: 'X-Ray', date: '2023-05-25', results: 'Normal', details: 'Chest X-Ray - No abnormalities detected' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newReport, setNewReport] = useState({
    type: '',
    date: '',
    results: '',
    details: ''
  });

  const addReport = () => {
    if (newReport.type && newReport.date) {
      setReports([...reports, { id: reports.length + 1, ...newReport }]);
      setNewReport({ type: '', date: '', results: '', details: '' });
      setModalVisible(false);
    }
  };

  const ReportCard = ({ report }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <TouchableOpacity 
        style={styles.reportCard} 
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.reportHeader}>
          <Text style={styles.reportType}>{report.type}</Text>
          <Text style={styles.reportDate}>{report.date}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Results:</Text>
          <Text style={
            report.results === 'Normal' 
              ? styles.normalResult 
              : styles.abnormalResult
          }>
            {report.results}
          </Text>
        </View>

        {expanded && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsLabel}>Details:</Text>
            <Text style={styles.detailsText}>{report.details}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Reports</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Report</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.reportsList}>
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Report</Text>
            
            <Text style={styles.inputLabel}>Report Type</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g., Blood Test, X-Ray"
              value={newReport.type}
              onChangeText={(text) => setNewReport({...newReport, type: text})}
            />

            <Text style={styles.inputLabel}>Date</Text>
            <TextInput 
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={newReport.date}
              onChangeText={(text) => setNewReport({...newReport, date: text})}
            />

            <Text style={styles.inputLabel}>Results</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g., Normal, Abnormal"
              value={newReport.results}
              onChangeText={(text) => setNewReport({...newReport, results: text})}
            />

            <Text style={styles.inputLabel}>Details</Text>
            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="Enter report details"
              multiline={true}
              numberOfLines={4}
              value={newReport.details}
              onChangeText={(text) => setNewReport({...newReport, details: text})}
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Add Report" onPress={addReport} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reportsList: {
    flex: 1,
    padding: 16,
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reportType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  normalResult: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  abnormalResult: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '600',
  },
  detailsContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
