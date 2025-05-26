
import { useEffect, useState } from 'react';

interface LiveAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearDelay?: number;
}

export function LiveAnnouncer({ message, priority = 'polite', clearDelay = 5000 }: LiveAnnouncerProps) {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      
      if (clearDelay > 0) {
        const timer = setTimeout(() => {
          setAnnouncement('');
        }, clearDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [message, clearDelay]);

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
