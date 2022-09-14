import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./presentation/components";
import * as Pages from "./presentation/pages";

const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Pages.Products />} />
          <Route path="/produtos" element={<Pages.Products />} />
          <Route path="/relatorio" element={<Pages.Report />} />
          <Route path="/comparar-sistemas" element={<Pages.CompareSystems />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
