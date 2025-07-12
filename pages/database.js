import { useEffect,useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/supabaseClient'

export default function Database(){
  const[rows,setRows]=useState([]);const [form,setForm]=useState({name:'',cid:'',commission:''})
  const load=async()=>{const{data}=await supabase.from('employees').select('*').order('id');setRows(data||[])}
  useEffect(()=>{load()},[])
  const add=async()=>{if(!form.name) return;await supabase.from('employees').insert({name:form.name,cid:form.cid,commission:parseFloat(form.commission)||0});setForm({name:'',cid:'',commission:''});load()}
  const del=async id=>{await supabase.from('employees').delete().eq('id',id);load()}
  return(<><Header/><div style={{padding:20}}><h2>Employees</h2>
    <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
    <input placeholder='CID' value={form.cid} onChange={e=>setForm({...form,cid:e.target.value})}/>
    <input placeholder='Commission' value={form.commission} onChange={e=>setForm({...form,commission:e.target.value})}/>
    <button onClick={add}>Add</button>
    <table style={{width:'100%',marginTop:10}}><thead><tr><th>Name</th><th>CID</th><th>Comm%</th><th/></tr></thead>
    <tbody>{rows.map(r=><tr key={r.id}><td>{r.name}</td><td>{r.cid}</td><td>{r.commission}</td><td><button onClick={()=>del(r.id)}>Del</button></td></tr>)}</tbody></table>
  </div></>)
}