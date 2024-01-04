import { useSelector, useDispatch } from "react-redux";
import {
  fetchRandomQuotes,
  fetchTagsList,
} from "../features/quotes/QuoteSlice";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotes);
  const status = useSelector((state) => state.quotes.status);
  const tags = useSelector((state) => state.quotes.tags);

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

  const quoteArray = Array.isArray(quotes) ? quotes : [quotes];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRandomQuotes());
      dispatch(fetchTagsList());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            {quoteArray?.map((quote, index) => {
              return (
                <div key={index}>
                  <h3> {quote?.content} </h3>
                  <p>{quote?.author} </p>
                </div>
              );
            })}
          </div>
          <div>
            <select onChange={(e) => handleTagSelect(e.target.value)}>
              <option>Choose tags</option>
              {tagsForDropdown?.map((tag) => {
                return <option key={tag}> {tag} </option>;
              })}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
