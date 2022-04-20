
import React,{useState,useEffect} from 'react'
// import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'



 const NotePage = (history) => {
    const {id} = useParams();
    // const note = notes.find(note => note.id === Number(id))
    let[note,setNote]=useState(null)
    
    useEffect(()=>{
        getNote()
    },[id])
    
    let getNote=async()=>{
        let response=await fetch(`http://localhost:8000/notes/${id}`)
        let data=await response.json()
        setNote(data)
    }
    
    let updateNote=async()=>{
        await fetch(`http://localhost:8000/notes/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated':new Date()})
            
        })
    }
    
    let handleSubmit=()=>{
        updateNote()
        history.push('/')
    }
    
  return (
    <div className='note'>
        <div className='note-header'>
           <Link to='/'>
                <ArrowLeft onClick={handleSubmit} />
           </Link>
        </div>
        <textarea onChange={(e)=>setNote({...note,'body':e.target.value})} name="" value={note?.body} id="" cols="30" rows="10"></textarea>
    </div>
  )
}

export default NotePage;