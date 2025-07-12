
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabaseClient'

export default function MaterialPrice () {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ name: '', price: '' })

  useEffect(() => { load() }, [])
  const load = async () => {
    const { data } = await supabase.from('materials').select('*').order('id')
    setRows(data || [])
  }

  const add = async () => {
    if (!form.name) return
    await supabase.from('materials').insert({ name: form.name, price: parseFloat(form.price) || 0 })
    setForm({ name: '', price: '' }); load()
  }

  const delRow = async (id) => { await supabase.from('materials').delete().eq('id', id); load() }

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h2>Materials / Prices</h2>
        <input placeholder='Material' value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Price' value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <button onClick={add}>Add</button>
        <table style={{ width: '100%', marginTop: 10 }}>
          <thead><tr><th>Name</th><th>Price</th><th></th></tr></thead>
          <tbody>
            {rows.map(r => <tr key={r.id}><td>{r.name}</td><td>{r.price}</td>
              <td><button onClick={() => delRow(r.id)}>Delete</button></td></tr>)}
          </tbody>
        </table>
      </div>
    </>
  )
}
