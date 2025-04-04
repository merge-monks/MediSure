import { getUserId } from './authService';

const API_URL = (typeof window !== 'undefined' && window.env && window.env.REACT_APP_API_URL) 
  || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  || 'http://localhost:4000/api';

export const getMedicalReports = async () => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      console.warn('User ID not found, cannot fetch reports');
      return { success: false, reports: [] };
    }
    
    const response = await fetch(`${API_URL}/medical/scanReports?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    const userId = getUserId();
    
    if (!userId) {
      console.warn('User ID not found, cannot create report');
      return { success: false };
    }
    
    const reportWithUserId = {
      ...reportData,
      userId
    };
    
    const response = await fetch(`${API_URL}/medical/scanReports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(reportWithUserId)
    });

    if (!response.ok) {
      throw new Error(`Failed to create report: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating medical report:', error);
    return { 
      success: false, 
      message: error.message
    };
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
