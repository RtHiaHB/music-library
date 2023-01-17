import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DataContext } from '../Context/DataContext'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const data = useContext(DataContext)
    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')
    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })
    const artistName = artistData[0].artistName
    return (
        <div>
            <DataContext.Provider>
                <h2>Artist: { artistName }</h2>
                <p>Artist Data Goes Here!</p>
                {renderAlbums}
            </DataContext.Provider>
        </div>
    )
}

export default ArtistView