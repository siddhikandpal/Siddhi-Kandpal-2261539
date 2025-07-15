import axios from 'axios';
import log from 'logging-middleware/logger';
const log = async (
  stack: 'frontend' | 'backend',
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal',
  packageName: string,
  message: string
) => {
  try {
    const token = localStorage.getItem('authToken');
    await axios.post(process.env.REACT_APP_LOG_API, {
      stack,
      level,
      package: packageName,
      message,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Logging failed:', error);
  }
};

export default log;