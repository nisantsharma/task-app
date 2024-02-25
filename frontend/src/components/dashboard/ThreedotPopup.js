import { useNavigate } from 'react-router-dom'

import styles from './ThreedotPopup.module.css'


export default function ThreedotPopup({ dotPopup, setDotPopup }) {
	const navigate = useNavigate();


	const editHandler = () => {
		navigate('/edit');
	}

	const shareHandler = () => {

	}

	const deleteHandler = () => {
		navigate('/delete');
	}


	return dotPopup ? (
		<div className={styles.container}>
			<p onClick={editHandler}>Edit</p>
			<p onClick={shareHandler}>Share</p>
			<p onClick={deleteHandler}>Delete</p>
		</div>
	) : null
}
