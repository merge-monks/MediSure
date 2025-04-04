// Base API URL configuration
const API_BASE_URL = '/api';

// Medical API endpoints
export const getMedicalReports = async () => {
  try {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/medical/scanReports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      credentials: 'include', // Send cookies if using session auth
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching medical reports:', error);
    throw error;
  }
};

// Export other API calls as needed
export const getMedicalReportById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/medical/scanReports/${id}`, {
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  return await response.json();
};

// Get test images for a specific test report
export const getTestImages = async (testId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medical/scanReports/${testId}/images`, {
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
