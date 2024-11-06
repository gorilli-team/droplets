// components/Container.tsx
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="flex-1 flex text-black bg-white">{children}</div>;
};
