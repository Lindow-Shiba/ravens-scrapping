import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '../components/Header';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Employees() {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ name: '', cid: '', commission: '' });
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState({ name: '', cid: '', commission: '' });

  const load = () =>
    sb.from('employees').select('*').order('name').then(({ data }) => setRows(data || []));

  useEffect(load, []);

  const add = async () => {
    if (!newRow.name || !newRow.cid) return;
    await sb.from('employees').insert({
      name: newRow.name,
      cid: newRow.cid,
      commission: parseFloat(newRow.commission) || 0
    });
    setNewRow({ name: '', cid: '', commission: '' });
    load();
  };

  const save = async (id) => {
    await sb.from('employees')
      .update({ ...edit, commission: parseFloat(edit.commission) || 0 })
      .eq('id', id);
    setEditId(null);
    load();
  };

  const del = async (id) => {
    if (confirm('Delete this employee?'))
      await sb.from('employees').delete().eq('id', id).then(load);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <h2>Employees</h2>
        <div style={{ display: 'flex', gap: '6px', marginBottom: 12 }}>
          <input placeholder="Name" value={newRow.name} onChange={e => setNewRow({ ...newRow, name: e.target.value })} />
          <input placeholder="CID" value={newRow.cid} onChange={e => setNewRow({ ...newRow, cid: e.target.value })} />
          <input placeholder="Comm %" value={newRow.commission} onChange={e => setNewRow({ ...newRow, commission: e.target.value })} />
          <button onClick={add}>Add</button>
        </div>
        <table>
          <thead><tr><th>Name</th><th>CID</th><th>Comm %</th><th /></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{editId === r.id ? <input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} /> : r.name}</td>
                <td>{editId === r.id ? <input value={edit.cid} onChange={e => setEdit({ ...edit, cid: e.target.value })} /> : r.cid}</td>
                <td>{editId === r.id ? <input type="number" step="0.1" value={edit.commission} onChange={e => setEdit({ ...edit, commission: e.target.value })} /> : r.commission}</td>
                <td align="right">
                  {editId === r.id ? (
                    <>
                      <button onClick={() => save(r.id)}>Save</button>
                      <button onClick={() => setEditId(null)} className="ml-1">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(r.id); setEdit(r); }}>Edit</button>
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