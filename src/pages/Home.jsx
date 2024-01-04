import { useSelector, useDispatch } from "react-redux";
import {
  fetchRandomQuotes,
  fetchTagsList,
} from "../features/quotes/QuoteSlice";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

function Home() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotes);
  const status = useSelector((state) => state.quotes.status);
  const tags = useSelector((state) => state.quotes.tags);
  const [bookmark, setBookmark] = useState(false);

  const tagsForDropdown = tags
    ?.reduce((acc, curr) => {
      if (acc.includes(curr.name)) {
        return acc;
      } else {
        return [...acc, curr.name];
      }
    }, [])
    .sort((a, b) => b.name - a.name);

  const handleTagSelect = (selectedTag) => {
    dispatch(fetchRandomQuotes(selectedTag));
  };

  const handleNextQuote = () => {
    dispatch(fetchRandomQuotes());
  };

  const quoteArray = Array.isArray(quotes) ? quotes : [quotes];

  const handleAddToBookmark = () => {
    setBookmark(true);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRandomQuotes());
      dispatch(fetchTagsList());
    }
  }, [status, dispatch]);

  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-[#161E6C] to-[#5E2AB2] text-white text-3xl
"
    >
      <Navbar />

      <div className="flex items-center justify-center flex-col gap-7">
        <div className=" bg-[#D05252] w-[773px]  h-[263px]  rounded-[30px] p-[40px] ">
          {status === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            quoteArray?.map((quote, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full flex flex-col  items-center gap-8 "
                >
                  <h3> {quote?.content} </h3>
                  <div className="flex justify-around w-full items-center mt-6 ">
                    <p className=" "> - {quote?.author} </p>
                    <button onClick={handleAddToBookmark}>
                      {" "}
                      {bookmark ? <FaBookmark /> : <CiBookmark />}{" "}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-col gap-5 ">
          <select
            onChange={(e) => handleTagSelect(e.target.value)}
            className="text-[black] text-xl px-5 py-2 rounded-md m-auto "
          >
            <option>Choose tags</option>
            {tagsForDropdown?.map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {" "}
                  {tag}{" "}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleNextQuote}
            className=" text-[25px] w-[200px] h-[45px]  text-white px-3 py-1 rounded-[30px] bg-[#009C51] text-center "
          >
            {" "}
            Next Quote{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
