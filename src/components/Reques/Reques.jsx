
import React, { useEffect, useState } from "react";
import { axiosSSR } from "../../api/axios";
import '../../index.css'

function Reques(props) {
  const [value, setValue] = useState({
    hui: "1",
    products: "Product",
    curency: "USD",
    From_company: "1",
  });
  const [state, setState] = useState();
  const [products, setProducts] = useState()
  const [productArray, setProductsArray] = useState([])
  const [banks, setBanks] = useState()
  
  const productsHandlerChange = (e) => {
    const {name, value} = e.target
    setProducts(prevState => ({
      ...prevState,
      [name]: value
    }))
    
  }
  const banksHandlerChange = (e) => {
    setBanks(e.target.valuе)
    console.log(e.target.value)
  }
  // const banksHandlerChange = (e) => {
  //   const {banks, value} = e.target
  //   setProducts(prevState => ({
  //     ...prevState,
  //     [banks]: value
  //   }))
    
  // }

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlerClick = (e) => {
    e.preventDefault()
    setProductsArray(prevState => ([
      ...prevState,
      products
    ]))
    setProducts({})
  }

  async function postForm(e) {
    e.preventDefault();
    const data = {
      currency: value.curency,
      product_or_service: value.products,
      counterparty_bank: setBanks.id,
      products: productArray
    };
    await axiosSSR.post("api/request/", data);
  }

  useEffect(() => {
    const hui = async () => {
      const data = await axiosSSR.get("/api/products/");
      setState(data.data);
      const banks = await axiosSSR.get("/api/users/profile/");
      setBanks(banks.data);
      // const id = await axiosSSR.get("/api/users/profile/");
      // setBanks(id.data);
    };
   
    hui();

  }, []);
  console.log(banks)
 

  const submitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="reques">
      <h1>Подать заявку</h1>
      <form className="form1" id="form" onSubmit={postForm}>
        <label>
          Currency:
          <select className="Currency" name="curency" value={value.curency} onChange={handlerChange}>
            <option className="Currency123" id="123" value="USD">
              USD
            </option>
            <option id="123" value="EURO">
              EURO
            </option>
            <option id="123" value="RUB">
              RUB
            </option>
          </select>
        </label>
        <div>
          {state?.map((item) => {
            return (
              <div key={item.id}>
                <p>Products:</p>
                <select className="Products" onChange={productsHandlerChange} name={"product_id"}>
                  
                  <option value>---</option>
                  
                    <option value={item.id}>
                      {item.name}
                    </option>
                  
                </select>
               <input className="price_input"
                  type="number"
                  placeholder="цена"
                  name={`price`}
                  onChange={productsHandlerChange}
                />  
                <span className="price__item">{item.price}</span>
                <button className="add_products" onClick={handlerClick}>добавить продукт</button>
              </div> 

            );
          })}
        </div>
        <label>
          Products or Services:
          <select
            className="Products_or_Services"
            name="products_or_service"
            value={value.products}
            onChange={handlerChange}
          >
            <option value="Product">Products</option>
            <option value="Service">Service</option>
          </select>
        </label>
        <label>
          Counterparty bank:
          <select className="Counterparty" name="Counterparty_bank" onChange={banksHandlerChange}>
            {
              banks?.company?.banks?.map(item => (
                <option value={value.setBanks} key={item.id}>{item.company_bank_name_ru}</option>
              ))
            }
          </select>
        </label>
        <input className="submit_button" type="submit" value="Submit"/>
      </form>
    </div>
  );
}

// export HandleSubmit;
export default Reques;
