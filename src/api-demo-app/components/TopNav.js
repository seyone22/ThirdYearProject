'use client'
import Link from 'next/link';
import {useState} from 'react';
import {usePathname} from 'next/navigation';

import styles from './TopNav.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const TopNav = () => {

    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu);
    };

    const handleSignout = async () => {

    }

    return (
        <nav className={styles.navContainer}>
            <div
                className={`${styles.hamburgerMenu} ${showMenu ? styles.active : ''}`}
                onClick={toggleMenu}
            >
                <div className={styles.hamburgerIcon}><FontAwesomeIcon icon={faBars}/></div>
            </div>
            <ul className={`${styles.navItemList} ${showMenu ? styles.active : ''}`}>
                <div className={styles.navItem}>
                    <NavItem current={pathname === '/'} href="/">
                        Home
                    </NavItem>
                    <NavItem current={pathname === '/about'} href="/about">
                        About
                    </NavItem>
                    <NavItem current={pathname === '/auth/login'} href="/auth/login">
                        Login
                    </NavItem>
                </div>
{/*                <div className={styles.navItem}>
                    {session && (
                        <div className={styles.userDetail}>
                            <Image className={styles.userIcon} src={session.user.image} alt="img" width={40}
                                   height={40}/>
                        </div>
                    )}
                    {!session && (
                        <div className={styles.userDetail}>
                            <button
                                onClick={() => signIn('google')}
                                className="p-2 my-2 bg-blue-500 text-white"
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                    {session && (
                        <div className={styles.userDetail}>
                            <button
                                onClick={() => handleSignout()}
                                className="p-2 bg-blue-500 my-2 text-white"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>*/}
            </ul>
        </nav>
    );
};

// Custom NavItem component to handle highlighting
const NavItem = ({current, href, children}) => (
    <li className={`${styles.navItem} ${current ? styles.navItemCurrent : ''}`}>
        <Link href={href}>{children}</Link>
    </li>
);

export default TopNav;
