import React from 'react'
import { TextField,Select,MenuItem } from '@mui/material'

const Form = ({
    inputs,
    handleChange,
    filterBooks
}) => {
  return (
    <div className='flex justify-center gap-2 p-2 mb-4 mt-8 mb-8'>
        <TextField onChange={handleChange} className='w-20' id="outlined-basic" value={inputs.page_number} name="page_number" label="page no." variant="outlined" />
        <TextField onChange={handleChange} className='w-20' id="outlined-basic" value={inputs.page_size} name="page_size" label="page size" variant="outlined" />
        <Select
          id="sort_by"
          name="sort_by"
          value={inputs.sort_by}
          onChange={handleChange}
          className='w-40'
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="author">Author</MenuItem>
          <MenuItem value="published_year">Published_Year</MenuItem>
          <MenuItem value="genre">Genre</MenuItem>
        </Select>
        <Select
          id="sort_order"
          name="sort_order"
          value={inputs.sort_order}
          onChange={handleChange}
          className='w-40'
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
        <button onClick={filterBooks} className='text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded'>Filter</button>
    </div>
  )
}

export default Form