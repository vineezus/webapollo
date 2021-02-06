import React, { useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import '../style/Popups.css';

import { GlobalContext } from '../../../context/GlobalState';

export const PopPrice = (props) => {
  const closeModal = () => props.setPrOpen(false);

  const { results } = useContext(GlobalContext);

  const prArray = results.filter(res => res.id === "price")[0]

  const arrayLength = Object.keys(prArray).length

  return (
      <Popup open={props.open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <h3>Custo Detalhado</h3>
          <table>
              <thead>
                  <tr>
                      <th>Componente</th>
                      <th>Custo</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Módulos</td>
                      <td>{`R$ ${prArray.mod_price}`}</td>
                  </tr>
                  <tr>
                      <td>Inversor</td>
                      <td>{`R$ ${prArray.inv_price}`}</td>
                  </tr>
                  {arrayLength<7
                  ? <></>
                  :
                    <React.Fragment>
                    <tr>
                      <td>Baterias</td>
                      <td>{`R$ ${prArray.batt_price}`}</td>
                    </tr>
                    <tr>
                      <td>Controladores</td>
                      <td>{`R$ ${prArray.ctr_price}`}</td>
                    </tr>
                    </React.Fragment>
                  }
              </tbody>
            </table>
        </div>
      </Popup>
  );
};

export default PopPrice;