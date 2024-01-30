// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/students"><a>Students</a></Link></li>
          <li><Link href="/rooms"><a>Rooms</a></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
