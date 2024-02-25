import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import styles from './Dashboard.module.css';

import Copy from '../../assets/Copy.png';
import DownArrow from '../../assets/downarrow.png';

import { DataContext } from '../../context/DataProvider';

import Card from './Card';
import Filter from './Filter';



const Dashboard = () => {

    const { cardsArr, setCardsArr } = useContext(DataContext);

    const [clickedIcon, setClickedIcon] = useState('');
    const [filter, setFilter] = useState(false);
    const [filterValue, setFilterValue] = useState('This Week');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const dateObj = new Date();
    const date = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();

    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }

    useEffect(() => {
        const getUserName = async () => {
            try {
                const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/getUserName`, null, config);
                const { name } = result.data;

                setUserName(name);
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

        getUserName();
    }, []);


    useEffect(() => {
        const getAllTasks = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/task/getAllTasks`, config);
            setCardsArr(data.cardsArr);
        }

        getAllTasks();
    }, []);



    const collapseHandler = (e) => {
        setClickedIcon(e.target.dataset.name);
    }

    const plusHandler = () => {
        navigate('/create');
    }


    return (
        <div className={styles.container}>
            <div className={styles.headingDiv}>
                <div className={styles.welcomeDiv} >
                    <p style={{ fontWeight: '600', fontSize: '15px' }}>Welcome, {userName}</p>
                    <p style={{ color: '#707070', marginTop: '10px' }}>{`${date}th ${month}, ${year}`}</p>
                </div>
                <div className={styles.boardDiv}>
                    <p style={{ fontWeight: '500', fontSize: '22px' }}>Board</p>
                    <div className={styles.weekDiv}>
                        <Filter filter={filter} setFilter={setFilter} setFilterValue={setFilterValue} />
                        <p>{filterValue}</p>
                        <img src={DownArrow} alt='downarrow' onClick={() => setFilter(!filter)} />
                    </div>
                </div>
            </div>
            <div className={styles.allCategory}>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>Backlog</p>
                        <img src={Copy} alt='copy' data-name='BACKLOG' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'BACKLOG'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading} style={{ marginTop: '-5px' }}>
                        <p>To do</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '25px', marginRight: '15px', cursor: 'pointer' }} onClick={plusHandler}>+</span>
                            <img src={Copy} alt='copy' data-name='TO-DO' onClick={collapseHandler} />
                        </div>
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'TO-DO'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>In progress</p>
                        <img src={Copy} alt='copy' data-name='PROGRESS' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'PROGRESS'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
                <div className={styles.categoryDiv}>
                    <div className={styles.categoryHeading}>
                        <p>Done</p>
                        <img src={Copy} alt='copy' data-name='DONE' onClick={collapseHandler} />
                    </div>
                    <div className={styles.cardsDiv}>
                        {
                            cardsArr.map((item, ind) => {
                                return item.category === 'DONE'
                                    ?
                                    (<Card key={ind} item={item} index={ind} clickedIcon={clickedIcon} setClickedIcon={setClickedIcon} />)
                                    : null
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard