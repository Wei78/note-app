import { NoteItemProps } from './NoteItem.props';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, archiveNote, unarchiveNote } from '../../actions';
import './NoteItem.css';

export const NoteItem = ({ ...props }: NoteItemProps): JSX.Element => {
    const [isEditing, setEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(props.description);
    const [editedCategory, setEditedCategory] = useState(props.category);
    const [editedName, setEditedName] = useState(props.name);
    const dispatch = useDispatch();

    const dateRegex = /\b(\d{1,2}\/\d{1,2}\/\d{4})\b/g;
    
    const match = props.description?.match(dateRegex);
    
    const date = match ? match[0] : '';

    let iconHtml;

    switch (props.category) {
        case 'random':
        iconHtml = <i className="fa-solid fa-brain"></i>;
        break;
        case 'task':
        iconHtml = <i className="fa-solid fa-thumbtack"></i>;
        break;
        case 'idea':
        iconHtml = <i className="fa-regular fa-lightbulb"></i>;
        break;
        default:
        iconHtml = <i className="fa-regular fa-lightbulb"></i>;
        break;
    }

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        const updatedNote = {
            id: props.id,
            description: editedDescription,
            category: editedCategory,
            name: editedName,
        };

        dispatch(updateNote(props.id, updatedNote));
        setEditing(false);
    };


    const handleCancelClick = () => {
        setEditing(false);
    };

const handleArchiveClick = () => {
    if (props.archived) {
      dispatch(unarchiveNote(props.id));
    } else {
      dispatch(archiveNote(props.id));
    }
  };

  return (
    <tr>
      <td>{iconHtml}</td>
      <td>{isEditing ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : props.name}</td>
      <td>{props.createdTime}</td>
      <td>
        {isEditing ? (
          <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
            <option value="random">Random</option>
            <option value="task">Task</option>
            <option value="idea">Idea</option>
          </select>
        ) : (
          <p className={`category ${props.category?.toLowerCase()}`}>{props.category}</p>
        )}
      </td>
      <td>{isEditing ? <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} /> : props.description}</td>
      <td>{date}</td>
      <td>
        <div className='btn__group'>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}><i className="fa-solid fa-check"></i></button>
              <button onClick={handleCancelClick}><i className="fa-solid fa-times"></i></button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick}><i className="fa-solid fa-pen"></i></button>
              <button onClick={handleArchiveClick}><i className={props.archived ? "fa-solid fa-archive" : "fa-solid fa-inbox"}></i></button>
              <button onClick={(e) => props.onDelete(props.id)}><i className="fa-solid fa-trash-can" style={{ color: "#FF7369" }}></i></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};








