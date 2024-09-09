import { useState, useEffect } from 'react';
import PasswordStrengthCheckerProps from '../Interfaces/Interfaces.ts';

const PasswordStrengthChecker: React.FC<PasswordStrengthCheckerProps> = ({ password }) => {
    const [passwordStrength, setPasswordStrength] = useState<string>('Empty');
  
    const checkPasswordStrength = (password: string) => {
        let strength = 0;
    
        const lengthRegex = /.{6,}/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*]/;
    
        if (lengthRegex.test(password)) strength++;
        if (uppercaseRegex.test(password)) strength++;
        if (lowercaseRegex.test(password)) strength++;
        if (numberRegex.test(password)) strength++;
        if (specialCharRegex.test(password)) strength++;
    
        switch (strength) {
            case 0:
            setPasswordStrength('Empty');
            break;
            case 1:
            setPasswordStrength('Very Weak');
            break;
            case 2:
            setPasswordStrength('Weak');
            break;
            case 3:
            setPasswordStrength('Medium');
            break;
            case 4:
            setPasswordStrength('Strong');
            break;
            case 5:
            setPasswordStrength('Very Strong');
            break;
            default:
            setPasswordStrength('Very Weak');
        }
    };
  
    useEffect(() => {
      checkPasswordStrength(password);
    }, [password]);
  
    return (
    <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
            <span className='text-white text-sm'>Password strength</span>
            <span
                className={`text-${
                passwordStrength === 'Empty'
                    ? 'gray'
                    : passwordStrength === 'Very Weak'
                    ? 'red'
                    : passwordStrength === 'Weak'
                    ? 'orange'
                    : passwordStrength === 'Medium'
                    ? 'yellow'
                    : passwordStrength === 'Strong'
                    ? 'green'
                    : 'purple'
                }-400 text-sm`}
            >
            {passwordStrength}
            </span>
        </div>
        <div className="relative w-full h-2 bg-gray-700 rounded">
            <div className={`absolute h-2 rounded ${
                passwordStrength === 'Empty'
                ? 'bg-gray-400 w-0'
                : passwordStrength === 'Very Weak'
                ? 'bg-red-400 w-1/5'
                : passwordStrength === 'Weak'
                ? 'bg-orange-400 w-2/5'
                : passwordStrength === 'Medium'
                ? 'bg-yellow-400 w-3/5'
                : passwordStrength === 'Strong'
                ? 'bg-green-400 w-4/5'
                : 'bg-purple-400 w-full'
            }`} />
        </div>

        <ul className="mt-2 mb-4 text-sm space-y-1">
            <li className={`${/.{6,}/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                {/.{6,}/.test(password) ? '✔' : '✖'} At least 6 characters
            </li>
            <li className={`${/[A-Z]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                {/[A-Z]/.test(password) ? '✔' : '✖'} Contains uppercase letter
            </li>
            <li className={`${/[a-z]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                {/[a-z]/.test(password) ? '✔' : '✖'} Contains lowercase letter
            </li>
            <li className={`${/\d/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                {/\d/.test(password) ? '✔' : '✖'} Contains a number
            </li>
            <li className={`${/[!@#$%^&*]/.test(password) ? 'text-green-400' : 'text-red-400'}`}>
                {/[!@#$%^&*]/.test(password) ? '✔' : '✖'} Contains special character
            </li>
        </ul>
    </div>
    );
};

export default PasswordStrengthChecker;