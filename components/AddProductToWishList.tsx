import { ReactNode } from 'react';

export interface AddoToWishListProps {
  onAddToWishList:()=>void;
  onRequestClose:()=>void;
}

function AddProductToWishList({ onAddToWishList,onRequestClose } : AddoToWishListProps) {
  return (
    <>
 <span>
   Deseja adicionar aos favoritos
   <button onClick={onAddToWishList}>Sim</button>
   <button onClick={onRequestClose}>Não</button>
 </span>
    </>
  );
}

export default AddProductToWishList;
