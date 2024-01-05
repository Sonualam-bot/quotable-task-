import { useSelector, useDispatch } from "react-redux";
import {
  addToBookmark,
  fetchRandomQuotes,
  fetchTagsList,
  removeFromBookmark,
} from "../features/quotes/QuoteSlice";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

function Home() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotes);
  const status = useSelector((state) => state.quotes.status);
  const tags = useSelector((state) => state.quotes.tags);
  const bookmarks = useSelector((state) => state.quotes.bookmarks);

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
  // console.log(quoteArray);

  const handleBookmarkToggle = (quote) => {
    const quoteId = quote._id;
    if (bookmarks.includes(quoteId)) {
      dispatch(removeFromBookmark(quoteId));
    } else {
      dispatch(addToBookmark(quote));
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRandomQuotes());
      dispatch(fetchTagsList());
    }
  }, [status, dispatch]);

  return (
    <div
      className="w-full h-full  text-3xl
"
    >
      <Navbar />

      <div className="flex items-center justify-center flex-col gap-7 w-full h-full">
        <div className=" bg-[#D05252] sm:w-[90%] w-[70%]   rounded-[30px] p-[40px] sm:p-[20px] ">
          {status === "loading" ? (
            <h1>Loading...</h1>
          ) : (
            quoteArray?.map((quote, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full flex flex-col  items-center gap-8 sm:text-[6vw] "
                >
                  <h3> {quote?.content} </h3>
                  <div className="flex justify-around w-full items-center mt-6 ">
                    <p className=" "> - {quote?.author} </p>
                    <button onClick={() => handleBookmarkToggle(quote)}>
                      {bookmarks.includes(quote._id) ? (
                        <FaBookmark />
                      ) : (
                        <CiBookmark />
                      )}
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
