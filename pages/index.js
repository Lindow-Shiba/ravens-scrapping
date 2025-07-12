import Header from '../components/Header'
import { useState } from 'react'

const car = ["Axle Parts", "Body Repair Tools", "Brake Pads", "Clutch Kits", "Fuel Straps", "Radiator Part", "Suspension Parts", "Tire Repair Kit", "Transmission Parts", "Wires"];
const mat = ["Aluminium", "Battery", "Carbon", "Clutch Fluid", "Coil Spring", "Copper", "Copper Wires", "Electronics", "Graphite", "Iron", "Laminated Plastic", "Lead", "Multi-Purpose Grease", "Paint Thinner", "Plastic", "Polymer", "Polyethylene", "Rubber", "Rusted Metal", "Scrap Metal", "Silicone", "Stainless Steel", "Steel", "Timing Belt", "Gun Powder", "Iron Ore"];
const extra = ["Apple Phone", "Adv Lockpick", "Bottle Cap", "Deformed Nail", "Empty Bottle Glass", "Horse Shoe", "Leather", "Lockpick", "Old Coin", "Pork & Beans", "Repair Kit", "Rusted Lighter", "Rusted Tin Can", "Rusted Watch", "Samsung Phone"];

function Section({ title, list, add }) {
  return <>
    <h2>{title}</h2>
    {list.map(item => (
      <button key={item} onClick={() => add(item)} style={{ margin: 3 }}>{item}</button>
    ))}
  </>
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [pct] = useState(0);
  const today = new Date().toLocaleDateString("en-US");

  const add = name => {
    setItems(prev => {
      const found = prev.find(x => x.name === name);
      if (found) return prev.map(x => x.name === name ? { ...x, qty: +x.qty + 1 } : x);
      return [...prev, { name, qty: 1 }];
    });
  };

  const setQty = (name, qty) => {
    setItems(prev => prev.map(x => x.name === name ? { ...x, qty: qty } : x));
  };

  return <>
    <Header />
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      <div style={{ flex: '0 0 48%', padding: 20, display: 'flex', flexDirection: 'column', borderRight: '2px solid #d4af37' }}>
        <h2>Receipt</h2>
        <table style={{ width: '100%' }}>
          <thead><tr><th>Item</th><th style={{ textAlign: 'right' }}>Qty</th></tr></thead>
          <tbody>
            {items.map(r => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td style={{ textAlign: 'right' }}>
                  <input type="number" min="1" value={r.qty} onChange={e => setQty(r.name, e.target.value)} style={{ width: 55, background: '#111', color: '#fff', border: '1px solid #d4af37', borderRadius: 3 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 'auto' }}>
          <select><option>Select your Name</option></select>
          <select><option>Select Warehouse</option></select>
          <input value={today} readOnly />
          <textarea rows={3} placeholder="Notes" />
          <p>Commission ({pct}%): ${(0).toFixed(2)}</p>
          <button className="download-btn">Download Invoice</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px 30px', overflowY: 'auto' }}>
        <Section title="Car Internals" list={car} add={add} />
        <Section title="Materials" list={mat} add={add} />
        <Section title="Extra Items" list={extra} add={add} />
      </div>
    </div>
  </>
}
