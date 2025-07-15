export const register = async (data: {
  email: string;
  name: string;
  mobileNo: string;
  githubUsername: string;
  rollNo: string;
  accessCode: string;
}) => {
  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/register', data);
    localStorage.setItem('clientID', response.data.clientID);
    localStorage.setItem('clientSecret', response.data.clientSecret);
    await log('frontend', 'info', 'auth', 'Registration successful');
    return response.data;
  } catch (error) {
    await log('frontend', 'error', 'auth', `Registration failed: ${error}`);
    throw error;
  }
};

export const authenticate = async () => {
  try {
    const clientID = localStorage.getItem('clientID');
    const clientSecret = localStorage.getItem('clientSecret');
    
    if (!clientID || !clientSecret) {
      throw new Error('Client credentials not found');
    }
    
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth', {
      clientID,
      clientSecret,
      // Add other required fields from your registration
    });
    
    localStorage.setItem('authToken', response.data.access_token);
    await log('frontend', 'info', 'auth', 'Authentication successful');
    return response.data;
  } catch (error) {
    await log('frontend', 'error', 'auth', `Authentication failed: ${error}`);
    throw error;
  }
};