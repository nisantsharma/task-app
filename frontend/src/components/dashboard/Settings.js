import styles from './Settings.module.css'


import Email from '../../assets/Email.png';
import Lock from '../../assets/lock.png';
import eye from '../../assets/eye.png';




export default function Settings() {
	return (
		<div className={styles.container} >
			<div className={styles.main}>
				<p className={styles.settings}>Settings</p>
				<div>
					<div className={styles.inputDiv}>
						<img src={Email} alt='email' className={styles.leftImage} />
						<input type='email' placeholder='Email' />
					</div>
					<div className={styles.inputDiv}>
						<img src={Lock} alt='lock' className={styles.leftImage} />
						<input type='password' placeholder='Old Password' />
						<img src={eye} alt='eye' className={styles.eye} />
					</div>
					<div className={styles.inputDiv}>
						<img src={Lock} alt='lock' className={styles.leftImage} />
						<input type='password' placeholder='New Password' />
						<img src={eye} alt='eye' className={styles.eye} />
					</div>
				</div>
				<div className={styles.buttonsDiv}>
					<button>Update</button>
				</div>
			</div>
		</div>
	)
}
