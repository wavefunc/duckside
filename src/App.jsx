// ----- 冠樺 ----- //

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ManageRoutes from './Routes/ManageRoutes.jsx';
import MemberRoutes from './Routes/MemberRoutes.jsx';
import GameRoutes from './Routes/GameRoutes.jsx';
import AboutRoutes from './Routes/AboutRoutes.jsx';

import Layout from './pages/Layout.jsx';
import Homepage from './pages/Homepage.jsx';
import ToolsChart_pie from './pages/ToolsChart_pie.jsx';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Homepage />} />
               {ManageRoutes}
               {MemberRoutes}
               {GameRoutes}
               {AboutRoutes}
               <Route path='tools/chart_pie' element={<ToolsChart_pie />} />
            </Route>
            <Route
               path="*"
               element={
                  <main style={{ padding: "1rem" }}>
                     <p>There's nothing here!</p>
                  </main>
               }
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
