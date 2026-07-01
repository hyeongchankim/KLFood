import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import B2BMainPage from './pages/B2BMainPage';
import B2CMainPage from './pages/B2CMainPage';
import MealPlanPage from './pages/MealPlanPage';
import MyPage from './pages/MyPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<B2BMainPage />} />
            <Route path="/cham-banchan" element={<B2CMainPage />} />
            <Route path="/cham-banchan/meal-plan" element={<MealPlanPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
