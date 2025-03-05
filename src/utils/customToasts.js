import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useCustomToast() {
  const { theme } = useContext(ThemeContext);

  const showToast = (type, message) => {
    const style = {
      background: theme[type], // success, error, warning, info
      color: theme.textPrimary,
    };

    switch (type) {
      case 'success':
        toast.success(message, { style });
        break;
      case 'error':
        toast.error(message, { style });
        break;
      case 'warning':
        toast.warning(message, { style });
        break;
      case 'info':
        toast.info(message, { style });
        break;
      default:
        toast(message, { style });
    }
  };

  return showToast;
}
