const API_URL = '/api/auth';

// Session-based user information
let currentUser = null;

export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();
    
    // Store user info in memory but rely on cookies for auth
    currentUser = {
      userId: data.userId || data.result,
      authenticated: true
    };
    
    // Store auth token in localStorage for persistence across page refreshes
    localStorage.setItem('authToken', 'auth-token');
    localStorage.setItem('userId', data.userId || data.result);
    
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
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
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
      
      // Store user info in memory after successful signup
      currentUser = {
        userId: data.result || data.userId,
        authenticated: true
      };
      
      // Also store in localStorage for persistence across page refreshes
      localStorage.setItem('authToken', 'auth-token');
      localStorage.setItem('userId', data.result || data.userId);
      
      return data;
    } else {
      const text = await response.text();
      console.error('Received non-JSON response:', text.substring(0, 100) + '...');
      throw new Error(`Server returned an invalid response (${response.status}). Please try again later.`);
    }
  } catch (error) {
    if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) {
      console.error('JSON parsing error:', error);
      throw new Error('Server returned an invalid response. Please try again later.');
    }
    
    if (!error.message) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  // If we already fetched user, return it
  if (currentUser && currentUser.details) {
    return currentUser.details;
  }

  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
    });
    
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Store the user data in memory
    currentUser = {
      userId: data._id,
      authenticated: true,
      details: data
    };
    
    return data;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    if (import.meta.env.MODE !== 'production') {
      console.warn('Using mock data for doctor info');
      const mockUser = {
        _id: "mockuser123",
        firstName: "Manas",
        lastName: "Kumar",
        title: "MD",
        specialty: "Radiology",
        practiceName: "Civil Hospital",
        expertise: ["CT Scans", "MRI", "X-Ray"],
        appointments: 27
      };
      
      // Store mock data in memory
      currentUser = {
        userId: mockUser._id,
        authenticated: true,
        details: mockUser
      };
      
      return mockUser;
    }
    throw error;
  }
};

export const getUserId = async () => {
  // Try to get current user if we don't have it yet
  if (!currentUser || !currentUser.userId) {
    try {
      const userData = await getCurrentUser();
      return userData._id;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  }
  
  return currentUser.userId;
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    
    // Clear in-memory user data
    currentUser = null;
    
    // Also clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};