import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { notesFetching, notesFetched, notesFetchingError, noteDeleted } from '../../actions';

import { NoteTableProps } from './NoteTable.props';
import './NoteTable.css';
import { NoteItem } from '../NoteItem/NoteItem';

export const NoteTable = ({ ...props }: NoteTableProps): JSX.Element => {
    const { notes, notesLoadingStatus } = useSelector((state: { notes: any[]; notesLoadingStatus: string }) => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [selectedFilter, setSelectedFilter] = useState("nonArchived");


    useEffect(() => {
    dispatch(notesFetching());
    request("http://localhost:3001/notes")
        .then(data => dispatch(notesFetched(data)))
        .catch(() => dispatch(notesFetchingError()))

    // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id: any) => {
        request(`http://localhost:3001/notes/${id}`, "DELETE")
            .then(data => {
                console.log(data, 'Deleted');
                dispatch(noteDeleted(id));
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request, dispatch]);


    if (notesLoadingStatus === "loading") {
        return <p>Loading...</p>;
    } else if (notesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(event.target.value);
    };

    const renderNotesList = (arr: any) => {
        const filteredNotes = selectedFilter === "archived" ? arr.filter((note: { archived: boolean }) => note.archived) : arr.filter((note: { archived: boolean }) => !note.archived);

        if (filteredNotes.length === 0) {
            return <h5 className="text-center mt-5">No notes here</h5>;
        }

        return filteredNotes.map(({ id, ...props }: { id: string; [key: string]: any }) => {
            return <NoteItem key={id} id={id} {...props} onDelete={() => onDelete(id)} />;
        });
    };
    const elements = renderNotesList(notes);

    return (
        <main className='table'>
            <section className='table__header'>
                <h1>My Tasks</h1>
                <select value={selectedFilter} onChange={handleFilterChange}>
                    <option value="nonArchived">Non-Archived</option>
                    <option value="archived">Archived</option>
                </select>
            </section>
            <section className='table__body'>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Dates</th>
                            <th>Actions</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {elements}
                    </tbody>
                </table>
            </section>
        </main>
    );
};