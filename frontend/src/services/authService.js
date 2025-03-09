const API_URL = 'http://localhost:4000/api/auth';

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  return data;
};

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  
  return data;
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    // Check if response is ok and content-type is application/json
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      // If not JSON or status is not OK, throw error
      throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    // For demo/development purposes, return mock data if API is unavailable
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Using mock data for doctor info');
      return {
        firstName: "Manas",
        lastName: "Kumar",
        title: "MD",
        specialty: "Radiology",
        practiceName: "Civil Hospital",
        expertise: ["CT Scans", "MRI", "X-Ray"],
        appointments: 27
      };
    }
    throw error;
  }
};