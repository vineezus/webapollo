import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import '../style/Popups.css';

import { GlobalContext } from '../../../context/GlobalState';

export const PopWeight = (props) => {
    const closeModal = () => props.setWOpen(false);

    const { results } = useContext(GlobalContext);

    const wArray = results.filter(res => res.id === "weight")[0]
  
    const arrayLength = Object.keys(wArray).length
  
    return (
        <Popup open={props.open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <h3>Peso Detalhado</h3>
            <table>
              <thead>
                  <tr>
                      <th>Componente</th>
                      <th>Peso (kg)</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Módulos</td>
                      <td>{`${wArray.mod_weight} kg`}</td>
                  </tr>
                  {arrayLength<7
                  ? <></>
                  :
                    <React.Fragment>
                    <tr>
                      <td>Baterias</td>
                      <td>{`${wArray.batt_weight} kg`}</td>
                    </tr>
                    </React.Fragment>
                  }
                  <tr>
                      <td>Outros</td>
                      <td>{`${wArray.other_weight} kg`}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </Popup>
    );
  };

export default PopWeight;
