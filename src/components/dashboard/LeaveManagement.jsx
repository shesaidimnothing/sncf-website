"use client";

import { useState } from 'react';

export default function LeaveManagement() {
  const [showModal, setShowModal] = useState(false);
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: 'Arthur KATCHOW',
      period: '01/01/2025 - 31/12/2025',
    },
    {
      id: 2,
      name: 'Romain Lato',
      period: '14/11/2024 - 28/11/2024',
    },
    // ... autres congés
  ]);
  const [newLeave, setNewLeave] = useState({ name: '', startDate: '', endDate: '' });

  const handleAddLeave = (e) => {
    e.preventDefault();
    setLeaves([...leaves, {
      id: leaves.length + 1,
      name: newLeave.name,
      period: `${newLeave.startDate} - ${newLeave.endDate}`,
    }]);
    setNewLeave({ name: '', startDate: '', endDate: '' });
    setShowModal(false);
  };

  const handleDeleteLeave = (id) => {
    setLeaves(leaves.filter(leave => leave.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Gestion Congés</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Ajouter un congé
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-black">
            <th className="py-2"></th>
            <th>Nom Employé</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="border-t text-black">
              <td className="py-2">
                <input type="checkbox" />
              </td>
              <td>{leave.name}</td>
              <td>{leave.period}</td>
              <td className="flex space-x-2">
                <button className="text-gray-600">👁</button>
                <button
                  onClick={() => handleDeleteLeave(leave.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-black">Ajouter un congé</h3>
            <form onSubmit={handleAddLeave} className="space-y-4">
              <div>
                <label className="block text-black mb-2">Nom de l'employé</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={newLeave.name}
                  onChange={(e) => setNewLeave({ ...newLeave, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2">Date de début</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded text-black"
                  value={newLeave.startDate}
                  onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2">Date de fin</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded text-black"
                  value={newLeave.endDate}
                  onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-black"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 