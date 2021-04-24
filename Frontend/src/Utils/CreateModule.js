import axios from "axios";
import host from "../host";
const createmodule = async (name) => {
  try {
    if (name.length == 0) {
      return false;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //To be fethched from localstorage
    const email = "aaditya@gmail.com";
    const password = "123456";
    //Endpoint
    const endpoint = host + "/api/v1/module/createmodule";
    const data = {
      email,
      password,
      m_name: name,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default createmodule;
