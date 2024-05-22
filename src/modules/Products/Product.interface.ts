export type TinventoryType = {
    quantity: number;
    inStock: boolean;
}

export type TvariantType = {
    type: {
      type: string,
      required: true
    },
    value: {
      type: string,
      required: true
    }
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: object[];
  inventory: TinventoryType, 
}


