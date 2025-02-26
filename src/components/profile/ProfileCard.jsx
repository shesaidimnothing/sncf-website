"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    poste: 'Alternant',
    nom: 'POTTIER',
    prenom: 'Hugo',
    email: 'test123@sncf-test.com'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-xl shadow-lg p-8 max-w-md mx-auto border border-gray-800 relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Image
              src="/images/Sncf-logo.svg.png"
              alt="SNCF Ressources"
              width={150}
              height={60}
            />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Profil
        </motion.h1>
        
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-gray-800">
            {profileData.prenom.charAt(0)}{profileData.nom.charAt(0)}
          </div>
        </motion.div>

        {isEditing ? (
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="border-b border-gray-800 pb-2">
              <label className="block text-gray-400 mb-1">Poste</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                value={profileData.poste}
                onChange={(e) => setProfileData({...profileData, poste: e.target.value})}
              />
            </div>
            <div className="border-b border-gray-800 pb-2">
              <label className="block text-gray-400 mb-1">Nom</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                value={profileData.nom}
                onChange={(e) => setProfileData({...profileData, nom: e.target.value})}
              />
            </div>
            <div className="border-b border-gray-800 pb-2">
              <label className="block text-gray-400 mb-1">Prénom</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                value={profileData.prenom}
                onChange={(e) => setProfileData({...profileData, prenom: e.target.value})}
              />
            </div>
            <div className="border-b border-gray-800 pb-2">
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div className="flex space-x-2">
              <motion.button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-md hover:from-green-700 hover:to-emerald-700"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Sauvegarder
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Annuler
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <div className="space-y-4">
            {Object.entries(profileData).map(([key, value], index) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                className="border-b border-gray-800 pb-2"
              >
                <p className="text-white">
                  <span className="text-gray-400">
                    {key.charAt(0).toUpperCase() + key.slice(1)} :
                  </span>
                  {' '}{value}
                </p>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="border-b border-gray-800 pb-2"
            >
              <p className="text-white">
                <span className="text-gray-400">Mot de passe :</span> ****************
                <Link href="/change-password" className="text-pink-500 block text-sm hover:underline">
                  modifier mon mot de passe
                </Link>
              </p>
            </motion.div>
            
            <div className="pt-4 space-y-3">
              <motion.button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-pink-700"
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Modifier
              </motion.button>
              
              <motion.button 
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-2 rounded-md hover:from-red-700 hover:to-rose-700"
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(225, 29, 72, 0.5)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                Se déconnecter
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
} 