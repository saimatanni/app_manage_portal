// import React from 'react'

// const HubDetails = ({ hubDetails }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [infoList, setInfoList] = useState([]);
//     const GetInfoList = (url) => {
//       setIsLoading(true);
//       fetch(url, {
//         method: "GET",
//         headers: {
//           authorization: `Token ${Cookies.get("access_token")}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setInfoList(data.data.results));
//       setIsLoading(false);
//     };
//     useEffect(() => {
//       GetInfoList(
//         `${BASE_URL}api/v1/information-hub/information/?category=${hubDetails.id}`
//       );
//     }, [hubDetails.id]);
//   return (
//     <div>HubDetails</div>
//   )
// }

// export default HubDetails