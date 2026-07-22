import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Package, FileText, Settings } from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col shadow-xl">
    <h1 className="text-2xl font-bold text-blue-400 mb-8 border-b border-slate-700 pb-4">Mini ERP</h1>
    <nav className="flex flex-col gap-2 flex-grow">
      <Link to="/" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"><LayoutDashboard size={20} /> Dashboard</Link>
      <Link to="/customers" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"><Users size={20} /> Customers</Link>
      <Link to="/products" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"><Package size={20} /> Inventory</Link>
      <Link to="/challans" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"><FileText size={20} /> Billing</Link>
    </nav>
    <div className="mt-auto border-t border-slate-700 pt-4">
      <Link to="/settings" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg transition"><Settings size={20} /> Settings</Link>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="p-8">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500 hover:shadow-md transition">
        <h3 className="text-slate-500 text-sm font-medium">Total Customers</h3>
        <p className="text-3xl font-bold text-slate-800 mt-2">124</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-green-500 hover:shadow-md transition">
        <h3 className="text-slate-500 text-sm font-medium">Total Products</h3>
        <p className="text-3xl font-bold text-slate-800 mt-2">45</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-t-4 border-t-purple-500 hover:shadow-md transition">
        <h3 className="text-slate-500 text-sm font-medium">Active Challans</h3>
        <p className="text-3xl font-bold text-slate-800 mt-2">12</p>
      </div>
    </div>
  </div>
);

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/customers').then(r => r.json()).then(setCustomers).catch(console.error);
  }, []);
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Customers CRM</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Business</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c: any) => (
              <tr key={c.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-800">{c.name}</td>
                <td className="p-4 text-slate-600">{c.businessName}</td>
                <td className="p-4 text-slate-600">{c.email}</td>
                <td className="p-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{c.status}</span></td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading or no customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts).catch(console.error);
  }, []);
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Inventory</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="p-4">Item Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-medium text-slate-800">{p.name}</td>
                <td className="p-4 text-slate-600">{p.sku}</td>
                <td className="p-4 text-slate-600 font-medium">{p.stock}</td>
                <td className="p-4 text-slate-600">${p.unitPrice}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading or no products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MainLayout = () => (
  <div className="flex bg-slate-50 min-h-screen font-sans">
    <Sidebar />
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-8 shadow-sm shrink-0">
        <span className="text-slate-500">Welcome back, Admin!</span>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Mini ERP</h1>
        <p className="text-slate-500">Sign in to your account</p>
      </div>
      <form 
        className="space-y-6" 
        onSubmit={(e) => { 
          e.preventDefault(); 
          window.location.href = '/'; 
        }}
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input type="email" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="admin@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <input type="password" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="••••••••" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/30">
          Sign In
        </button>
      </form>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/challans" element={<div className="p-8"><h2 className="text-3xl font-bold mb-4">Billing / Challans</h2><p>Challans list coming soon...</p></div>} />
          <Route path="/settings" element={<div className="p-8"><h2 className="text-3xl font-bold mb-4">Settings</h2><p>System settings here.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
