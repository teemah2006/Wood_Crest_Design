import { type ButtonProps } from '@/app/interfaces';

const Button:React.FC<ButtonProps> = ({size, shape, dis, text, type, color, onClick}) => {
    const sizeClass = size === 'small' ? 'btn-small' : size === 'large' ? 'btn-large' : 'btn-medium';
    const colorClass = color === 'gray' ? 'bg-[#E6E6E6] text-[#2C2C2C]' : 'bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]';
    return(
        <button type={type} className={`btn ${sizeClass} ${shape} ${colorClass} cursor-pointer p-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`} 
        disabled={dis} onClick={onClick}>{text}</button>
    )
}

export default Button;