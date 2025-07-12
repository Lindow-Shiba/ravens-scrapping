import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { sendToDiscord } from '../utils/discord';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    supabase.from('employees').select('*').then(({ data }) => setEmployees(data));
    supabase.from('materials').select('*').then(({ data }) => setMaterials(data));
  }, []);

  const addItem = (name) => setItems([...items, { name, qty: 1 }]);

  const total = items.reduce((sum, i) => {
    const m = materials.find((mat) => mat.name === i.name);
    return sum + (m?.price || 0) * i.qty;
  }, 0);

  const emp = employees.find((e) => e.id == selectedEmployeeId);
  const pct = emp?.commission || 0;
  const commissionPay = total * pct / 100;
  const payout = total + commissionPay;

  const generateInvoice = () => {
    const rows = items.map((i) => `${i.qty}x ${i.name}`).join('\n');
    const msg =
      `Invoice for ${emp?.name} (CID ${emp?.cid})\n\n` +
      rows +
      `\n\nTotal: $${total.toFixed(2)}` +
      `\nCommission (${pct}%): $${commissionPay.toFixed(2)}` +
      `\nPayout: $${payout.toFixed(2)}`;
    setNotes(msg);
    sendToDiscord(msg);
  };

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/database">Database</a>
        <a href="/material-price">Admin&nbsp;Prices</a>
      </nav>

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="mb-4"
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} ({e.cid})
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2 mb-4">
          {materials.map((m) => (
            <button key={m.id} onClick={() => addItem(m.name)}>
              {m.name}
            </button>
          ))}
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, idx) => (
              <tr key={idx}>
                <td>{i.name}</td>
                <td>{i.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <textarea rows={6} className="w-full mt-4" value={notes} readOnly />

        <button className="mt-2 w-full" onClick={generateInvoice}>
          Download Invoice
        </button>
      </div>
    </>
  );
}