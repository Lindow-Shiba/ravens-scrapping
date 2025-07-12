import React from 'react';
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ADMIN_PW = "RavenAdmin";

function PasswordGate({ children }) {
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("raven-admin") === "ok") {
      setOk(true);
    }
  }, []);

  const submit = () => {
    if (pw === ADMIN_PW) {
      localStorage.setItem("raven-admin", "ok");
      setOk(true);
    } else alert("Incorrect password");
  };

  if (ok) return children;

  return (
    <>\n<nav>
  <a href="/">Home</a>
  <a href="/database">Database</a>
  <a href="/material-price">Admin Prices</a>
</nav>

    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 font-bold">Enter Admin Password</h2>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="px-3 py-1 rounded text-black"
        />
        <button onClick={submit} className="ml-2">Unlock</button>
      </div>
    </div>
  );
}

export default function MaterialPrice() {
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [price, setPrice] = useState("");

  const load = async () => {
    const { data } = await supabase.from("materials").select("*").order("name");
    setRows(data);
  };

  useEffect(() => { load(); }, []);

  const save = async (id) => {
    await supabase.from("materials").update({ price: parseFloat(price) || 0 }).eq("id", id);
    setEditId(null);
    setPrice("");
    load();
  };

  return (
    <PasswordGate>
      

<div className="p-4">
        <h1 className="text-xl font-bold mb-4">Material Price Admin</h1>
        <table>
          <thead>
            <tr><th>Name</th><th className="text-right">Price</th><th className="text-right">Action</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td className="text-right">
                  {editId === r.id
                    ? <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-24 text-black" />
                    : `$${(r.price || 0).toFixed(2)}`}
                </td>
                <td className="text-right">
                  {editId === r.id
                    ? <>
                        <button onClick={() => save(r.id)}>Save</button>
                        <button onClick={() => {setEditId(null); setPrice("");}} className="ml-1">Cancel</button>
                      </>
                    : <button onClick={() => {setEditId(r.id); setPrice(r.price);}}>Edit</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PasswordGate>
  );
}