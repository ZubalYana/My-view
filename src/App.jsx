import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthLayout from './components/AuthComponents/AuthLayout'
import LayoutWithSidebar from './components/LayoutWithSidebar/LayoutWithSidebar';
import Homepage from './components/Homepage/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>

        {/* protected routes ( token required ) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LayoutWithSidebar><Homepage /></LayoutWithSidebar>} />
        </Route>

        {/* public routes */}
        <Route path="/auth" element={<AuthLayout />} />
        
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
