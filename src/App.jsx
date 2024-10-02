import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import productsApi from "./services/productsApi";

const App = () => {
  const [productApiLoaded, setProductApiLoaded] = useState(false);

  useEffect(() => {
    const isLoaded = async () => {
      try {
        await productsApi.init();
        setProductApiLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    isLoaded();
  }, []);

  if (!productApiLoaded) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
