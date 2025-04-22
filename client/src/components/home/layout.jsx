import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { LogOutIcon } from "lucide-react";

function HomeLayout() {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isAddDataPage = location.pathname === "/home/adddata";

  // Handlers for inputs
  const handleProductChange = (event) => setProduct(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);

  const handleNextpage = () => {
    if (!product || !category || !date) {
      toast.error("Please select all fields before proceeding.");
      return;
    }

    navigate("/protected/home/adddata", {
      state: { product, category, date }, // Pass data to AddData page
    });


    if (location.pathname.includes("/home/adddata")) {
      navigate("/home/displaydata", {
        state: { product, category, date }, // Pass data to AddData page
      });
    }
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/auth/login")
    toast.success('Logout Successful')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md py-4 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-center gap-4 md:gap-6">
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="product" className="text-sm font-medium text-gray-700">Activity Type</label>
          <select
            id="product"
            value={product}
            onChange={handleProductChange}
            disabled={isAddDataPage}
            className={`mt-1 py-2 px-3 text-sm border ${isAddDataPage ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select Activity</option>
            <option value="Service">Service</option>
            <option value="AMC">AMC</option>
            <option value="Trail">Trail</option>
            <option value="Training">Training</option>
            <option value="Meeting">Meeting</option>
            <option value="Demo">Demo</option>
            <option value="Installation">Installation</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">Business Type</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            disabled={isAddDataPage}
            className={`mt-1 py-2 px-3 text-sm border ${isAddDataPage ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select Type</option>
            <option value="E&M">E&M</option>
            <option value="A&M">A&M</option>
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">Select Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={handleDateChange}
            disabled={isAddDataPage}
            className={`mt-1 py-2 px-3 text-sm border ${isAddDataPage ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          />
        </div>

        <div className="w-full md:w-auto flex gap-5 pt-6">
          <Button
            onClick={handleNextpage}
            disabled={isAddDataPage}
            className={`w-full md:w-auto py-2 px-6 text-sm font-medium text-white ${isAddDataPage ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              } rounded-md shadow-md transition duration-200`}
          >
            {isAddDataPage ? "Disabled" : "Next Page"}
          </Button>
          <button onClick={handleLogout}><LogOutIcon /></button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
