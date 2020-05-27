import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import getStore from '../store'
import Search from '../components/Search'

const Index = () => {
  return (
    <>
      <Search />
    </>
  )
}

export default Index
