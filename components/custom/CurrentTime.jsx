import { useEffect, useState } from 'react';

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false };
      const time = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setCurrentTime(time);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return currentTime
}

export default CurrentTime;
