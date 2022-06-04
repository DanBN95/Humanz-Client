import axios from "axios";

export default axios.create({
    baseURL: 'http://ip-api.com/json'
});