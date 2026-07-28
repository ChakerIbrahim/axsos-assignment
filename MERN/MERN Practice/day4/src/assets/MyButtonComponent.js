import React from 'react';
import styles from './MyButtonComponent.module.css';

const MyButton =(props) => {
    return (
        <button className={styles.btn}>
            {props.children}
        </button>
    );
}
export default MyButton;