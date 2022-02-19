// ----- 冠樺 ----- //

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ManageRoutes from './routes/ManageRoutes.jsx';
import MemberRoutes from './routes/MemberRoutes.jsx';
import GameRoutes from './routes/GameRoutes.jsx';
import AboutRoutes from './routes/AboutRoutes.jsx';

import Layout from './pages/Layout.jsx';
import Homepage from './pages/Homepage.jsx';
import MysqlTest from './components/MysqlTest';
import ToolsChartpie from './pages/ToolsChartpie.jsx';

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
               <Route path='test' element={<MysqlTest />} /> 
               <Route path='tools/chartpie' element={<ToolsChartpie />} />
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
