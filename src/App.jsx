import { useEffect, useState } from 'react'
import Form from './components/Forms/Form'
import axios from "axios";
import './App.css'
import { useToast } from './components/hooks/useToast';

function App() {
  const [books,setBooks] = useState([])
  const { showToast } = useToast();
  const page_size = 10
  const [page_index,setPageIndex] = useState(0);

  const [inputs,setInputs] = useState({
    page_number: 1,
    sort_by: 'name',
    sort_order: "asc",
    page_size:10
  })

  useEffect(()=>{
    books.length<1 && fetchBooks()
  },[])

  return (
    <>
     <header className='mb-5'>
      <h1 className='text-center text-red-800 mt-5'>MatreComm Books Store</h1>
      <Form filterBooks={filterBooks} inputs={inputs} handleChange={handleChange} />
     </header>
     <section className='flex flex-col px-10 mb-20 gap-6'>
        {books && books.length>0 && books.slice(page_index*page_size,page_index*page_size+page_size).map((book,index)=>(
          <div key={index} className='grid sm:flex gap-6 p-6 w-full book-item'>
            <img className="image mx-auto" src={book?.url} />
            <div className='flex flex-col gap-3 sm:w-3/4 w-full'>
              <h3 className='badge bg-yellow-400'>Title: {book?.title}</h3>
              <p className='badge bg-red-500'>by {book?.author}</p>
              <p className='badge bg-green-500'>Published_Year: {book?.publishedDate?new Date(book?.publishedDate).getFullYear():""}</p>
              <p className='badge bg-blue-400'>Genre: {book?.genre}</p>
              <p> <span className='badge bg-violet-400'>Description</span> : {book.description}</p>
            </div>
        </div>
        ))}
     </section>
     {books.length>10 && <footer className='fixed flex space-between px-4 py-4 w-full bg-white' style={{top:"93dvh"}}>
        <div className='flex items-center justify-center w-full gap-2'>
          <span>Page : </span>
          <span className='flex items-center gap-2'>
            <button onClick={backward} className='text-white p-2 m-0 bg-blue-500 focus:border-none focus:outline-none' style={{ fontSize:"12px" ,width:"30px" }}>{"<"}</button>
            <span>{page_index+1}</span>
            <button onClick={forward} className='text-white p-2 bg-blue-500 focus:border-none focus:outline-none' style={{fontSize:"12px" ,width:"30px"}}>{">"}</button>
          </span>
        </div>
     </footer>}
    </>
  )

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({...values,[name]:value}))
  }

  function filterBooks(event){
    fetchBooks()
  }

  async function fetchBooks(){
    try{
      const response = await axios.get(import.meta.env.VITE_BE_URI+`/get-books?page=${inputs.page_number}&page_size=${inputs.page_size}&sort_by=${inputs.sort_by}&sort_order=${inputs.sort_order}`)
      
      const { books } = await response.data;
      setPageIndex(0);
      setBooks(books);
    }catch(err){
      if(err.response){
        showToast(err.response.data.message,'error')
      }else{
        showToast(err.message,'error')
      }

      setInputs({
        page_number: 1,
        sort_by: 'name',
        sort_order: "asc",
        page_size:10
      })
    }
  }

  function forward(){
    if(page_index*page_size+page_size<books.length){
       setPageIndex(page_index+1);
    }
  }

  function backward(){ 
    if(page_index>0){
      setPageIndex(page_index-1);
    }
  }
}

export default App
