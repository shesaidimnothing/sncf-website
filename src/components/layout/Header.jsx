"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', id: 'dashboard' },
    { name: 'Commandes', path: '/orders', id: 'orders' },
    { name: 'Congés', path: '/leaves', id: 'leaves' },
    { name: 'Absences', path: '/absences', id: 'absences' },
  ];

  // Mettre à jour l'onglet actif en fonction de l'URL
  useEffect(() => {
    const currentPath = pathname;
    const matchingItem = menuItems.find(item => item.path === currentPath);
    if (matchingItem) {
      setActiveTab(matchingItem.id);
    }
  }, [pathname]);

  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-purple-900/30 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mr-8"
          >
            <Link href="/dashboard">
              <div className="flex items-center">
                <Image
                  src="/images/Sncf-logo.svg.png"
                  alt="SNCF Ressources"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-white font-bold text-xl tracking-tight">
                  SNCF
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 ml-1">
                    Ressources
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.path}>
                <motion.div
                  className="relative px-4 py-2 rounded-md"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-md"
                      style={{ 
                        boxShadow: '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)' 
                      }}
                    />
                  )}
                  <span className={`relative z-10 ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/profile">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold border-2 border-white/20">
                HP
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
} 