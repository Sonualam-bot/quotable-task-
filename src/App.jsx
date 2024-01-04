import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-[#161E6C] to-[#5E2AB2]  w-full min-h-[100vh] text-white ">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
