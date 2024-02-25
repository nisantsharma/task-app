import styles from './Filter.module.css'


export default function Filter({ filter, setFilter, setFilterValue }) {
	const clickHandler = (e) => {
		setFilterValue(e.target.dataset.name);
		setFilter(false);
	}


	return filter ? (
		<div className={styles.container}>
			<p className={styles.ptag} data-name='Today' onClick={clickHandler}>Today</p>
			<p className={styles.ptag} data-name='This Week' onClick={clickHandler}>This Week</p>
			<p className={styles.ptag} data-name='This Month' onClick={clickHandler}>This Month</p>
		</div>
	) : null
}
