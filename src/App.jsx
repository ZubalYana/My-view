import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthLayout from './components/AuthComponents/AuthLayout';
import LayoutWithSidebar from './components/LayoutWithSidebar/LayoutWithSidebar';
import Homepage from './components/Homepage/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import AchievementsPage from './components/Achievements/AchievementsPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Protected Routes (Token Required) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<LayoutWithSidebar><Homepage /></LayoutWithSidebar>} />
              <Route path="/achievements-weekly" element={<LayoutWithSidebar><AchievementsPage type="Weekly" /></LayoutWithSidebar>} />
              <Route path="/achievements-monthly" element={<LayoutWithSidebar><AchievementsPage type="Monthly" /></LayoutWithSidebar>} />
              <Route path="/achievements-yearly" element={<LayoutWithSidebar><AchievementsPage type="Yearly" /></LayoutWithSidebar>} />
            </Route>

            {/* Public Routes */}
            <Route path="/auth" element={<AuthLayout />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
