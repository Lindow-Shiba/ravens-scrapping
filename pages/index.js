import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
const car=['Axle Parts','Body Repair Tools','Brake Pads','Clutch Kits','Fuel Straps','Radiator Part','Suspension Parts','Tire Repair Kit','Transmission Parts','Wires'];
const mat=['Aluminium','Battery','Carbon','Clutch Fluid','Coil Spring','Copper','Copper Wires','Electronics','Graphite','Iron','Laminated Plastic','Lead','Multi-Purpose Grease','Paint Thinner','Plastic','Polymer','Polyethylene','Rubber','Rusted Metal','Scrap Metal','Silicone','Stainless Steel','Steel','Timing Belt','Gun Powder','Iron Ore'];
const extra=['Apple Phone','Adv Lockpick','Bottle Cap','Deformed Nail','Empty Bottle Glass','Horse Shoe','Leather','Lockpick','Old Coin','Pork & Beans','Repair Kit','Rusted Lighter','Rusted Tin Can','Rusted Watch','Samsung Phone'];
export default function Home(){
  const [emps,setEmps]=useState([]);
  const [empId,setEmpId]=useState('');
  const [warehouse,setWarehouse]=useState('');
  const [items,setItems]=useState([]);
  const [notes,setNotes]=useState('');
  const today=new Date().toLocaleDateString('en-US');
  useEffect(()=>{supabase.from('employees').select('*').then(r=>setEmps(r.data||[]));},[]);
  const add=n=>setItems(p=>{const e=p.find(i=>i.name===n);return e?p.map(i=>i.name===n?{...i,qty:i.qty+1}:i):[...p,{name:n,qty:1}]});
  const setQty=(n,q)=>setItems(items.map(i=>i.name===n?{...i,qty:Number(q)||1}:i));
  const total=items.reduce((s,i)=>s+i.qty,0); const emp=emps.find(e=>e.id==empId); const pct=emp?.commission||0;
  return(<>
    <Header/>
    <div className="container">
      <div className="left-panel">
        <h2>Receipt</h2>
        <table><thead><tr><th>Item</th><th>Qty</th></tr></thead>
          <tbody>{items.map(i=><tr key={i.name}><td>{i.name}</td><td><input type="number" min="1" value={i.qty} onChange={e=>setQty(i.name,e.target.value)}/></td></tr>)}</tbody>
        </table>
        <div style={{marginTop:'auto'}}>
          <select value={empId} onChange={e=>setEmpId(e.target.value)}>
            <option value="">Select your Name</option>{emps.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          <select value={warehouse} onChange={e=>setWarehouse(e.target.value)}>
            <option value="">Select Warehouse</option><option>Bennys</option><option>AE</option>
          </select>
          <input value={today} readOnly/>
          <textarea rows={3} placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)}/>
          <p>Commission ({pct}%): ${(total*pct/100).toFixed(2)}</p>
          <button className="download-btn">Download Invoice</button>
        </div>
      </div>
      <div className="right-panel">
        <Section title="Car Internals" list={car} add={add}/>
        <Section title="Materials" list={mat} add={add}/>
        <Section title="Extra Items" list={extra} add={add}/>
      </div>
    </div>
  </>)}
const Section=({title,list,add})=><><h3>{title}</h3>{list.map(n=><button key={n} className="btn-item" onClick={()=>add(n)}>{n}</button>)}</>;