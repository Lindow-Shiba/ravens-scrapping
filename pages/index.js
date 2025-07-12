import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import '@/styles/globals.css'

export default function Home() {
  const [items, setItems] = useState([])
  const [receipt, setReceipt] = useState([])

  const addItem = (item) => {
    setReceipt([...receipt, { name: item, qty: 1 }])
  }

  return (
    <>
      <Head>
        <title>Raven&apos;s Scrap & Supply</title>
      </Head>
      <div className="container">
        <header className="header">
          <img src="/logo.png" alt="logo" />
          <h1>Raven&apos;s Scrap & Supply</h1>
        </header>
        <main className="main-layout">
          <section className="receipt-panel">
            <h2>Receipt</h2>
            <table>
              <thead><tr><th>Item</th><th>Qty</th></tr></thead>
              <tbody>
                {receipt.map((r, i) => (
                  <tr key={i}>
                    <td>{r.name}</td>
                    <td><input type="number" defaultValue={r.qty} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form className="receipt-form">
              <select><option>Select your Name</option></select>
              <select><option>Select Warehouse</option></select>
              <input type="text" placeholder="Date" />
              <textarea placeholder="Notes" />
              <button type="button">Download Invoice</button>
            </form>
          </section>
          <section className="item-buttons">
            <div>
              <h3>Car Internals</h3>
              {['Axle Parts', 'Body Repair Tools', 'Brake Pads'].map(i => <button key={i} onClick={() => addItem(i)}>{i}</button>)}
            </div>
            <div>
              <h3>Materials</h3>
              {['Polyethylene', 'Rubber', 'Rusted Metal'].map(i => <button key={i} onClick={() => addItem(i)}>{i}</button>)}
            </div>
            <div>
              <h3>Extra Items</h3>
              {['Apple Phone', 'Lockpick'].map(i => <button key={i} onClick={() => addItem(i)}>{i}</button>)}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}