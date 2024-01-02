import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=cat`;

const Gallery = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4>An error occurred.</h4>
      </section>
    );
  }

  const results = data.results;

  if (results.length === 0) {
    return (
      <section className='image-container'>
        <h4>No results found.</h4>
      </section>
    );
  }

  return (
    <section className='image-container'>
      {results.map(({ id, alt_description, urls }) => (
        <img src={urls.regular} alt={alt_description} key={id} className='image'/>
      ))}
    </section>
  );
};

export default Gallery;
