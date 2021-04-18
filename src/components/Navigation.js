
import Link from 'next/link';

const Navigation = () => {
    return (
        <div>
            <Link href='/'>Home</Link>
            <Link href='/festivales'>Festivales</Link>
            <Link href='/about'>About</Link>

            {/*<Link href='/festivals/1/concerts'>Pestaña X</Link>
            <Link href='/festivals/2/Concerts'>Pestaña Y</Link>
            <Link href='/festivals/2/concerts/2'>Pestaña Z</Link>*/}
        </div>
    );
};

export default Navigation;