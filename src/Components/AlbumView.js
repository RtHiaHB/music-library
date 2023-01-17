// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])
    const centeredStyle = {
        'text-align': 'center'
    }
    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')
    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p style={centeredStyle}>{song.trackName}</p>
            </div>
        )
    })
    console.log(albumData)
    let albumTitle = ''
    let artistName = ''
    let releaseDate = 2023
    if(albumData.length > 0) {
        albumTitle = albumData[0].collectionName
        artistName = albumData[0].artistName
        releaseDate = new Date(albumData[0].releaseDate).getFullYear()
    }
    
    return (
        <div>
            <Suspense fallback={Spinner}>
                <h1 style={centeredStyle}>{albumTitle}</h1>
                <h2 style={centeredStyle}>by {artistName}</h2>
                <h3 style={centeredStyle}>Released: {releaseDate}</h3>
                <h3 style={centeredStyle}>Track List:</h3>
                {renderSongs}
            </Suspense>
        </div>
    )
}

export default AlbumView
