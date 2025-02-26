"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedCard, setSelectedCard] = useState(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * index, duration: 0.5 }
    })
  };

  const stats = [
    { id: 1, title: 'Commandes en attente', value: '5', color: 'from-amber-500 to-orange-500' },
    { id: 2, title: 'Congés approuvés', value: '12', color: 'from-emerald-500 to-green-500' },
    { id: 3, title: 'Absences ce mois', value: '3', color: 'from-blue-500 to-indigo-500' },
    { id: 4, title: 'Membres actifs', value: '24', color: 'from-purple-500 to-pink-500' },
  ];

  const recentActivity = [
    { id: 1, user: 'Arthur KATCHOW', action: 'a demandé un congé', time: 'Il y a 2 heures' },
    { id: 2, user: 'Romain Lato', action: 'a commandé du matériel', time: 'Il y a 5 heures' },
    { id: 3, user: 'Valentin Nirate', action: 'a signalé une absence', time: 'Hier' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tableau de bord
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              custom={index}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-gray-900 rounded-xl p-6 border border-gray-800 relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h2 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h2>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r ${stat.color} opacity-20 blur-xl`}></div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Commandes récentes
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-800">
                    <th className="pb-3 font-medium">Provenance</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Quantité</th>
                    <th className="pb-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((item, index) => (
                    <motion.tr 
                      key={item}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="border-b border-gray-800"
                    >
                      <td className="py-3">Arthur KATCHOW</td>
                      <td className="py-3">Café</td>
                      <td className="py-3">2 Cartons</td>
                      <td className="py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-amber-900/30 text-amber-400">
                          En attente
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
              Activité récente
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-400"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 