import React from 'react'

function Labelandinput({label,name,labelclass,inptype,placeholder,inpclass,onchange,errorstate}) {
  console.log(errorstate);
  return (
    <>
        <label className={labelclass}>{label}</label>
        <input type={inptype} name={name} className={inpclass} placeholder={placeholder} onChange={onchange} required/>
    </>
  )
}

export default Labelandinput