import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { axiosSSR } from "../../api/axios";

const Companies = () => {
  const [state, setState] = useState()
  useEffect(() => {
    const hui = async () => {
      const data = await axiosSSR.get("/api/companies/")
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
          <pre key={idx}>
            {JSON.stringify(item)}
          </pre>
        ))
      }
    </div>
  )
}

export default Companies;
