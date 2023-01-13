import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import Searchbar from './Components/Searchbar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'

function App() {
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('Search for Music!')
  const [data, setData] = useState([])

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

        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Results not Found')
        }
        console.log(data)
      }
      fetchData()
    }
  }, [search])

  return (
    <div>
      <Searchbar handleSearch={handleSearch} />
      {message}
      <Gallery data={data} />
      <AlbumView />
      <ArtistView />
    </div>
  );
}

export default App;
