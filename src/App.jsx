import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryIndex from "./pages/CategoryIndex";
import CollectionPage from "./pages/CollectionPage";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col mx-auto px-6 md:px-12 bg-[#FAFAFA]">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryIndex />} />
            <Route path="/collection/:category" element={<CollectionPage />} />
            <Route path="/item/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
