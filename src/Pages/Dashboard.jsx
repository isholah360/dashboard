import { TbUserSquareRounded } from "react-icons/tb";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import help from "../assets/images/help.png";

// import Wave from "../assets/images/wave.png";
import { CiSearch } from "react-icons/ci";
import Header from "../components/Header";
// import Stats1 from "../assets/images/Stats1.png";

// import Stats2 from "../assets/images/Stats2.png";
// import Stats3 from "../assets/images/Stats3.png";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import Status from "../components/Status";
import Tables from "../components/Tables";
// import Pagination from "../components/Pagination";
import { useState } from "react";

function Dashboard() {
 const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term) {
      fetch(`https://dummyjson.com/users/search?q=${term}`)
        .then(res => res.json())
        .then(data => setSearchResults(data.users || []));
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<TbUserSquareRounded size={22} />}
            text="Users"
            active
          />
          <SidebarItem icon={<img src={help} size={20} />} text="Help" />
        </Sidebar>
      </div>
      <div className="lg:p-[41px] p-2 w-full bg-[#f9fbff]">
        <Header />
        <Status />

        <div className="w-full bg-white rounded-3xl  lg:p-12 p-2  mt-8">
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <div>
              <p className="text-[22px] font-semibold">All Users</p>
              <p className="text-[#16c098]">Active Members</p>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-8">
              <div className="w-[230px] relative p-2 flex flex-row bg-[#f9fbff] rounded-lg items-center gap-4 ">
                <CiSearch className="absolute text-2xl" />
                <input
                   value={searchTerm}
                   onChange={handleSearch}
                   placeholder="Search "
                   className="ml-8 border-none outline-none bg-[#f9fbff]"
                />
              </div>

              <div className="w-[160px] relative p-2 flex flex-row bg-[#f9fbff] rounded-lg items-center  ">
                <p className="text-sm w-[50px]">Sort by :</p>
                <select className="ml-2 border-none outline-none bg-[#f9fbff] font-bold">
                  <option>admin</option>
                  <option>moderator</option>
                  <option>user</option>
                </select>
              </div>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <Tables data={searchResults} />
          ) : (
            <Tables />
          )}
            {/* <Tables /> */}
          {/* <Pagination /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
