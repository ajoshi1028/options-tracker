import './App.css';
import React, { useState } from "react";

function App() {
  const [entry, setEntry] = useState("");
  const [slPercent, setSlPercent] = useState("");
  const [tpPercent, setTpPercent] = useState("");
  const [contracts, setContracts] = useState("");

  const calculate = () => {
    const entryPrice = parseFloat(entry);
    const sl = parseFloat(slPercent);
    const tp = parseFloat(tpPercent);
    const qty = parseInt(contracts);

    if (isNaN(entryPrice) || isNaN(sl) || isNaN(tp) || isNaN(qty)) {
      return null;
    }

    const slPrice = entryPrice * (1 - sl / 100);
    const tpPrice = entryPrice * (1 + tp / 100);
    const loss = (entryPrice - slPrice) * qty * 100;
    const gain = (tpPrice - entryPrice) * qty * 100;

    return {
      slPrice: slPrice.toFixed(2),
      tpPrice: tpPrice.toFixed(2),
      loss: loss.toFixed(2),
      gain: gain.toFixed(2),
    };
  };

  const result = calculate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Options Calculator</h1>

        <div className="space-y-4">
          <Input label="Entry Price" value={entry} onChange={setEntry} />
          <Input label="Stop Loss %" value={slPercent} onChange={setSlPercent} />
          <Input label="Take Profit %" value={tpPercent} onChange={setTpPercent} />
          <Input label="# of Contracts" value={contracts} onChange={setContracts} />
        </div>

        {result && (
          <div className="mt-6 border-t pt-4 space-y-2">
            <ResultRow label="Stop Loss Price" value={`$${result.slPrice}`} />
            <ResultRow label="Take Profit Price" value={`$${result.tpPrice}`} />
            <ResultRow label="Potential Loss" value={`$${result.loss}`} />
            <ResultRow label="Potential Gain" value={`$${result.gain}`} />
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
        step="any"
      />
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default App;


