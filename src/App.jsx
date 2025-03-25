import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthLayout from './components/AuthComponents/AuthLayout'
function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/auth" element={<AuthLayout />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
