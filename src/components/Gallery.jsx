import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useGlobalContext } from '../context';
import { useState } from 'react';

const Gallery = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { searchTerm } = useGlobalContext();

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const URL = `${apiUrl}?client_id=${apiKey}&query=${searchTerm}&per_page=12&page=${pageNumber}`;

  const { isLoading, isError, data } = useQuery({
    queryKey: ['images', [searchTerm, pageNumber]],
    queryFn: async () => {
      const res = await axios.get(URL);
      return res.data;
    },
  });

  const prevPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const nextPage = () => {
    setPageNumber((prev) => (prev > total - 1 ? total : prev + 1));
  };

  if (isLoading) {
    return <div className='loading'></div>;
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4>An error occurred.</h4>
      </section>
    );
  }

  const results = data.results;
  const total = data.total_pages;

  if (results.length === 0) {
    return (
      <section className='image-container'>
        <h4>No results found.</h4>
      </section>
    );
  }

  return (
    <>
      <section className='image-container'>
        {results.map(({ id, alt_description, urls, links, user }) => (
          <a href={links.download} key={id} target='_blank' rel='noreferrer' className='image-link'>
            <img src={urls.regular} alt={alt_description} className='image' />
            <p className='image-meta'>{user.name}</p>
          </a>
        ))}
      </section>
      <div className='button-container'>
        <button
          type='button'
          className='button'
          onClick={prevPage}
          style={pageNumber < 2 ? { backgroundColor: 'gray', cursor: 'default' } : null}>
          prev
        </button>
        <span>{pageNumber}</span>
        <button
          type='button'
          className='button'
          onClick={nextPage}
          style={pageNumber > total - 1 ? { backgroundColor: 'gray', cursor: 'default' } : null}>
          next
        </button>
      </div>
    </>
  );
};

export default Gallery;
