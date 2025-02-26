"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function AbsencesPage() {
  const [showModal, setShowModal] = useState(false);
  const [absences, setAbsences] = useState([
    { id: 1, name: 'Arthur KATCHOW', startDate: '2024-11-20', endDate: '2024-11-22', reason: 'Maladie', status: 'Validée' },
    { id: 2, name: 'Romain Lato', startDate: '2024-11-11', endDate: '2024-11-15', reason: 'Rendez-vous médical', status: 'Validée' },
    { id: 3, name: 'Valentin Nirate', startDate: '2024-12-05', endDate: '2024-12-05', reason: 'Formation', status: 'En attente' },
    { id: 4, name: 'Hugo POTTIER', startDate: '2024-11-30', endDate: '2024-12-01', reason: 'Personnel', status: 'En attente' },
  ]);
  const [newAbsence, setNewAbsence] = useState({ name: '', startDate: '', endDate: '', reason: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddAbsence = (e) => {
    e.preventDefault();
    setAbsences([...absences, {
      id: absences.length + 1,
      name: newAbsence.name,
      startDate: newAbsence.startDate,
      endDate: newAbsence.endDate,
      reason: newAbsence.reason,
      status: 'En attente'
    }]);
    setNewAbsence({ name: '', startDate: '', endDate: '', reason: '' });
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const filteredAbsences = absences.filter(absence => 
    absence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    absence.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch(status) {
      case 'En attente': return 'bg-amber-900/30 text-amber-400';
      case 'Validée': return 'bg-blue-900/30 text-blue-400';
      case 'Refusée': return 'bg-red-900/30 text-red-400';
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
            Gestion des absences
          </h1>
          <motion.button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-md"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Signaler une absence
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden mb-8"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-10 blur-xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Liste des absences
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                className="p-2 pl-8 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <th className="pb-3 font-medium">Motif</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAbsences.map((absence, index) => (
                  <motion.tr 
                    key={absence.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.05) }}
                    className="border-b border-gray-800"
                  >
                    <td className="py-3">{absence.name}</td>
                    <td className="py-3">{formatDate(absence.startDate)}</td>
                    <td className="py-3">{formatDate(absence.endDate)}</td>
                    <td className="py-3">{absence.reason}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(absence.status)}`}>
                        {absence.status}
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
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-10 blur-xl"></div>
            
            <h3 className="text-xl font-bold mb-4 text-white relative z-10">Signaler une absence</h3>
            
            <form onSubmit={handleAddAbsence} className="space-y-4 relative z-10">
              <div>
                <label className="block text-gray-400 mb-1">Nom</label>
                <input
                  type="text"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAbsence.name}
                  onChange={(e) => setNewAbsence({...newAbsence, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Date de début</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAbsence.startDate}
                  onChange={(e) => setNewAbsence({...newAbsence, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Date de fin</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAbsence.endDate}
                  onChange={(e) => setNewAbsence({...newAbsence, endDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Motif</label>
                <select
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newAbsence.reason}
                  onChange={(e) => setNewAbsence({...newAbsence, reason: e.target.value})}
                  required
                >
                  <option value="">Sélectionner un motif</option>
                  <option value="Maladie">Maladie</option>
                  <option value="Rendez-vous médical">Rendez-vous médical</option>
                  <option value="Formation">Formation</option>
                  <option value="Personnel">Personnel</option>
                </select>
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
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Signaler
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 