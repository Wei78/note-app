const initialState = {
    notes: [],
    notesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredNotes: []
}

const reducer = (state = initialState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'NOTES_FETCHING':
            return {
                ...state,
                notesLoadingStatus: 'loading'
            }
        case 'NOTES_FETCHED':
            return {
                ...state,
                notes: action.payload,
                filteredNotes: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter((item: any) => item.element === state.activeFilter),
                notesLoadingStatus: 'idle'
            }
        case 'NOTES_FETCHING_ERROR':
            return {
                ...state,
                notesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredNotes: action.payload === 'all' ? 
                                state.notes :
                                state.notes.filter((item: any) => item.element === action.payload)
            }
        case 'NOTE_CREATED':
            let newCreatedNoteList = [...state.notes, action.payload];
            return {
                ...state,
                notes: newCreatedNoteList,
                filteredNotees: state.activeFilter === 'all' ? 
                                newCreatedNoteList : 
                                newCreatedNoteList.filter(item => item.element === state.activeFilter)
            }
        case 'NOTE_DELETED': 
            const newNoteList = state.notes.filter((item: any) => item.id !== action.payload);
            return {
                ...state,
                notes: newNoteList,
                filteredNotes: state.activeFilter === 'all' ? 
                                newNoteList : 
                                newNoteList.filter((item: any) => item.element === state.activeFilter)
            }
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note: any) =>
                    note.id === action.payload.id ? { ...note, ...action.payload } : note
                ),
            };

    case 'ARCHIVE_NOTE':
      return {
        ...state,
        notes: state.notes.map((note: any) =>
          note.id === action.payload.id ? { ...note, archived: true } : note
        ),
      };

    case 'UNARCHIVE_NOTE':
        return {
            ...state,
            notes: state.notes.map((note: any) =>
            note.id === action.payload.id ? { ...note, archived: false } : note
            ),
        };

        default: return state
    }
}

export default reducer;