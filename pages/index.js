
import {useEffect,useState} from'react';
import {createClient} from'@supabase/supabase-js';
import Header from'../components/Header';

const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home(){
  const [employees,setEmployees]=useState([]);
  const [materials,setMaterials]=useState([]);
  const [items,setItems]=useState([]);
  const [empId,setEmpId]=useState('');

  useEffect(()=>{
    supabase.from('employees').select('*').then(({data})=>setEmployees(data||[]));
    supabase.from('materials').select('*').then(({data})=>setMaterials(data||[]));
  },[]);

  const add=(name)=>setItems([...items,{name,qty:1}]);

  return(
    <>
      <Header/>
      <div className="container">
        <div className="left">
          <h2>Receipt</h2>
          <table>
            <thead><tr><th>Item</th><th align="right">Qty</th></tr></thead>
            <tbody>
              {items.map((i,idx)=>(<tr key={idx}><td>{i.name}</td><td align="right">{i.qty}</td></tr>))}
            </tbody>
          </table>

          <select value={empId} onChange={e=>setEmpId(e.target.value)}>
            <option value="">Select your Name</option>
            {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          <select><option>Select Warehouse</option></select>
          <textarea rows={4} placeholder="Notes"/>
          <button className="download">Download Invoice</button>
        </div>

        <div className="right">
          <Section title="Car Internals" list={materials.filter(m=>m.category==='car')} add={add}/>
          <Section title="Materials" list={materials.filter(m=>m.category==='material')} add={add}/>
          <Section title="Extra Items" list={materials.filter(m=>m.category==='extra')} add={add}/>
        </div>
      </div>
    </>
  );
}

function Section({title,list,add}){
  return(
    <>
      <h2>{title}</h2>
      {list.map(m=><button key={m.id} className="mat-btn" onClick={()=>add(m.name)}>{m.name}</button>)}
    </>
  );
}
