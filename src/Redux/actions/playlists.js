import { START_LOADING, END_LOADING, FETCH_PLAYLISTS, FETCH_PLAYLIST, CREATE, UPDATE, DELETE } from "../constants/constantsTypes";
import * as api from "../api"

export const createPlaylist = (playlistName) => async (dispatch) => {
    try {
        // dispatch({type: START_LOADING})

        const { data } = await api.createPlaylist(playlistName)

        dispatch({ type: CREATE, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const getPlaylistsByCreator = (id) => async (dispatch) => {
    try {

        // dispatch({type: START_LOADING})

        const { data } = await api.fetchPlaylistsByCreator(id)

        dispatch({ type: FETCH_PLAYLISTS, payload: { playlist: data } })

        // dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)

    }
}

export const getPlaylist = (_id) => async (dispatch) => {
    // console.log(_id);
    try {

        // dispatch({type: START_LOADING})

        const { data } = await api.fetchPlaylist(_id)

        dispatch({ type: FETCH_PLAYLIST, payload: { playlist: data } })

        // dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)

    }
}

export const updatePlaylist = (_id, playlist) => async (dispatch) => {
    // console.log(_id, playlist);
    try {

        const { data } = await api.updatePlaylist(_id, playlist)
        // console.log(data);
        dispatch({ type: UPDATE, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const deletePlaylist = (_id) => async (dispatch) => {
    // console.log(_id)
    try {

        await api.deletePlaylist(_id)

        dispatch({ type: DELETE, payload: _id })


    } catch (error) {
        console.log(error)
    }
}