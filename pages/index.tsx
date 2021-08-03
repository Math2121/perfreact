import { FormEvent, useCallback, useState } from "react";
import SearchResult from "../components/SearchResult";
type Results ={
  totalPrice:number;
  data:any[];
}
export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResult] = useState<Results>({
    totalPrice:0,
    data:[]
  });
  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (!search.trim()) {
      return;
    }

    const repsonse = await fetch(`http://localhost:3333/products?q=${search}`);

    const data = await repsonse.json();
    const formater = new Intl.NumberFormat('pt-BR',{
      style:'currency',
      currency:'BRL',
    })
    const products = data.map(product=>{
      return {
        id:product.id,
        title:product.title,
        price:product.price,
        priceFormatted: formater.format(product.price)
      }
    })
    const totalPrice = data.reduce((total,product)=>{
        return total + product.price
      },0)
    
    setResult({totalPrice,data:products});
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name={search}
          id=""
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResult results={results.data} totalPrice={results.totalPrice} addToWishList={addToWishList} />
    </div>
  );
}
