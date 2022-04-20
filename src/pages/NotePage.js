import React from 'react'

import notes from '../assets/data'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'



 const NotePage = () => {
    const {id} = useParams();
    const note = notes.find(note => note.id === Number(id))
  return (
    <div className='note'>
        <div className='note-header'>
           <Link to='/'>
                <ArrowLeft/>
           </Link>
        </div>
        <textarea name="" value={note?.body} id="" cols="30" rows="10"></textarea>
    </div>
  )
}

export default NotePage;