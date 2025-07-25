import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout/MainLayout.tsx'; // Alias verwenden
import Home from '@/pages/Home/Home.tsx';
import About from '@/pages/About/About.tsx';
import Shop from '@/pages/Shop/Shop.tsx';
import ProductDetail from '@/pages/ProductDetail/ProductDetail.tsx';
import Contact from '@/pages/Contact/Contact.tsx';
import NotFound from '@/pages/NotFound/NotFound.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Home ist die Standardroute für / */}
        <Route path="ueber-uns" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetail />} />
        <Route path="kontakt" element={<Contact />} />
        {/* Weitere Routen hier hinzufügen, z.B. /blog, /impressum, /agb */}
        <Route path="*" element={<NotFound />} /> {/* Fallback für 404 */}
      </Route>
    </Routes>
  );
}

export default App;