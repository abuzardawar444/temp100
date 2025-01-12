import axios from "axios";

//we create a base URL like we did at the backend
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;
