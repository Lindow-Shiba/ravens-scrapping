import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '../components/Header';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/* -------- Button lists -------- */
const carInternals=[ 'Axle Parts','Body Repair Tools','Brake Pads','Clutch Kits','Fuel Straps',
  'Radiator Part','Suspension Parts','Tire Repair Kit','Transmission Parts','Wires' ];

const materials=[ 'Aluminium','Battery','Carbon','Clutch Fluid','Coil Spring','Copper','Copper Wires',
  'Electronics','Graphite','Iron','Laminated Plastic','Lead','Multi-Purpose Grease','Paint Thinner',
  'Plastic','Polymer','Polyethylene','Rubber','Rusted Metal','Scrap Metal','Silicone',
  'Stainless Steel','Steel','Timing Belt','Gun Powder','Iron Ore' ];

const extraItems=[ 'Apple Phone','Adv Lockpick','Bottle Cap','Deformed Nail','Empty Bottle Glass',
  'Horse Shoe','Leather','Lockpick','Old Coin','Pork & Beans','Repair Kit','Rusted Lighter',
  'Rusted Tin Can','Rusted Watch','Samsung Phone' ];

export default function Home(){
  const [employees,setEmployees]=useState([]);
  const [empId,setEmpId]=useState('');
  const [warehouse,setWarehouse]=useState('');
  const [items,setItems]=useState([]);
  const [notes,setNotes]=useState('');
  const today=new Date().toLocaleDateString('en-US');

  /* Load employees */
  useEffect(()=>{ supabase.from('employees').select('*').then(({data})=>setEmployees(data||[])); },[]);

  const addItem=name=>{
    setItems(prev=>{
      // if item already exists, just +1 qty
      const existing=prev.find(i=>i.name===name);
      if(existing){
        return prev.map(i=>i.name===name?{...i,qty:i.qty+1}:i);
      }
      return [...prev,{name,qty:1}];
    });
  };

  /* Commission calc: using item count as dummy total */
  const total=items.length;
  const emp=employees.find(e=>e.id==empId);
  const pct=emp?.commission||0;
  const commissionPay=total*pct/100;

  /* Handle qty edit */
  const updateQty=(name,val)=>{
    const q=parseInt(val,10)||1;
    setItems(items.map(i=>i.name===name?{...i,qty:q}:i));
  };

  return(
    <>
      <Header/>

      <div className="container">
        {/* LEFT = Receipt + Form */}
        <div className="left">
          <h2>Receipt</h2>
          <table>
            <thead><tr><th>Item</th><th align="right">Qty</th></tr></thead>
            <tbody>
              {items.map(i=>(
                <tr key={i.name}>
                  <td>{i.name}</td>
                  <td align="right">
                    <input
                      type="number"
                      min="1"
                      value={i.qty}
                      onChange={e=>updateQty(i.name,e.target.value)}
                      style={{width:'50px'}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* form */}
          <select value={empId} onChange={e=>setEmpId(e.target.value)}>
            <option value="">Select your Name</option>
            {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </select>

          <select value={warehouse} onChange={e=>setWarehouse(e.target.value)}>
            <option value="">Select Warehouse</option>
            <option>Bennys</option><option>AE</option>
          </select>

          <input value={today} readOnly/>
          <textarea rows={3} placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)}/>

          <p>Commission ({pct}%): ${commissionPay.toFixed(2)}</p>
          <button className="download">Download Invoice</button>
        </div>

        {/* RIGHT = Buttons */}
        <div className="right">
          <Section title="Car Internals" list={carInternals} add={addItem}/>
          <Section title="Materials" list={materials} add={addItem}/>
          <Section title="Extra Items" list={extraItems} add={addItem}/>
        </div>
      </div>
    </>
  );
}

function Section({title,list,add}){
  return(
    <>
      <h2>{title}</h2>
      {list.map(n=><button key={n} className="mat-btn" onClick={()=>add(n)}>{n}</button>)}
    </>
  );
}
