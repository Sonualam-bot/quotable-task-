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

  const tagsFroDropdown = tags
    ?.reduce((acc, curr) => {
      if (acc.includes(curr.name)) {
        return acc;
      } else {
        return [...acc, curr.name];
      }
    }, [])
    .sort((a, b) => b.name - a.name);

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
            {quotes?.map((quote) => {
              return (
                <div key={quote?._id}>
                  <h3> {quote?.content} </h3>
                  <p>{quote?.author} </p>
                </div>
              );
            })}
          </div>
          <div>
            <select>
              <option>Choose tags</option>
              {tagsFroDropdown?.map((tag, index) => {
                return <option key={index}> {tag} </option>;
              })}
            </select>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
