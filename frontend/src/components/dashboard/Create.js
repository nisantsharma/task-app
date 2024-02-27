import { useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { DataContext } from '../../context/DataProvider';

import styles from './Create.module.css';

import Greendot from '../../assets/greendot.png';
import Reddot from '../../assets/reddot.png';
import Bluedot from '../../assets/bluedot.png';

import Checklist from './Checklist';


const Create = () => {
    const { checklistArr, setChecklistArr } = useContext(DataContext);

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(null);

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    const { taskId } = params;
    const path = location.pathname;

    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }

    const checklistObj = {
        checked: false,
        description: ''
    }


    let totalChecked = 0;
    const totalItem = checklistArr.length;

    for (let i = 0; i < totalItem; i++) {
        if (checklistArr[i].checked) {
            totalChecked++;
        }
    }

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    const priorityHandler = (e) => {
        setPriority(e.currentTarget.dataset.value);
    }


    const addNewHandler = () => {
        const newArr = [...checklistArr, checklistObj];
        setChecklistArr(newArr);
    }

    const dateHandler = (e) => {
        if (e.target.value) {
            setDueDate(e.target.value);
        }
        else {
            setDueDate(null);
        }
    }

    const cancelHandler = () => {
        setChecklistArr([]);
        navigate('/dashboard');
    }

    const saveHandler = async () => {
        try {
            if (title.trim().length === 0) {
                alert('please fill the title field');
                return;
            }
            if (priority.length === 0) {
                alert('please select priority');
                return;
            }
            if (checklistArr.length === 0) {
                alert('please create atleast one checklist');
                return;
            }
            else {
                const len = checklistArr.length;

                for (let i = 0; i < len; i++) {
                    if (checklistArr[i].description.trim().length === 0) {
                        alert(`please fill the checklist number ${i + 1}`);
                        return;
                    }
                }
            }

            if (dueDate) {
                const todayDateObj = new Date();
                const dueDateObj = new Date(dueDate);

                const todayYear = todayDateObj.getFullYear();
                const todayDate = todayDateObj.getDate();
                const todayMonth = todayDateObj.getMonth();

                const dueYear = dueDateObj.getFullYear();
                const dueDated = dueDateObj.getDate();
                const dueMonth = dueDateObj.getMonth();

                if (dueYear < todayYear || dueMonth < todayMonth || dueDated < todayDate) {
                    alert('Please change date. You cannot choose the past date.')
                    return;
                }
            }

            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/task/create`, {
                title, priority, checklistArr, dueDate
            }, config);

            setChecklistArr([]);
            navigate('/dashboard');
        }
        catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            }
            else if (err.request) {
                alert(err.request);
            }
            else {
                alert(err.message);
            }
        }
    }




    return (
        <div className={styles.container}>
            <div className={styles.centeredDiv}>
                <div className={styles.inputDiv}>
                    <p className={styles.titlePara}>Title <span style={{ color: '#FF0000' }}>*</span></p>
                    <input placeholder='Enter Task Title' className={styles.titleInput} value={title} onChange={titleHandler} />
                </div>
                <div className={styles.secondDiv}>
                    <p className={styles.priorityPara}>Select Priority <span style={{ color: '#FF0000' }}>*</span> </p>
                    <div className={styles.priorityDiv}>
                        <div className={`${styles.priorityItem} ${priority === 'HIGH' ? styles.selected : ''}`} data-value='HIGH' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Reddot} alt='reddot' />
                            <p>HIGH PRIORITY</p>
                        </div>
                        <div className={`${styles.priorityItem} ${priority === 'MODERATE' ? styles.selected : ''}`} data-value='MODERATE' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Bluedot} alt='bluedot' />
                            <p>MODERATE PRIORITY</p>
                        </div>
                        <div className={`${styles.priorityItem} ${priority === 'LOW' ? styles.selected : ''}`} style={{ marginRight: '0' }} data-value='LOW' onClick={priorityHandler}>
                            <img width='10px' height='10px' src={Greendot} alt='greendot' />
                            <p>LOW PRIORITY</p>
                        </div>
                    </div>
                </div>
                <div className={styles.checklistDiv}>
                    <p className={styles.checklistPara}>Checklist({`${totalChecked} / ${totalItem}`}) <span style={{ color: '#FF0000' }}>*</span></p>
                </div>
                <div className={styles.fixDiv}>
                    <div className={styles.flexibleDiv}>
                        {
                            checklistArr.map((item, index) => (
                                <Checklist key={index} index={index} />
                            ))
                        }
                    </div>
                    <div className={styles.addNewDiv} onClick={addNewHandler}>
                        <span>+</span><p>Add New</p>
                    </div>
                </div>

                <div className={styles.buttonsDiv}>
                    <div className={styles.dateBtn} >
                        <input type='date' style={{ width: '100%', height: '100%', outline: 'none', border: 'none', cursor: 'pointer' }} onChange={dateHandler} />
                    </div>
                    <div>
                        <button className={styles.cancelBtn} onClick={cancelHandler}>Cancel</button>
                        <button className={styles.saveBtn} onClick={saveHandler}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create