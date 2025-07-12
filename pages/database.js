import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Database() {
  const [employees, setEmployees] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCid, setNewCid] = useState('');
  const [newCommission, setNewCommission] = useState('');

  const load = async () => {
    const { data } = await supabase.from('employees').select('*');
    setEmployees(data);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await supabase.from('employees').insert({
      name: newName,
      cid: newCid,
      commission: parseFloat(newCommission) || 0
    });
    setNewName('');
    setNewCid('');
    setNewCommission('');
    load();
  };

  return (
    <>
      <nav>
        <a href="/">Home</a>
        <a href="/database">Database</a>
        <a href="/material-price">Admin&nbsp;Prices</a>
      </nav>

      <div className="p-4">
        <h1 className="text-xl font-bold mb-3">Employees</h1>

        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" />
        <input value={newCid} onChange={(e) => setNewCid(e.target.value)} placeholder="CID" />
        <input
          value={newCommission}
          onChange={(e) => setNewCommission(e.target.value)}
          placeholder="Commission %"
        />
        <button onClick={add}>Add</button>

        <table className="mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>CID</th>
              <th>Commission %</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.cid}</td>
                <td>{e.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}