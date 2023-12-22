export const notesFetching = () => {
    return {
        type: 'NOTES_FETCHING'
    }
}

export const notesFetched = (notes: any) => {
    return {
        type: 'NOTES_FETCHED',
        payload: notes
    }
}

export const notesFetchingError = () => {
    return {
        type: 'NOTES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters: any) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter: any) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

export const noteCreated = (note: any) => {
    return {
        type: 'NOTE_CREATED',
        payload: note
    }
}

export const noteDeleted = (id: any) => {
    return {
        type: 'NOTE_DELETED',
        payload: id
    }
}

export const updateNote = (id: any, editedNote: any) => {
    return {
        type: 'UPDATE_NOTE',
        payload: { id, ...editedNote },
    }
}

export const archiveNote = (id: any) => {
    return {
        type: 'ARCHIVE_NOTE',
        payload: { id },
    }
}

export const unarchiveNote = (id: any) => {
   return {
        type: 'UNARCHIVE_NOTE',
        payload: { id },
    }
};

