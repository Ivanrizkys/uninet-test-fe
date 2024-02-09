import NavItem from "@/components/ui/nav-item";
import { useLocation } from "react-router-dom";

function Navbar () {
  const { pathname } = useLocation();
  
  return (
    <div className="fixed top-0 z-10  w-full bg-background/30 backdrop-blur-xl transform-gpu flex items-center justify-between h-16 px-6 md:px-12 border-b">
      <nav>
        <ul className="flex items-center gap-6">
          <NavItem 
            title="Dashboard"
            to="/"
            pathname={pathname}
          />
          <NavItem 
            title="Filter"
            to="/filter"
            pathname={pathname}
          />
        </ul>
      </nav>
      <div className="w-8 h-8 rounded-full bg-slate-500 overflow-hidden"></div>
    </div>
  )
}

export default Navbar;