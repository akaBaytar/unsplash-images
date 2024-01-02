import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=cat`;

const Gallery = () => {
  const response = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    },
  });

  return <div>Gallery</div>;
};

export default Gallery;
