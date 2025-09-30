export interface ButtonProps{
    size?: 'small' | 'medium' | 'large';
    shape?: 'rounded-sm' | 'rounded-md' |'rounded-full';
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    text?: string;
    dis?: boolean;
    color?: 'black' | 'gray';
}

export interface ProductProps {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    subCategory?: string;
    images: string[];
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

export interface ProductInputProps {
    id?: string;
    name?: string;
    price?: number;
    description?: string;
    category?: string;
    subCategory?: string;
    images?: string[];
    createdAt?: {
        seconds: number;
        nanoseconds: number;
    };
}
export interface ProductCardProps {
    product: ProductProps;
    onDelete: (id: string) => void;
    onEdit?: (product: ProductProps) => void;
}