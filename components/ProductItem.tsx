import { ReactNode, useState } from "react";
import { memo } from "react";
import dynamic from "next/dynamic";
import lodash from 'lodash'
import { AddoToWishListProps } from "./AddProductToWishList";
const AddProductToWishList = dynamic<AddoToWishListProps>(
  () => {
    return import("./AddProductToWishList");
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);
interface ProductItemProps {
  product: { id: number; price: number; title: string; priceFormatted: string };
  addToWishList: (id: number) => void;
}

function ProductItemComponent({ product, addToWishList }: ProductItemProps) {
  const [isAddToWishList, setIsAddingToWishList] = useState(false);
  return (
    <>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adiconar aos favoritos
      </button>
      {isAddToWishList && (
        <AddProductToWishList
          onAddToWishList={() => addToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </>
  );
}
/* *
*Memo => 
* 1. Pure Functional Components 
2. Components que rendereizam demais
3.Re-renders with same props
4.Medium to big size
*/
export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
