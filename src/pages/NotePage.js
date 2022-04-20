
import React,{useState,useEffect} from 'react'
// import notes from '../assets/data'
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'



 const NotePage = (history) => {
    const {id} = useParams();
    const navigate = useNavigate();
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
    
    let createNote=async()=>{
        await fetch(`http://localhost:8000/notes/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...note,'updated':new Date()})
            
        })
    }
    
    let deleteNote=async()=>{
        await fetch(`http://localhost:8000/notes/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
            
        })
        navigate('/');
    }
    
    let handleSubmit=()=>{
        if(id!=='new' && !note.body)
        {
            deleteNote()
        }
        else if(id==='new'){
            updateNote() 
        }
        else if(id==='new' && note !=null)
        {
            createNote()
        }
        
        navigate('/')
    }
    
  return (
    <div className='note'>
        <div className='note-header'>
           <h3>
                <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                </Link>
           </h3>
           <button onClick={deleteNote}>Delete</button>
        </div>
        <textarea onChange={(e)=>setNote({...note,'body':e.target.value})} name="" value={note?.body} id="" cols="30" rows="10"></textarea>
    </div>
  )
}

export default NotePage;