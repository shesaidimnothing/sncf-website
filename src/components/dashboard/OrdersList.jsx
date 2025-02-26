"use client";

export default function OrdersList() {
  const orders = [
    {
      id: 1,
      origin: 'Arthur KATCHOW',
      description: 'Café',
      quantity: '2 Cartons',
      date: '13/11/2024',
      status: 'Attente validation RH'
    },
    // ... autres commandes
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Liste des commandes</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Filtrer"
            className="p-2 border rounded text-black"
          />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-black">
            <th className="py-2"></th>
            <th>Provenance Commande</th>
            <th>Description</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Statut de la commande</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t text-black">
              <td className="py-2">
                <input type="checkbox" />
              </td>
              <td>{order.origin}</td>
              <td>{order.description}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>
              <td>
                <span className={`
                  ${order.status === 'Attente validation RH' ? 'text-orange-500' : ''}
                  ${order.status === 'Refusée' ? 'text-red-500' : ''}
                  ${order.status === 'En cours de livraison' ? 'text-green-600' : ''}
                  ${order.status === 'Livrée' ? 'text-green-500' : ''}
                `}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="p-2 bg-green-500 text-white rounded">✓</button>
        <button className="p-2 bg-red-500 text-white rounded">✗</button>
      </div>
    </div>
  );
} 