import React, { useEffect, useState } from "react";
import NavbarE from "../components/Navbar";
import Footer from "../components/Footer";
import CardE from "./Card";
import { Carousel } from "@material-tailwind/react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4002/fetch/addfood");
      setData(response.data);
      setOriginalData(response.data); // Store original data for resetting
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (query.trim() === "") {
        // If the query is empty, fetch all data
        const response = await axios.get("http://localhost:4002/fetch/addfood");
        setData(response.data);
      } else {
        // Otherwise, filter data based on query
        const filteredData = originalData.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        setData(filteredData);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call handleSearch immediately on query change
    handleSearch();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black">
      <NavbarE />

      <div className="relative">
        <Carousel swipe={true} infinite={true} className="rounded-none">
        <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-[430px] w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-[430px] w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-[430px] w-full object-cover"
          />
        </Carousel>

        {/* Search Input */}
        <div className="absolute top-1/2 left-1/2 transform px-4 sm:px-2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center justify-center w-full rounded-lg bg-black"
          >
            <input
              className="w-full px-4 py-2 text-white placeholder-gray-400 bg-black border border-gray-300 rounded-l outline-none focus:outline-none rounded-lg"
              type="search"
              name="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Display products or error message */}
      {data.length === 0 && !loading && (
        <div className="text-white text-center mt-4">
          {error || "No products found."}
        </div>
      )}

      {/* Display cards */}
      {data.length > 0 && <CardE data={data} />}

      <Footer />
    </div>
  );
};

export default Home;
