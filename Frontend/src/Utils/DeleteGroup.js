import axios from "axios";
import host from "../host";
const deletegroup = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //To be fethched from localstorage
    const email = "aaditya@gmail.com";
    const password = "123456";
    //Endpoint
    const endpoint = host + "/api/v1/groups/deletegroup";
    const data = {
      email,
      password,
      g_id: id,
    };
    const res = await axios.post(endpoint, data, config);
    return true;
  } catch (error) {
    return false;
  }
};

export default deletegroup;
