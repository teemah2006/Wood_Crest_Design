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
    createdAt?: {
        seconds: number;
        nanoseconds: number;
    };
    isSignature?: boolean;
}

export interface ProductDisplayProps {
    product: ProductProps;
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
    onSuccess?: () => void;
    isSignature?: boolean
}
export interface ProductCardProps {
    product: ProductProps;
    onDelete: (id: string) => void;
    onEdit?: (product: ProductProps) => void;
    onEditSuccess?: () => void;
}

export interface ProductListProps {
    user: string;
    query?: string;
    categoryFilter?: string;
    subCategoryFilter?: string[];
    sortBy?: 'price ascending' | 'price descending' | 'new' | 'name';
    priceRange?: number[]
}

export interface CartItem {
  product: ProductProps;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  total: () => number;
  totalQuantity: () => number;
}

export interface CategoryPageProps {
  category: string
}

export interface BlogPostProps{
    title: string;
    brief: string;
    content: string;
    category:string;
    featuredImage: string;
    date: string;
}

export interface BlogCardProps{
    post: BlogPostProps
}

export interface ModalProps{
    post: BlogPostProps;
    open?: boolean;
    onClose: (a: boolean)=>void;
}