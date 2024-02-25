import styles from './Analytics.module.css';

import Dot from '../../assets/dot.png';


const Analytics = () => {
    return (
        <div className={styles.container}>
            <p className={styles.heading}>Analytics</p>
            <div className={styles.countDetails}>
                <div className={styles.leftDiv}>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                </div>
                <div className={styles.rightDiv}>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>
                    <div className={styles.line}>
                        <img width='10px' height='10px' src={Dot} alt='dot' />
                        <p className={styles.category}>Backlogs Tasks</p>
                        <p className={styles.count}>16</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Analytics