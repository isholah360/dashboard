import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const PAGE_SIZE = 8;

const Tables = ({ data }) => {
  const [users, setUsers] = useState(data || []);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    if (!data) {
      fetch("https://dummyjson.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data.users))
        .catch((error) => console.error(error));
    } else {
      setUsers(data);
    }
  }, [data]);

  const paginatedUsers = users.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  return (
    <div className="">
      <div className="items-start justify-between md:flex"></div>
      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-[#b5b7c0] font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Users Name</th>
              <th className="py-3 pr-6">Company</th>
              <th className="py-3 pr-6">Phone Number</th>
              <th className="py-3 pr-6">Email</th>
              <th className="py-3 pr-6">Country</th>
              <th className="py-3 text-right pr-16">Status</th>
            </tr>
          </thead>
          <tbody className="text-[#292d32] font-medium divide-y">
            {paginatedUsers.map((item, id) => (
              <tr key={id}>
                <td className="pr-6 py-4 whitespace-nowrap">{item.username}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.role}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.phone}</td>
                <td className="pr-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  {item.address.country}
                </td>
                <td className="text-center whitespace-nowrap">
                  <span
                    className={`px-8 py-2 rounded-md font-semibold text-xs ${
                      item.status === "Active"
                        ? "text-[#008767] font-bold bg-[#16c098]/50 border border-[#008767]"
                        : "text-[#df0404] bg-[#ffc5c5] border border-[#df0404]"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Tables;
