import React, { useEffect } from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  isVisible,
  onClose,
  type = 'success',
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <span>{message}</span>
      <button className="notification-close" onClick={onClose}>✕</button>
    </div>
  );
};
