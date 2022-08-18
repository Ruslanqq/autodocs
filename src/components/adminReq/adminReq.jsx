
import React, { useEffect, useState } from "react";
import { axiosSSR } from "../../api/axios";
import '../../index.css'


function Reques(props) {
  const [value, setValue] = useState({
    id: 1,
    status: false,
    toCompany: 1,
    bank: 1
  });
  const [state, setState] = useState();
  const [toNameCompany, setToNameCompany] = useState()
  const [products, setProducts] = useState()
  const [productArray, setProductsArray] = useState([])
  const [banks, setBanks] = useState()
  const [newBanks, setNewBanks] = useState()
  

  console.log(banks)

  const productsHandlerChange = (e) => {
    const {name, value} = e.target
    setProducts(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  // const toCompanyHandlerChange = (e) => {
  //   setToNameCompany(e.target.value)
  //   console.log(e.target.value)
    
  // }
  const banksHandlerChange = (e) => {
    setNewBanks(e.target.valuе)
  
  }
  const companyHandlerChange = (e) => {
    toNameCompany(e.target.value)
   
  }

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const statusHundler = (e) =>{
    const status1 = e.target
    setValue((prevState)=> ({
      ...prevState,
      status: status1.checked
    }))
   
  }

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
      status: value.status,  
      toCompany: setToNameCompany.toCompany,
      bank: banks.bank,
      products: productArray
    };
    await axiosSSR.post("api/request_admin/", data);
  }

  


  useEffect(() => {
    const hui = async () => {
     try {
      const data = await axiosSSR.get("/api/products/");
      setState(data.data);
      const banks = await axiosSSR.get("/api/companies/");
      const newBanks = banks?.data?.flatMap((item)=>{
        return item.banks.map((item) =>{
          return {
            id:item.id,
            company_bank_name_ru: item.company_bank_name_ru
          }
        })
      })
      console.log(newBanks)
      const toCompany = await axiosSSR.get("/api/companies/");
      setToNameCompany(toCompany.data);
     } catch (error) {
      console.log(error)
     }
    };
   
    hui();

  }, []);
  

  

 

  const submitForm = async (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="reques">
      <h1>Заявка</h1>
      <form className="form1" id="form" onSubmit={postForm}>
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
                  placeholder="Сумма"
                  name={`price`}
                  onChange={productsHandlerChange}
                />
                <button className="add_products" onClick={handlerClick}>добавить продукт</button>
              </div> 

            );
          })}
        </div>
        <label>
            to Company: 
            <select className="123" name="to_Company" onChange={companyHandlerChange}>
            {
              toNameCompany?.map(item => (
                <option value={value.data} key={item.id}>{item.company_full_name_en}</option>
              ))
            }
          </select>
        </label>
        <label>
          Counterparty bank:
          <select value={banks} className="Counterparty" name="Counterparty_bank" onChange={banksHandlerChange}>
            <option value = "0" defaultValue>
              ----
            </option>
            {
              newBanks?.map(item => (
                <option value={item.data} key={item.id}>{item.company_bank_name_ru}</option>
              ))
            }
          </select>
        </label>
        {/* <<button name="confirm_bank">Confirm</button>> */}
        <div className="input_checkbox">
        Подтвердить:<br/>
        <input checked={value.status} type='checkbox' name="status" onChange={statusHundler}></input>
        </div>
        <input className="submit_button" type="submit" value="Submit"/>
      </form>
    </div>
  );
}

// export HandleSubmit;
export default Reques;


