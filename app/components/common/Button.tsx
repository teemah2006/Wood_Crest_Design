import { type ButtonProps } from '@/interfaces';

const Button:React.FC<ButtonProps> = ({size, shape, dis, text, type, color, onClick}) => {
    const sizeClass = size === 'small' ? 'btn-small' : size === 'large' ? 'btn-large' : 'btn-medium';
    const colorClass = color === 'gray' ? 'bg-[#E6E6E6] text-[#2C2C2C]' : 'bg-[#2C2C2C] text-[#F5F5F5] hover:bg-[#1A1A1A]';
    return(
        <button type={type} className={`btn ${sizeClass} ${shape} ${colorClass} cursor-pointer px-4 py-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed quattrocento-regular`} 
        disabled={dis} onClick={()=>onClick}>{text}</button>
    )
}

export default Button;