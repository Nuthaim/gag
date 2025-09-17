import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from './feature/home/home.screen';
import { MenScreen } from './feature/men/men.screen';
import { ProductDetailScreen } from './feature/men/productDetail.screen';
import { PreOrderScreen } from './feature/preOrder/preOrder.screen';
import { PreOrderDetailScreen } from './feature/preOrder/preOrderDetail.screen';
import { WholesaleScreen } from './feature/wholesale/wholesale.screen';
import { WholesaleDetailScreen } from './feature/wholesale/wholesaleDetail.screen';
import { FavoritesScreen } from './feature/favorites/favorites.screen';
import { WorldOfGagScreen } from './feature/worldOfGag/worldOfGag.screen';
import { NewArrivalsScreen } from './feature/newArrivals/newArrivals.screen';
import { NewArrivalDetailView } from './feature/newArrivals/newArrivalDetail.view';
import { FavoritesProvider } from './context/FavoritesContext';
import { UserProvider } from './context/UserContext';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <UserProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/men" element={<MenScreen />} />
              <Route path="/men/product/:id" element={<ProductDetailScreen />} />
              <Route path="/pre-order" element={<PreOrderScreen />} />
              <Route path="/pre-order/product/:id" element={<PreOrderDetailScreen />} />
              <Route path="/wholesale" element={<WholesaleScreen />} />
              <Route path="/wholesale/product/:id" element={<WholesaleDetailScreen />} />
              <Route path="/favorites" element={<FavoritesScreen />} />
              <Route path="/world-of-gag" element={<WorldOfGagScreen />} />
              <Route path="/new-arrivals" element={<NewArrivalsScreen />} />
              <Route path="/new-arrivals/product/:id" element={<NewArrivalDetailView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </FavoritesProvider>
  );
}

export default App
