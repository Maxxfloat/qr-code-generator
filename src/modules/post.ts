import axios from "axios";
const post = async (data?: {}) => {
  console.log("par: ", data);
  const res = await axios
    .post("https://qrtiger.com/api/qr/static", data, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_QR_CODE_API_KEY}`,
      },
    })

    .then((res) => res.data);
  console.log("data: ", process.env.REACT_APP_QR_CODE_API_KEY);
  return res;
};

export default post;
