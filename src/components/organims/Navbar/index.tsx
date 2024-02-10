import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Toast from "@/components/ui/toast";
import NavItem from "@/components/ui/nav-item";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    Cookies.remove("token");
    toast.custom(() => (
      <Toast variant="success" message="Log-Out successfully!" />
    ));
    navigate("/auth/login");
  };

  return (
    <div className="fixed top-0 z-10  w-full bg-background/30 backdrop-blur-xl transform-gpu flex items-center justify-between h-16 px-6 md:px-12 border-b">
      <nav>
        <ul className="flex items-center gap-6">
          <NavItem title="Dashboard" to="/" pathname={pathname} />
          <NavItem title="Filter" to="/filter" pathname={pathname} />
        </ul>
      </nav>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <img
                src="https://source.unsplash.com/random/208×208/?profile"
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              onClick={handleLogOut}
              className="capitalize cursor-pointer"
            >
              <button className="text-destructive">Log-Out</button>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
