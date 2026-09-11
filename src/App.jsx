import { Route, Routes } from "react-router-dom";
import RocketsPage from "./pages/RocketsPage";
import RocketDetailPage from "./pages/RocketDetailPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RocketsPage />} />
        <Route path="/:id" element={<RocketDetailPage />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
