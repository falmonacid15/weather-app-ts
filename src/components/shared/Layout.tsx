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
      </div>
    </ThemeProvider>
  );
};

export default Layout;
