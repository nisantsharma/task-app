import { useContext, useEffect, useState } from 'react';

import styles from './Card.module.css';

import { DataContext } from '../../context/DataProvider';

import Reddot from '../../assets/reddot.png';
import Bluedot from '../../assets/bluedot.png';
import Greendot from '../../assets/greendot.png';
import Threedots from '../../assets/threedots.png';
import Downarrow from '../../assets/downarrow.png';
import Uparrow from '../../assets/uparrow.png';
import CardChecklist from './CardChecklist';
import ThreedotPopup from './ThreedotPopup';
import axios from 'axios';



const Card = ({ item, index, clickedIcon, setClickedIcon }) => {
    const { cardsArr, setCardsArr } = useContext(DataContext);

    const categoryArr = ['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'];
    const [collapse, setCollapse] = useState(true);
    const [dotPopup, setDotPopup] = useState(false);

    let arr = [...item.checklistArr];


    if (collapse) {
        arr = [arr[0]];
    }

    const dateObj = item.dueDate;
    let date, month, year;

    if (dateObj) {
        date = dateObj.getDay();
        month = dateObj.toLocaleString('default', { month: 'short' });
        year = dateObj.getFullYear();
    }



    const config = {
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    }



    useEffect(() => {
        if (clickedIcon === item.category) {
            setCollapse(true);
        }
    }, [clickedIcon]);



    const threedotHandler = () => {
        setDotPopup(!dotPopup);
    }

    const collapseHandler = () => {
        setCollapse(!collapse);
        setClickedIcon('cardCollapse');
    }

    const chipsHandler = async (e) => {
        try {
            let newArr = [...cardsArr];
            const currentObj = newArr[index];
            currentObj.category = e.target.dataset.name;
            newArr[index] = currentObj;

            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/task/update/${item._id}`, {
                ...item,
                category: e.target.dataset.name
            }, config);

            setCardsArr(newArr);
        }
        catch (err) {
            if (err.response) {
                alert(err.response.data.message)
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
            <div className={styles.cardHeading}>
                <div className={styles.leftDiv}>
                    {
                        item.priority === 'LOW' ? (
                            <>
                                <img src={Greendot} alt='greendot' />
                                <p>LOW PRIORITY</p>
                            </>
                        ) :
                            item.priority === 'MODERATE' ? (
                                <>
                                    <img src={Bluedot} alt='bluedot' />
                                    <p>MODERATE PRIORITY</p>
                                </>
                            ) : (
                                <>
                                    <img src={Reddot} alt='reddot' />
                                    <p>HIGH PRIORITY</p>
                                </>
                            )
                    }
                </div>
                <div className={styles.rightDiv} >
                    <ThreedotPopup dotPopup={dotPopup} setDotPopup={setDotPopup} />
                    <img src={Threedots} alt='threedots' onClick={threedotHandler} />
                </div>
            </div>
            <p className={styles.cardTitle}>Hero Section Hero Section Hero Section Hero Section Hero Section Hero Section</p>
            <div className={styles.checklistDiv}>
                <div className={styles.paraDiv}>
                    <p style={{ marginRight: '5px' }}>Checklist</p>
                    <p>(0/3)</p>
                </div>
                <div className={styles.arrowDiv} onClick={collapseHandler}>
                    {
                        collapse ? (<img src={Downarrow} alt='downarrow' />) : (<img src={Uparrow} alt='uparrow' />)
                    }
                </div>
            </div>
            <div className={styles.allChecklists}>
                {
                    arr.map((elem, index) => (<CardChecklist key={index} elem={elem} />))
                }
            </div>
            <div className={styles.lastDiv}>
                <div className={styles.dateDiv}
                    style={{
                        backgroundColor: item.category === 'DONE' ? '#63C05B' : '#CF3636'
                    }}>
                    {dateObj ? `${date}th ${month}, ${year}` : ''}
                </div>
                <div className={styles.allChips}>
                    {
                        categoryArr.filter((item1, ind) => item1 !== item.category).map((item1, ind) => (
                            <div key={ind} className={styles.chips} data-name={item1} onClick={chipsHandler}>{item1}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Card