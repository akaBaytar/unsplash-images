import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const submitHandler = (e) => {
    e.preventDefault();

    const searchValue = e.target.elements.search.value;

    if (!searchValue) return;

    setSearchTerm(searchValue);
  };

  return (
    <section>
      <h1 className='title'>Unsplash Images</h1>
      <form className='search-form' onSubmit={submitHandler}>
        <input type='text' name='search' placeholder='Cat' className='form-input search-input' />
        <button type='submit' className='button'>
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
