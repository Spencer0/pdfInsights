// components/common/Button.tsx
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  to, 
  onClick, 
  children, 
  variant = 'primary',
  className = ''
}) => {
  const baseStyles = "px-8 py-3 rounded-md text-lg transition-colors duration-200";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;