import React from "react";
import * as Bulma from "react-bulma-components";
import { NavLink } from "react-router-dom";

export interface NavbarItem {
  to: string;
  content: React.ReactNode;
}

export interface NavbarProps {
  items: NavbarItem[];
}

export const Navbar = ({ items = [] }: NavbarProps) => {
  return (
    <Bulma.Menu renderAs="nav">
      <Bulma.Menu.List title="MENU">
        {items.map((item, index) => (
          <li key={item.to + index}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.content}
            </NavLink>
          </li>
        ))}
      </Bulma.Menu.List>
    </Bulma.Menu>
  );
};
