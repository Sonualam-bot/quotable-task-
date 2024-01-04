import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center py-6 px-[50px] font-Poppins ">
      <NavLink
        className="w-[80px] h-[39px] font-[700] text-[26px] leading-[39px] "
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="w-[141px] h-[39px] font-[300] text-[26px] leading-[39px] "
        to="/bookmarks"
      >
        Bookmarks
      </NavLink>
    </div>
  );
}

export default Navbar;
