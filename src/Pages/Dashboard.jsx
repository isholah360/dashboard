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
import { useEffect, useState } from "react";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");


  const fetchUsers = async () => {
    const res = await fetch(`https://dummyjson.com/users`);
    const data = await res.json();
    setSearchResults(data.users || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFilterTerm(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

 
  const getFilteredResults = () => {
    if (!searchTerm && !filterTerm) {
   
      return searchResults;
    }
    
    return searchResults.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterTerm ? user.role === filterTerm : true; 
      return matchesSearch && matchesFilter;
    });
  };

  const filteredResults = getFilteredResults();
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

              <div className="w-[180px] relative p-2 flex flex-row bg-[#f9fbff] rounded-lg items-center  ">
                <p className="text-sm w-[200px]">Sort by:</p>
                <select onChange={handleChange} value={filterTerm} className="ml-2 border-none outline-none bg-[#f9fbff] font-bold">
                  <option value="">All</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>

          <Tables data={filteredResults} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
