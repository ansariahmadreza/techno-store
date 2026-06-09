"use client";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ShoppingCartContextProvider from "./context/ShoppingCartContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <ShoppingCartContextProvider>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 grow font-serif min-h-245" dir="rtl" lang="fa">
          {children}
        </main>
        <Footer />
      </div>
    </ShoppingCartContextProvider>
  );
}