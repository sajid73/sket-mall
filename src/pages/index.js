import Head from "next/head";
import Banner from "../Components/Banner";
import Header from "../Components/Header";
import ProductFeed from "../Components/ProductFeed";

export default function Home({products}) {
  return (
    <div className ='bg-gray-100'>
      <Head>
        <title>Sket-Mall</title>
      </Head>
      
      <Header />

      <main className ='max-w-screen-2xl mx-auto'>
          <Banner/>

        <ProductFeed products = {products}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(contex) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res)=> res.json()
  );
  return{
    props:{
      products,
    },
  }

}

// GET >>> https://fakestoreapi.com/products