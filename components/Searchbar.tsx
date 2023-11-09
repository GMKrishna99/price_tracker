'use client'
import React, { useState } from 'react'

const Searchbar = () => {
    const [SearchPrompt, setSearchPrompt] = useState('');

    const handleSubmit = () => { }
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter product link'
                className='searchbar-input'
                value={SearchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)} />
            <button type='submit' className='searchbar-btn'>Search</button>
        </form>
    )
}

export default Searchbar