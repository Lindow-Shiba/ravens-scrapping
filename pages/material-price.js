import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '../components/Header';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MaterialPrice() {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ name: '', price: '' });
  const [editId, setEditId] = useState(null);
  const [price, setPrice] = useState('');

  const load = () =>
    sb.from('materials').select('*').order('name').then(({ data }) => setRows(data || []));

  useEffect(load, []);

  const add = async () => {
    if (!newRow.name) return;
    await sb.from('materials').insert({ name: newRow.name, price: parseFloat(newRow.price) || 0 });
    setNewRow({ name: '', price: '' });
    load();
  };

  const save = async (id) => {
    await sb.from('materials').update({ price: parseFloat(price) || 0 }).eq('id', id);
    setEditId(null);
    load();
  };

  const del = async (id) => {
    if (confirm('Delete this material?'))
      await sb.from('materials').delete().eq('id', id).then(load);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <h2>Materials / Prices</h2>
        <div style={{ display: 'flex', gap: '6px', marginBottom: 12 }}>
          <input placeholder="Material" value={newRow.name} onChange={e => setNewRow({ ...newRow, name: e.target.value })} />
          <input placeholder="Price" type="number" step="0.01" value={newRow.price} onChange={e => setNewRow({ ...newRow, price: e.target.value })} />
          <button onClick={add}>Add</button>
        </div>
        <table>
          <thead><tr><th>Name</th><th align="right">Price</th><th /></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td align="right">
                  {editId === r.id ? <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={{ width: 80 }} /> : `$${(r.price || 0).toFixed(2)}`}
                </td>
                <td align="right">
                  {editId === r.id ? (
                    <>
                      <button onClick={() => save(r.id)}>Save</button>
                      <button onClick={() => setEditId(null)} className="ml-1">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(r.id); setPrice(r.price); }}>Edit</button>
                      <button onClick={() => del(r.id)} className="ml-1">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}