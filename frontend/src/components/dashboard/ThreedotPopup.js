import { useNavigate } from 'react-router-dom'

import styles from './ThreedotPopup.module.css'


export default function ThreedotPopup({ dotPopup, taskId }) {
	const navigate = useNavigate();


	const editHandler = () => {
		navigate(`/edit/${taskId}`);
	}

	const shareHandler = () => {

	}

	const deleteHandler = () => {
		navigate(`/delete/${taskId}`);
	}


	return dotPopup ? (
		<div className={styles.container}>
			<p onClick={editHandler}>Edit</p>
			<p onClick={shareHandler}>Share</p>
			<p onClick={deleteHandler}>Delete</p>
		</div>
	) : null
}
