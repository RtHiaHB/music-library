import { useState } from 'react'

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
        'backgroundImage': `url(${item.artworkUrl100})`,
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

    // const detailedView = () => {
    //     return (
    //         <div style={detailedStyle}>
    //             <h3>{item.trackName}</h3>
    //             <p>{item.collectionName}</p>
    //             <p>{item.primaryGenreName}</p>
    //             <p>{item.releaseDate}</p>
    //         </div>
    //     )
    // }

    const detailView = () => {
        return (
            <div style={detailedStyle}>
                <h2>{item.trackName}</h2>
                <h3>
                    <a href={`/artist/${item.artistId}`}>
                        {item.artistName}
                    </a>
                </h3>
                <h3>
                    <a href={`/album/${item.collectionId}`}>
                        {item.collectionName}
                    </a>
                </h3>
            </div>
        )
    }    

    return (
        <div style={{ 'display': 'inline-block' }} onClick={() => setView(!view)}>
            {view ? detailView() : simpleView()}
        </div>
    )
}

export default GalleryItem