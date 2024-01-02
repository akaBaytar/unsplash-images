import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { useGlobalContext } from '../context';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();

  return (
    <section className='toggle-container'>
      <button className='dark-toggle' onClick={toggleDarkTheme}>
        {isDarkTheme ? <BsSunFill className='toggle-icon' /> : <BsMoonFill className='toggle-icon' />}
      </button>
    </section>
  );
};

export default ThemeToggle;
