import { Header } from './layouts/Header/Header';
import { NoteTable } from './components/NoteTable/NoteTable';
import { SummaryTable } from './components/SummaryTable/SummaryTable';
import { ModalAdd } from './components/ModalAdd/ModalAdd';
import { useState } from 'react';

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => setOpenModal(false);

  return (
    <div className="App">
      <Header handleOpen={handleOpen}/>
      <NoteTable />
      <SummaryTable />
      <ModalAdd handleClose={handleClose} openModal={openModal}/>
    </div>
  );
}

export default App;
