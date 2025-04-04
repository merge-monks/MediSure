import { getUserId } from './authService';

const API_URL = (typeof window !== 'undefined' && window.env && window.env.REACT_APP_API_URL) 
  || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  || 'http://localhost:4000/api';

export const getMedicalReports = async () => {
  try {
    // No need to manually pass userId - the server will identify the user from the session cookie
    const response = await fetch(`${API_URL}/medical/scanReports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching medical reports:', error);
    return { 
      success: false, 
      message: error.message,
      reports: [] 
    };
  }
};

export const createMedicalReport = async (reportData) => {
  try {
    // No need to manually add userId - it will be extracted from session
    const response = await fetch(`${API_URL}/medical/scanReports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating medical report:', error);
    throw error;
  }
};

export const getMedicalReportById = async (id) => {
  const response = await fetch(`${API_URL}/medical/scanReports/${id}`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};

export const getTestImages = async (testId) => {
  try {
    const response = await fetch(`${API_URL}/medical/scanReports/${testId}/images`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching test images:', error);
    throw error;
  }
};
