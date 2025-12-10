"use client";

export default function BuyCoinsModal({ onClose, onBuy }) {
  const PACKS = [10, 20, 50, 100, 200, 500];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl w-[90%] max-w-md shadow-xl animate-in fade-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary">Buy Coins</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Boost your analysis power. Higher plans unlock more parallel AI
          models.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {PACKS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onBuy(c)}
              className="p-4 border rounded-2xl hover:border-primary hover:bg-primary/5 transition-all font-semibold text-secondary shadow-sm"
            >
              <div className="text-lg font-bold">{c} Coins</div>
              <div className="text-xs text-gray-500 mt-1">₹{c}</div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
}
