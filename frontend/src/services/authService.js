const API_URL = '/api/auth';

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();
    
    // Store user ID if available in the response
    if (data && data.userId) {
      localStorage.setItem('userId', data.userId);
    }
    
    return { success: true, token: 'auth-token', userId: data.userId || data.result };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    
    // Check if the response is JSON before trying to parse it
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific HTTP status codes
        switch (response.status) {
          case 400:
            throw new Error(data.error || 'Invalid input data');
          case 409:
            throw new Error(data.error || 'User already exists');
          case 500:
            console.error('Server error details:', data);
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(data.error || `Error: ${response.status}`);
        }
      }
      
      return data;
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 100) + '...');
      throw new Error(`Server returned an invalid response (${response.status}). Please try again later.`);
    }
  } catch (error) {
    // Check if this is a JSON parsing error
    if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) {
      console.error('JSON parsing error:', error);
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    
    // Handle network errors
    if (!error.message) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
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
    
    // Store the user ID in localStorage for later use
    if (data && data._id) {
      localStorage.setItem('userId', data._id);
    }
    
    return data;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    if (import.meta.env.MODE !== 'production') {
      console.warn('Using mock data for doctor info');
      const mockUser = {
        _id: "mockuser123", // Adding a mock ID
        firstName: "Manas",
        lastName: "Kumar",
        title: "MD",
        specialty: "Radiology",
        practiceName: "Civil Hospital",
        expertise: ["CT Scans", "MRI", "X-Ray"],
        appointments: 27
      };
      // Store the mock user ID
      localStorage.setItem('userId', mockUser._id);
      return mockUser;
    }
    throw error;
  }
};

export const getUserId = () => {
  return localStorage.getItem('userId') || null;
};