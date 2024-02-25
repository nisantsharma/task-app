import { useState } from 'react';

import styles from './RegisterPage.module.css';

import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'



const RegisterPage = () => {
    const [login, setLogin] = useState(false);


    return (
        <div className={styles.container}>
            {
                login ? (<Login setLogin={setLogin} />) : (<Signup setLogin={setLogin} />)
            }
        </div>
    )
}

export default RegisterPage