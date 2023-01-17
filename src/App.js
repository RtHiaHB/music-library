import { useState, useEffect, Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import Searchbar from './Components/Searchbar'
import { DataContext } from './Context/DataContext'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'
import Spinner from './Components/Spinner'

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
      const fetchData = async () => {
        const BASE_URL = 'https://itunes.apple.com/search?term='
        const encodedSearchTerm = encodeURIComponent(search)
        const url = BASE_URL + encodedSearchTerm
        const response = await fetch(url)
        const data = await response.json()
        if(data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Results not Found')
        }
      }
      fetchData()
    }
  }, [search])

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={Spinner}>
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
              <DataContext.Provider value={data}>
                {renderGallery()}
              </DataContext.Provider>
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
