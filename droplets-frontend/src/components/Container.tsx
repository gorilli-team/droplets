// components/Container.tsx
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="flex-grow bg-gray-900 min-h-full">{children}</div>;
};
