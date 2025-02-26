"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function LeavesPage() {
  const [showModal, setShowModal] = useState(false);
  const [leaves, setLeaves] = useState([
    { id: 1, name: 'Arthur KATCHOW', startDate: '2025-01-01', endDate: '2025-12-31', status: 'En attente' },
    { id: 2, name: 'Romain Lato', startDate: '2024-11-14', endDate: '2024-11-28', status: 'Approuvé' },
    { id: 3, name: 'Valentin Nirate', startDate: '2024-12-20', endDate: '2025-01-05', status: 'Refusé' },
    { id: 4, name: 'Hugo POTTIER', startDate: '2024-12-24', endDate: '2024-12-26', status: 'Approuvé' },
  ]);
  const [newLeave, setNewLeave] = useState({ name: '', startDate: '', endDate: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddLeave = (e) => {
    e.preventDefault();
    setLeaves([...leaves, {
      id: leaves.length + 1,
      name: newLeave.name,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      status: 'En attente'
    }]);
    setNewLeave({ name: '', startDate: '', endDate: '' });
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const filteredLeaves = leaves.filter(leave => 
    leave.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch(status) {
      case 'En attente': return 'bg-amber-900/30 text-amber-400';
      case 'Approuvé': return 'bg-green-900/30 text-green-400';
      case 'Refusé': return 'bg-red-900/30 text-red-400';
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
            Gestion des congés
          </h1>
          <motion.button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un congé
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden mb-8"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full opacity-10 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Liste des congés
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  <th className="pb-3 font-medium">Nom</th>
                  <th className="pb-3 font-medium">Date de début</th>
                  <th className="pb-3 font-medium">Date de fin</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave, index) => (
                  <motion.tr 
                    key={leave.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                    className="border-b border-gray-800"
                  >
                    <td className="py-3">{leave.name}</td>
                    <td className="py-3">{formatDate(leave.startDate)}</td>
                    <td className="py-3">{formatDate(leave.endDate)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(leave.status)}`}>
                        {leave.status}
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
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full opacity-10 blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-4 text-white relative z-10">Demande de congé</h3>
            
            <form onSubmit={handleAddLeave} className="space-y-4 relative z-10">
              <div>
                <label className="block text-gray-400 mb-1">Nom</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newLeave.name}
                  onChange={(e) => setNewLeave({...newLeave, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Date de début</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newLeave.startDate}
                  onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Date de fin</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newLeave.endDate}
                  onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
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
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-md"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 