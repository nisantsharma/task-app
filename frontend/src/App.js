import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import DataProvider from './context/DataProvider';

import Create from './components/dashboard/Create';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import DeletePage from './pages/DeletePage';
import RegisterPage from './pages/RegisterPage';
import Logout from './components/dashboard/Logout';



function App() {
	return (
		<BrowserRouter>
			<DataProvider>
				<div className="App">
					<Routes>
						<Route path='/' element={<RegisterPage />} />

						<Route path='/dashboard' element={<DashboardPage />} />
						<Route path='/analytics' element={<AnalyticsPage />} />
						<Route path='/settings' element={<SettingsPage />} />

						<Route path='/create' element={<Create />} />
						<Route path='/edit/:taskId' element={<Create />} />
						<Route path='/delete/:taskId' element={<DeletePage />} />
						<Route path='/logout' element={<Logout />} />
					</Routes>
				</div>
			</DataProvider>
		</BrowserRouter>
	);
}

export default App;
