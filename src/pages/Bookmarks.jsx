import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromBookmark } from "../features/quotes/QuoteSlice";
import Navbar from "../components/Navbar";

function Bookmarks() {
  const selectBookmarkedQuotes = useSelector(
    (state) => state?.quotes?.bookmarkedQuotes
  );
  const dispatch = useDispatch();

  const handleDeleteBookmark = (id) => {
    dispatch(removeFromBookmark(id));
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[20px] gap-7 text-xl ">
      <Navbar />
      {selectBookmarkedQuotes?.map((bookmark, index) => {
        return (
          <div
            key={index}
            className=" bg-[#D05252] rounded-[30px] p-[40px] w-[45%] text-center "
          >
            <h3> {bookmark?.content} </h3>
            <div className="flex justify-around w-full items-center mt-6 ">
              <p className=" "> - {bookmark?.author} </p>
              <button onClick={() => handleDeleteBookmark(bookmark?._id)}>
                {" "}
                <MdDelete />{" "}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bookmarks;
