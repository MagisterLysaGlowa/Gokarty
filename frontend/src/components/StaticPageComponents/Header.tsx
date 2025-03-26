import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  classNames?: string;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  classNames = "",
  ...rest
}) => {
  return (
    <header className={`p-3 w-full ${classNames}`} {...rest}>
      {children}
    </header>
  );
};
