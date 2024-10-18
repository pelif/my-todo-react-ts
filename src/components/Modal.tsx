import React, { useEffect, useState } from 'react';

import styles from './Modal.module.css';

interface Props {
    children: React.ReactNode; 
    isOpen: boolean;
    closeModal: () => void;
}

const Modal = ({ children, isOpen, closeModal }: Props) => {    

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);
  

    return (
        <div id="modal" className={isOpen ? styles.show : styles.hide}>
            <div className={styles.fade} onClick={closeModal}></div>
            <div className={styles.modal}>
                <h2>Texto modal</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;