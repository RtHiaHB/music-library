import { PROPERTY_TYPES } from '@babel/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function GalleryItem({ item }) {
    const [view, setView] = useState(false)

    const simpleStyle = {
        'width': '25vw',
        'height': '20vh',
        'border': '1px solid black',
        'margin': '2px'
    }

    const detailedStyle = {
        'width': '80vw',
        'height': '30vh',
        'border': '1px solid black',
        'margin': '2px',
        'backgroundRepeat': 'no-repeat',
        'backgroundSize': 'cover',
    }

    const simpleView = () => {
        return (
            <div style={simpleStyle}>
                <h3>{item.trackName}</h3>
                <h4>{item.collectionName}</h4>
            </div>
        )
    }

    const detailedView = () => {
        return (
            <div style={detailedStyle}>
                <h2>{item.trackName}</h2>
                <h3>
                    <Link to={`/artist/${item.artistId}`}>
                        {item.artistName}
                    </Link>
                </h3>
                <h3>
                    <Link to={`/album/${item.collectionId}`}>
                        {item.collectionName}
                    </Link>
                </h3>
                <h4>{item.primaryGenreName}</h4>
                <h4>{item.releaseDate}</h4>
            </div>
        )
    }


    return (
        <div style={{ 'display': 'inline-block' }} onClick={() => setView(!view)}>
            {view ? detailedView() : simpleView()}
        </div>
    )
}

export default GalleryItem