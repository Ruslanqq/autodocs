// import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { axiosSSR } from "../api/axios";

// const Profile = () => {
//   const [state, setState] = useState();
//   useEffect(() => {
//     const profileus = async () => {
//       const data = await axiosSSR.get("/api/companies/");
//       // console.log(data.data)
//       setState(data);
//     };
//     profileus();
//   }, []);
//   console.log(state);
//   return (
//     <>
//       <section>
//         <h1>Profile</h1>
//         <div>
//           {state?.data.map((item, idx) => (
            
//             <pre key={idx}>{JSON.stringify(item.company_full_name_en)}</pre>
//           ))}
//            {state?.data.map((item, idx) => (
            
//             <pre key={idx}>{JSON.stringify(item.company_country)}</pre>
//           ))}
//            {state?.data.map((item, idx) => (
            
//             <pre key={idx}>{JSON.stringify(item.company_city)}</pre>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Profile;
