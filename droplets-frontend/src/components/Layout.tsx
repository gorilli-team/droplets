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
    <div className="flex flex-row h-screen">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right Column */}
      <div className="flex flex-col flex-grow">
        {/* Header with fixed height */}
        <div className="h-20">
          <Header />
        </div>

        {/* Main content that grows to fill available space */}
        <div className="flex-grow">
          <Container>{children}</Container>
        </div>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </div>
  );
};
