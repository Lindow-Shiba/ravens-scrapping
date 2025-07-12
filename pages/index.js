
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabaseClient'

const materials = ['Axle Parts', 'Body Repair Tools', 'Brake Pads']

export default function Home () {
  const [items, setItems] = useState([])
  const addItem = (name) => setItems(prev => [...prev, { name, qty: 1 }])

  return (
    <>
      <Header />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <div style={{ flex: 1, padding: 20, borderRight: '2px solid #d4af37' }}>
          <h2>Receipt</h2>
          <table style={{ width: '100%' }}>
            <thead><tr><th>Item</th><th>Qty</th></tr></thead>
            <tbody>{items.map((i, idx) => <tr key={idx}><td>{i.name}</td><td>{i.qty}</td></tr>)}</tbody>
          </table>
        </div>
        <div style={{ flex: 1, padding: 20 }}>
          <h3>Materials</h3>
          {materials.map(m => <button key={m} onClick={() => addItem(m)} style={{ margin: 4 }}>{m}</button>)}
        </div>
      </div>
    </>
  )
}
