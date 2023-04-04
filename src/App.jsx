import { IndexPage } from "./pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowPage } from "./pages/Show";
import { EditPage } from "./pages/Edit";
import { CreatePage } from "./pages/Create";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/show/:id" element={<ShowPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
