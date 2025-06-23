export type Category = {
    id: number;
    name: string;
    slug: string;
}

export type Slider = {
    url: string;
    image: {
        url: string;
    }
}

export type Color = {
    id: number;
    name: string;
}

export type Size = {
    id: number;
    name: string;
}

export type ProductImages = {
    id: number;
    url: string;
}

export type Product = {
    id: number;
    name: string;
    desc: string;
    slug: string;
    mrp: number;
    sellingPrice: number;
    isTop: boolean;
    recent: boolean;
    images: ProductImages[];
    category: Category;
    colors: Color[];
    sizes: Size[];
}