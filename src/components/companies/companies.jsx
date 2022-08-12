import axios from "axios";
import React, { Component, useEffect, useState } from "react";

const Companies = () => {
  const [state, setState] = useState()
  useEffect(() => {
    const hui = async () => {
      const data = await axios.get("http://170.187.147.23:8000/api/companies/")
      // console.log(data.data)
      setState(data)
    }
    hui()
  }, [])
  console.log(state)
  return (
    <div>
      {
        state?.data.map((item, idx) => (
          <div key={idx}>
            {item.company_short_name_en}
          </div>
        ))
      }
    </div>
  )
}

export default Companies;
