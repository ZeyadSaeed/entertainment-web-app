/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Logo from "../common/Logo";

const Header = () => {
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    // ON LOGOUT REMOVE USER TOKEN FROM LOCAL STORAGE LOCAL STORAGE
    localStorage.removeItem("token");
    // NAVIGATE BACK TO LOGIN PAGE
    navigate("/login");
  };
  return (
    <header
      className="bg-semiDarkBlue p-4 flex justify-between w-full md:w-[calc(100%-48px)] z-[100] items-center max-h-[56px] md:max-h-[72px]
      md:rounded-[10px] lg:flex-col lg:w-[96px] lg:max-h-[960px] lg:h-[calc(100vh-64px)] lg:p-[32px] lg:justify-start
      lg:sticky md:mt-[23px] md:ml-[24px] top-[32px] lg:ml-[32px] lg:my-[32px]"
    >
      <Logo classes="w-[25px] h-[20px] md:w-[32px] md:h-[25.6px] lg:mb-[75px]" />

      <nav className="flex gap-[6.2vw] md:gap-8 items-center justify-center lg:flex-col">
        <NavLink to="/" className="navLink">
          <img src="/assets/icon-nav-home.svg" alt="home" />
        </NavLink>

        <NavLink to="/movies" className="navLink">
          <img src="/assets/icon-nav-movies.svg" alt="movies" />
        </NavLink>

        <NavLink to="/tvseries" className="navLink">
          <img src="/assets/icon-nav-tv-series.svg" alt="tv series" />
        </NavLink>

        <NavLink
          to="/bookmarked"
          className="w-[13.54px] md:w-[16.93px] navLink"
        >
          <img src="/assets/icon-nav-bookmark.svg" alt="bookmark" />
        </NavLink>
      </nav>

      <div className="w-[24px] md:w-[32px] lg:w-[41px] rounded-full border border-white lg:mt-auto cursor-pointer relative">
        <img
          src="/assets/image-avatar.png"
          alt="profile avatar"
          onClick={() => setIsAvatarActive((prev) => !prev)}
        />

        <div
          className={`absolute top-14 bg-white text-semiDarkBlue py-2 px-4 rounded-md right-[-11px] lg:right-[-4rem] lg:top-[-4rem] duration-200 origin-bottom ${
            isAvatarActive ? "scale-y-100" : "scale-y-0"
          }`}
        >
          <div className="arrowUp" />
          <button className="flex items-center gap-1" onClick={logout}>
            <BiLogOut />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
