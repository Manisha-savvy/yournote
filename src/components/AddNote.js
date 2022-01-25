import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";
import './AddNote.css';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <span><FontAwesomeIcon icon={faUserTie} /> Add a Note</span>
            {/* <h2><FontAwesomeIcon icon={faUserTie} />Add a Note</h2> */}
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="text form-label"><b>Title</b></label>
                    <input type="text" className="text-box form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="text form-label"><b>Description</b></label>
                    <textarea type="text" className="text-box form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required></textarea>
                    {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="text form-label"><b>Tag</b></label>
                    <input type="text" className="text-box form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
