import { CREATE, FETCH_PLAYLISTS, FETCH_PLAYLIST, DELETE, UPDATE, START_LOADING, END_LOADING } from '../constants/constantsTypes'

const reducer = (state = { playlist: [] }, action) => {
    switch (action.type) {
        case CREATE:
            return { ...state, playlists: [...state.playlist, action.payload] }

        case FETCH_PLAYLISTS:
            return { ...state, playlists: action.payload.playlist }

        case FETCH_PLAYLIST:
            return { ...state, playlist: action.payload.playlist }

        case UPDATE:
            return { ...state, playlist: state.playlist.songs.push(action.payload) }

        case DELETE:
            return { ...state, playlists: state.playlist.filter(playlist => playlist.id !== action.payload) }

        case START_LOADING:
            return { ...state, isLoading: true }

        case END_LOADING:
            return { ...state, isLoading: false }

        default:
            return state
    }
}

export default reducer