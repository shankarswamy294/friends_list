import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div className="App">
      <FriendsList />
      <ToastContainer />
    </div>
  );
}

export default App;
