import { fetchFCMToken, subscribeToTopic } from '../services/notificationService';
import { useEffect, useState } from 'react';


const useFirebaseNotifications = () => {
    const [fcmToken, setFcmToken] = useState(null);
    useEffect(() => {
      const getToken = async () => {
        const token = await fetchFCMToken(setFcmToken);
        if (token) {
          await subscribeToTopic(token);
        }
      };
  
      getToken();
  }, []);
  return fcmToken;
};

export default useFirebaseNotifications;
