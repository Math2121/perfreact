
import { List, ListRowRenderer } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  totalPrice: number;
  addToWishList: (id: number) => void;
}

function SearchResult({
  totalPrice,
  results,
  addToWishList,
}: SearchResultProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} addToWishList={addToWishList} />
      </div>
    );
  };
  return (
    <>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map(product=>{
       return (
         <ProductItem key={product.id} product={product} addToWishList={addToWishList}/> 
       )
     })} */}
    </>
  );
}

export default SearchResult;
/***
 * UseMemo/ useCallback
 * 1. Cálculos pesados
 * 2. Iguadalde referencial  (repassar o valor para outro componente)
 */
