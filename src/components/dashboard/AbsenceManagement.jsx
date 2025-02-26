"use client";

import { useState } from 'react';

export default function AbsenceManagement() {
  const [showModal, setShowModal] = useState(false);
  const [absences, setAbsences] = useState([
    {
      id: 1,
      name: 'Arthur KATCHOW',
      period: '20/11/2024 - 22/11/2024',
    },
    {
      id: 2,
      name: 'Romain Lato',
      period: '11/11/2024 - 15/11/2024',
    },
    // ... autres absences
  ]);
  const [newAbsence, setNewAbsence] = useState({ name: '', startDate: '', endDate: '' });

  const handleAddAbsence = (e) => {
    e.preventDefault();
    setAbsences([...absences, {
      id: absences.length + 1,
      name: newAbsence.name,
      period: `${newAbsence.startDate} - ${newAbsence.endDate}`,
    }]);
    setNewAbsence({ name: '', startDate: '', endDate: '' });
    setShowModal(false);
  };

  const handleDeleteAbsence = (id) => {
    setAbsences(absences.filter(absence => absence.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Gestion Absences</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Ajouter une absence
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
          {absences.map((absence) => (
            <tr key={absence.id} className="border-t text-black">
              <td className="py-2">
                <input type="checkbox" />
              </td>
              <td>{absence.name}</td>
              <td>{absence.period}</td>
              <td className="flex space-x-2">
                <button className="text-gray-600">👁</button>
                <button
                  onClick={() => handleDeleteAbsence(absence.id)}
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
            <h3 className="text-xl font-bold mb-4 text-black">Ajouter une absence</h3>
            <form onSubmit={handleAddAbsence} className="space-y-4">
              <div>
                <label className="block text-black mb-2">Nom de l'employé</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={newAbsence.name}
                  onChange={(e) => setNewAbsence({ ...newAbsence, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2">Date de début</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded text-black"
                  value={newAbsence.startDate}
                  onChange={(e) => setNewAbsence({ ...newAbsence, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2">Date de fin</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded text-black"
                  value={newAbsence.endDate}
                  onChange={(e) => setNewAbsence({ ...newAbsence, endDate: e.target.value })}
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