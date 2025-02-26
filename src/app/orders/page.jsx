"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function OrdersPage() {
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([
    { id: 1, origin: 'Arthur KATCHOW', description: 'Café', quantity: '2 Cartons', date: '13/11/2024', status: 'En attente' },
    { id: 2, origin: 'Romain Lato', description: 'Papier A4', quantity: '5 Ramettes', date: '10/11/2024', status: 'Validée' },
    { id: 3, origin: 'Valentin Nirate', description: 'Stylos', quantity: '20 Unités', date: '08/11/2024', status: 'En livraison' },
    { id: 4, origin: 'Hugo POTTIER', description: 'Cartouches', quantity: '3 Unités', date: '05/11/2024', status: 'Livrée' },
  ]);
  const [newOrder, setNewOrder] = useState({ description: '', quantity: '', origin: 'Hugo POTTIER' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrder = (e) => {
    e.preventDefault();
    setOrders([...orders, {
      id: orders.length + 1,
      origin: newOrder.origin,
      description: newOrder.description,
      quantity: newOrder.quantity,
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'En attente'
    }]);
    setNewOrder({ description: '', quantity: '', origin: 'Hugo POTTIER' });
    setShowModal(false);
  };

  const filteredOrders = orders.filter(order => 
    order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch(status) {
      case 'En attente': return 'bg-amber-900/30 text-amber-400';
      case 'Validée': return 'bg-blue-900/30 text-blue-400';
      case 'En livraison': return 'bg-purple-900/30 text-purple-400';
      case 'Livrée': return 'bg-green-900/30 text-green-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Commandes
          </h1>
          <motion.button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Nouvelle commande
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden mb-8"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-10 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Liste des commandes
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3 font-medium">Provenance</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Quantité</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                    className="border-b border-gray-800"
                  >
                    <td className="py-3">{order.origin}</td>
                    <td className="py-3">{order.description}</td>
                    <td className="py-3">{order.quantity}</td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-500 hover:text-red-400"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800 w-full max-w-md relative"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-10 blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-4 text-white relative z-10">Nouvelle commande</h3>
            
            <form onSubmit={handleAddOrder} className="space-y-4 relative z-10">
              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Quantité</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={newOrder.quantity}
                  onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <motion.button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ajouter
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 