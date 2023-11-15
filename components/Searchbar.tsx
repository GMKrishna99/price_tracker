'use client'
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { useState, FormEvent } from 'react'


const isValidAmazonProductUrl = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        // check if hostname contains amazon.country code
        if (
            hostname.includes('amazon.in') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}
const Searchbar = () => {

    const [SearchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // reload the page
        event.preventDefault();

        // check the url we entered is the URL
        const isValidLink = isValidAmazonProductUrl(SearchPrompt);

        // alert for valid link
        if (!isValidLink) return alert('please provide valid Amazon link')

        try {
            setIsLoading(true);

            // scrape the product page
            const product = await scrapeAndStoreProduct(SearchPrompt);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }


    }
    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter product link'
                className='searchbar-input'
                value={SearchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)} />
            <button type='submit' className='searchbar-btn' disabled={SearchPrompt === ''}>{isLoading ? 'Searching..' : 'Search'}</button>
        </form>
    )
}

export default Searchbar