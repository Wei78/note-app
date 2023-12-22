import React from 'react';
import { useSelector } from 'react-redux';
import { SummaryTableProps } from './SummaryTable.props';
import './SummaryTable.css';

export const SummaryTable = ({ ...props }: SummaryTableProps): JSX.Element => {
  const { notes } = useSelector((state: { notes: any[] }) => state);

  const countNotesByCategory = (category: string) => {
    const lowerCaseCategory = category.toLowerCase();
    const activeNotesCount = notes.filter((note) => note.category.toLowerCase() === lowerCaseCategory && !note.archived).length;
    const archivedNotesCount = notes.filter((note) => note.category.toLowerCase() === lowerCaseCategory && note.archived).length;
    return { activeNotesCount, archivedNotesCount };
  };

  const taskNotesCount = countNotesByCategory('task');
  const randomNotesCount = countNotesByCategory('random');
  const ideaNotesCount = countNotesByCategory('idea');

  return (
    <main className='summary_table'>
      <section className='summary_table__header'>
        <h1>Summary Tasks</h1>
      </section>
      <section className='summary_table__body'>
        <table>
          <thead>
            <tr>
              <th>Note Category</th>
              <th>Active</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All Notes</td>
              <td>{notes.filter((note) => !note.archived).length}</td>
              <td>{notes.filter((note) => note.archived).length}</td>
            </tr>
            <tr>
              <td>Task</td>
              <td>{taskNotesCount.activeNotesCount}</td>
              <td>{taskNotesCount.archivedNotesCount}</td>
            </tr>
            <tr>
              <td>Random</td>
              <td>{randomNotesCount.activeNotesCount}</td>
              <td>{randomNotesCount.archivedNotesCount}</td>
            </tr>
            <tr>
              <td>Idea</td>
              <td>{ideaNotesCount.activeNotesCount}</td>
              <td>{ideaNotesCount.archivedNotesCount}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};
