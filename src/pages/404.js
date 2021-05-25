import React from 'react';
//import styles from "@/styles/NotFound.css";
import Link from 'next/link'
import Routes from "@/constants/routes";

const NotFound = () => {
    return (
        <div>
            <b>:( Not Found...!!</b>
            <Link href={Routes.HOME}>
                <a>Home</a>
            </Link>
        </div>
    );
};

export default NotFound;