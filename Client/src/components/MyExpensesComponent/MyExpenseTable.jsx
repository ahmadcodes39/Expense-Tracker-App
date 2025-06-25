import React, { useEffect, useState } from "react";
import { getAllExpenses } from "../../utils/ApiRoutes";
import toast from "react-hot-toast";

const MyExpenseTable = ({ query }) => {
  const [data, setData] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const getData = async () => {
    try {
      if (!userId) {
        toast.error("User ID not found");
        return;
      }
      const response = await getAllExpenses(userId);
      if (response && response.data) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // toast.error("An error occurred while fetching expenses");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const filteredData =
    query === "all"
      ? data
      : data.filter(
          (item) => item.category.toLowerCase() === query.toLowerCase()
        );

  return (
    <div className="flex flex-col gap-4">
      <table className="cursor-default min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left text-sm text-gray-700">Name</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">
              Amount
            </th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">Date</th>
            <th className="py-2 px-4 text-left text-sm text-gray-700">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-all duration-200`}
              >
                <td className="py-3 px-4 text-sm text-gray-900">
                  {item.title}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  ${item.amount}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {new Date(item.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 cursor-pointer">
                  {item.category}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyExpenseTable;
