"use client";

import { useState } from 'react';

export default function MemberManagement() {
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: 'Arthur KATCHOW', role: 'Employé' },
    { id: 2, name: 'Romain Lato', role: 'Employé' },
    { id: 3, name: 'Valentin Nirate', role: 'Manager' },
  ]);
  const [newMember, setNewMember] = useState({ name: '', role: 'Employé' });

  const handleAddMember = (e) => {
    e.preventDefault();
    setMembers([...members, { id: members.length + 1, ...newMember }]);
    setNewMember({ name: '', role: 'Employé' });
    setShowModal(false);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Gestion des Membres</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Ajouter un membre
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-black">
            <th className="py-2">Nom</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t text-black">
              <td className="py-2">{member.name}</td>
              <td>{member.role}</td>
              <td>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-black">Ajouter un membre</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-black mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-black mb-2">Rôle</label>
                <select
                  className="w-full p-2 border rounded text-black"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  <option>Employé</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
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