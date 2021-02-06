import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Charts from '../Charts';
import '../style/Popups.css';


export const PopPayback = (props) => {
    const closeModal = () => props.setPbOpen(false);

    return (
        <Popup open={props.open} closeOnDocumentClick onClose={closeModal}>
            <h3>
            Gráfico Payback
            </h3>
            <div className="modal">
                <Charts />
            </div>
        </Popup>
    );
};

export default PopPayback;
