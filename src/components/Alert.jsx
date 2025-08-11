// src/components/Alerts.jsx

const Alerts = () => {
  const alerts = [
    { name: "Oakwood University", status: "Remove Now", color: "bg-yellow-300" },
    { name: "Sunrise Academy", status: "Remove Now", color: "bg-red-500 text-white" },
    { name: "Maple Leaf School", status: "Remove Now", color: "bg-yellow-300" },
    { name: "Riverdale College", status: "Remove Now", color: "bg-yellow-300" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Subscription Expiry Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div key={index} className="flex justify-between items-center border p-2 rounded">
            <span>{alert.name}</span>
            <button className={`px-3 py-1 text-sm font-semibold rounded ${alert.color}`}>
              {alert.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
