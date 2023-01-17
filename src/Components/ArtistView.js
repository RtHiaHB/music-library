import { useState, useEffect, Suspense } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

function ArtistView() {
    const navigate=useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const centeredStyle = {
        'text-align' : 'center'
    }
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
                    <p style={centeredStyle}>{album.collectionName}</p>
                </Link>
            </div>
        )
    })
    const navButtons = () => {
        return(
            <div style={centeredStyle}>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }
    const bioData = artistData.filter(entry => entry.wrapperType === 'artist')
    let artistName = ''
    if(bioData.length > 0) {
        artistName = bioData[0].artistName
    }
    return (
        <div>
            {navButtons()}
            <h2 style={centeredStyle}>Artist: { artistName }</h2>
            <Suspense fallback={Spinner}>
                {renderAlbums}
            </Suspense>
        </div>
    )
}

export default ArtistView