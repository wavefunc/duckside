// ----- 冠樺 ----- //

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout.jsx';
import About_site from './pages/About_site.jsx';
import About_team from './pages/About_team.jsx';
import GameDaily from './pages/GameDaily.jsx';
import GameRoom from './pages/GameRoom.jsx';
import Homepage from './pages/Homepage.jsx';
import ManageAsset from './pages/ManageAsset.jsx';
import ManageCheck from './pages/ManageCheck.jsx';
import ManageDashboard from './pages/ManageDashboard.jsx';
import ManagePlan from './pages/ManagePlan.jsx';
import ManageTransaction from './pages/ManageTransaction.jsx';
import MemberChangePass from './pages/MemberChangePass.jsx';
import MemberInfo from './pages/MemberInfo.jsx';
import MemberLogin from './pages/MemberLogin.jsx';
import MemberRegister from './pages/MemberRegister.jsx';
import ToolsChart_pie from './pages/ToolsChart_pie.jsx';


function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<Homepage />} />
               <Route path='about_site' element={<About_site />} />
               <Route path='about_team' element={<About_team />} />
               <Route path='game/daily' element={<GameDaily />} />
               <Route path='game/room' element={<GameRoom />} />
               <Route path='manage/asset' element={<ManageAsset />} />
               <Route path='manage/check' element={<ManageCheck />} />
               <Route path='manage/dashboard' element={<ManageDashboard />} />
               <Route path='manage/plan' element={<ManagePlan />} />
               <Route path='manage/transaction' element={<ManageTransaction />} />
               <Route path='member/changePass' element={<MemberChangePass />} />
               <Route path='member/info' element={<MemberInfo />} />
               <Route path='member/login' element={<MemberLogin />} />
               <Route path='member/register' element={<MemberRegister />} />
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
