import axios from "axios";


export const logout =() => {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
};

