import { useNavigate } from 'react-router-dom';

import styles from './Delete.module.css';


const Delete = () => {
    const navigate = useNavigate();


    const deleteHandler = () => {
        navigate('/dashboard');
    }

    const cancelHandler = () => {
        navigate('/dashboard');
    }
    return (
        <div className={styles.container}>
            <div className={styles.centeredDiv}>
                <p>Are you sure you want to Delete?</p>
                <button className={styles.deleteBtn} onClick={deleteHandler}>Yes, Delete</button>
                <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default Delete