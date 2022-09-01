import axios from "axios"

const API = axios.create({baseURL: 'http://localhost:3001'})

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    
    return req
})

export const createPlaylist = (playlistName) => API.post(`/api/playlists`, playlistName)
export const fetchPlaylistsByCreator = (id) => API.get(`/api/playlists/creator/${id}`)
export const fetchPlaylist = (_id) => API.get(`/api/playlists/${_id}`)
export const updatePlaylist = (_id, playlist) => API.patch(`/api/playlists/${_id}`, playlist)
export const deletePlaylist = (id) => API.delete(`/api/playlists/${id}`)

export const signIn = (formData) => API.post(`/api/user/signin`, formData)
export const signUp = (formData) => API.post(`/api/user/signup`, formData)