import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthLayout from './components/AuthComponents/AuthLayout'
import LayoutWithSidebar from './components/LayoutWithSidebar/LayoutWithSidebar';
import Homepage from './components/Homepage/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import AchievementsPage from './components/Achievements/AchievementsPage';
function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>

          {/* protected routes ( token required ) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LayoutWithSidebar><Homepage /></LayoutWithSidebar>} />
            <Route path="/achievements-weekly" element={<LayoutWithSidebar><AchievementsPage type="Weekly" /></LayoutWithSidebar>} />
            <Route path="/achievements-monthly" element={<LayoutWithSidebar><AchievementsPage type="Monthly" /></LayoutWithSidebar>} />
            <Route path="/achievements-yearly" element={<LayoutWithSidebar><AchievementsPage type="Yearly" /></LayoutWithSidebar>} />
          </Route>

          {/* public routes */}
          <Route path="/auth" element={<AuthLayout />} />

        </Routes>
      </Router>
    </Provider>
  )
}

export default App
