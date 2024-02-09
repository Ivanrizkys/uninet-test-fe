import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  title: string;
  pathname: string;
}

const NavItem = ({ to, pathname, title }: NavItemProps) => {
  return (
    <li
      className={`text-sm ${
        pathname === to ? "text-primary" : "text-muted-foreground"
      } hover:text-primary font-medium`}
    >
      <Link to={to}>{title}</Link>
    </li>
  );
};

export default NavItem;
