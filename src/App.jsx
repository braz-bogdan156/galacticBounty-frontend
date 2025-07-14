import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { BountyProvider } from './providers/BountyProvider';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PublicBounties from './pages/PublicBounties/PublicBounties';
import CreateBounty from './pages/CreateBounty/CreateBounty';
import MyBounties from './pages/MyBounties/MyBounties';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import PrivateRoute from './routes/PrivateRoute';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BountyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicBounties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={<PrivateRoute><CreateBounty /></PrivateRoute>}
          />
          <Route
            path="/my-bounties"
            element={<PrivateRoute><MyBounties /></PrivateRoute>}
          />
          <Route
            path="/admin"
            element={<PrivateRoute roles={['admin']}><AdminPanel /></PrivateRoute>}
          />
        </Routes>
      </Router>
      </BountyProvider>
    </AuthProvider>
  );
}

export default App;
