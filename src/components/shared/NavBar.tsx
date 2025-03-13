import React from "react";
import { CitySearch } from "./CitySearch";
import { OptionsDropdown } from "./OptionsDropdown";
import GeoLocation from "./GeoLocation";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-card text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center">
            <h1 className="text-2xl font-semibold text-primary hidden sm:flex">
              WEATHER<span className="text-sm ml-1 text-foreground">APP</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <GeoLocation />
          <div className="flex items-center">
            <CitySearch />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <OptionsDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
