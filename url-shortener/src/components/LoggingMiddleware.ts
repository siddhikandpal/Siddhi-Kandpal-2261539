import axios from 'axios';

const log = async (stack: 'frontend', level: 'debug' | 'info' | 'warn' | 'error' | 'fatal', packageName: string, message: string) => {
  try {
    const token = localStorage.getItem('authToken');
    
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: packageName,
      message
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`[${level}] ${packageName}: ${message}`);
  } catch (error) {
    console.error('Failed to send log:', error);
  }
};

export default log;