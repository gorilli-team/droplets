// components/Layout.tsx
import { ReactNode } from "react";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar/index";
import { Container } from "./Container";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};
