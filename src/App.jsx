import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthLayout from './components/AuthComponents/AuthLayout'
import LayoutWithSidebar from './components/LayoutWithSidebar/LayoutWithSidebar';
import Homepage from './components/Homepage/Homepage';
function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/" element={<LayoutWithSidebar><Homepage /></LayoutWithSidebar>} />
        
        <Route path="/auth" element={<AuthLayout />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
