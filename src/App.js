import { useState, useEffect, Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import Searchbar from './Components/Searchbar'
import { createResource as fetchData } from './helper'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'

function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState(null)

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  useEffect(() => {
    if(search) {
      setData(fetchData(search))
    }
  }, [search])

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<h1>Loading...</h1>}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route path="/" element ={
            <Fragment>
              <Searchbar handleSearch={handleSearch} />
              {renderGallery()}
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
