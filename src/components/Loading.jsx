import styles from '../styles/Loading.module.css'

export const LoadingScreen = () => {
    return (
        <div className={styles['loading-screen']}>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
        </div>
    );
};