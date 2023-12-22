import React, { useState } from 'react';
import { ModalAddProps } from './ModalAdd.props';
import './ModalAdd.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { noteCreated } from '../../actions';
import { v4 as uuidv4 } from 'uuid';

export const ModalAdd = ({ ...props }: ModalAddProps): JSX.Element => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteType, setNoteType] = useState('Random'); 

    const dispatch = useDispatch();
    const {request} = useHttp();

    function getFormattedDate(): string {
        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };

        const currentDate: Date = new Date();
        return currentDate.toLocaleDateString('en-US', options);
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        const newNote = {
            id: uuidv4(),
            name: noteTitle,
            description: noteContent,
            category: noteType,
            createdTime: getFormattedDate()
        }
        
        request("http://localhost:3001/notes", "POST", JSON.stringify(newNote))
            .then(res => {
                console.log(res, 'Success');
                dispatch(noteCreated(newNote));
            })
            .catch(err => console.log(err));

        // Очищаем форму после отправки
        setNoteTitle('');
        setNoteContent('');
        setNoteType('');
    }

    return (
        <div className="modal" style={{ display: props.openModal ? "flex" : "none"}}>
            <div className="modal__content">
                <h2>Add Note</h2>
                <span className="close" onClick={props.handleClose}>&times;</span>
                <label htmlFor="noteTitle">Title:</label>
                <input type="text" id="noteTitle" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}/>
                <label htmlFor="noteContent">Description:</label>
                <textarea id="noteContent" value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
                <label htmlFor="noteType">Type:</label>
                <select id="noteType" value={noteType} onChange={(e) => setNoteType(e.target.value)}>
                    <option value="Random">Random</option>
                    <option value="Task">Task</option>
                    <option value="Idea">Idea</option>
                </select>
                <button onClick={onSubmitHandler}>Submit</button>
            </div>
        </div>
    );
};
