"use client";

export default function CoinHistoryModal({ history, onClose }) {
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl w-[90%] max-w-md shadow-xl animate-in fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary">Coin History</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto space-y-3">
          {safeHistory.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No records found.
            </p>
          ) : (
            safeHistory.map((item, index) => {
              const date = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "";

              return (
                <div
                  key={item.createdAt || index}
                  className="p-3 border rounded-xl bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-secondary">
                      {item.type === "credit" ? "+ " : "- "}
                      {item.coins} Coins
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.description || "Coins update"}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">{date}</span>
                </div>
              );
            })
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 py-2 font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}
