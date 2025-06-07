import React from "react";
import Navbar from "./NavBar";
import { ThemeProvider } from "../providers/theme-provider";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="text-center py-4 bg-background text-foreground">
          <p className="text-sm">Todos los derechos reservados.</p>
          <p className="text-xs">
            Hecho con ❤️ por{" "}
            <a
              className="hover:underline hover:cursor-pointer"
              href="https://www.falmonacidgdev.com/"
              target="_blank"
            >
              Felipe Almonacid
            </a>
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
