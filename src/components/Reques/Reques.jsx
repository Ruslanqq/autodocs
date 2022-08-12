import axios, { Axios } from "axios";
import React, { useState } from "react";
import { axiosSSR } from "../../api/axios";

function Reques(props) {
    const [value, setValue] = useState({
      hui: "1",
      products: "Product",
      curency: "USD",
      From_company: "1"
    });
    const handlerChange = (e) => {
      const {name, value} = e.target
      setValue((prevState) => ({
        ...prevState,
        [name]: value
      }))
    };
    console.log(value)
  
  async function postForm(e){
    e.preventDefault()
    const url = "http://170.187.147.23:8000/api/request/"
    const data = {
      currency: value.curency,
      product_or_service: value.products,
      from_company: +value.From_company,
      counterparty_bank: +value.hui,
      products: [
        {
          "product_id": 1,
          "price": 10000
      },
      {
          "product_id": 2,
          "price": 3000
      }
      ]
    }
    await axiosSSR.post("api/request/", data)
  }
  
  
  
  const submitForm = async (e)=>{
    e.preventDefault();
    
  }
  
    return (
      <div className="reques">
        <h1>Подать заявку</h1>
        <form id="form" onSubmit={postForm}>
        <label>
        Currency: 
        <select name="curency" value={value.curency} onChange={handlerChange}>
          <option id="123" value="USD">USD</option>
          <option id="123" value="EURO">EURO</option>
          <option id="123" value="RUB">RUB</option>
        </select>
        </label>
        <label>
        From company: 
        <select name="From_company" value={value.From_company} onChange={handlerChange}>
          <option id="123" value="1">Company</option>
          <option id="123" value="2">Company1</option>
          <option id="123" value="3">Company2</option>
        </select>
        </label>
        <label>
        Products: 
        <select name="products" value={value.products} onChange={handlerChange}>
          <option value="Product">Products</option>
          <option value="Service">Products1</option>
        </select>
        </label>
        <label>
        Counterparty bank: 
        <select name="hui" value={value.hui} onChange={handlerChange}>
          <option value="1">Hui</option>
          <option value="2">Hui1</option>
        </select>
        </label>
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  
    
  }
  
  
  // export HandleSubmit;
  export default Reques;