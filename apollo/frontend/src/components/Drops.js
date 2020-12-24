import React, { useState, useContext, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import { GlobalContext } from '../../context/GlobalState';
import 'react-dropdown/style.css';

const modOps_og = [
  { value: 250, label: '250 W' },
  { value: 350, label: '350 W' },
]

const modOps = [
  { value: 50, label: '50 W' },
  { value: 100, label: '100 W' },
  { value: 150, label: '150 W' },
]

const ctrOps = [
  { value: 30, label: '30 W' },
  { value: 60, label: '60 W' },
]

const battOps = [
  { value: 70, label: '70 A' },
  { value: 100, label: '60 A' },
]

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

function Drops(props) {

  const [modValue, setModValue] = useState({ value: 50, label: '50 W' })
  const [ctrValue, setCtrValue] = useState({ value: 30, label: '30 W' })
  const [battValue, setBattValue] = useState({ value: 70, label: '70 A' })

  const { getSized, getOnSized, updateResults, id, consum, loadUpdate, loading } = useContext(GlobalContext);

  const handleDropOn = (opt) => {
    getOnSized(
      {
        config: {"mod": opt.value},
        id: id, 
        consum: consum
      }
    )
  }

  const handleDropOff = (opt) => {
    if(modOps.some(item => shallowEqual(item, opt))) {
      getSized(
        {
          config: {"mod": opt.value, "batt": battValue.value, "ctr": ctrValue.value},
          id, 
          consum,
        }
      )

    } else if (ctrOps.some(item => shallowEqual(item, opt))){
      getSized(
        {
          config: {"mod": modValue.value, "batt": battValue.value, "ctr": opt.value},
          id, 
          consum,
        }
      )

    } else if (battOps.some(item => shallowEqual(item, opt))){
      getSized(
        {
          config: {"mod": modValue.value, "batt": opt.value, "ctr": ctrValue.value},
          id, 
          consum,
        }
      )
    }
  }

  let handleOnChange = (selectedOpt) => {
    updateResults()


    props.onGrid>0?
    handleDropOn(selectedOpt)
    :
    handleDropOff(selectedOpt)
  }


  return (
    <>
      {
        props.onGrid>0?
        <Dropdown options={modOps_og} onChange={handleOnChange} />
        :
        <React.Fragment>
        <Dropdown options={modOps} value={modValue} onChange={setModValue, handleOnChange} />
        <Dropdown options={battOps} value={battValue} onChange={setBattValue, handleOnChange} />
        <Dropdown options={ctrOps} value={ctrValue} onChange={setCtrValue, handleOnChange} />
        </React.Fragment>
      }
    </>
  )
}

export default Drops;
