import axios from "axios";
const params = {
    headers: {
        Authorization: "bearer " + "9417f49977b6580e6631e14b15580dbdd93de579ea85a904df1bc2fd466798dbd1d088caf1c7eafcdc1b8790e7bad4d15743a080e7a3655a2c67931d12958a7ac6afeaa93a58e306757db2946e92d7d4c1ac6fcc78116aea522d6caa5938ae5847d55dfcc95d02c9c0ed143446bd5cd4cbe55d464f5cfb6b1c126e793b108461",
    },
};

export const fetchDataFromApi = async (url) => {
    try {
        const {data} = await axios.get(
            "http://localhost:1337" + url,
            params
        );
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const makePaymentRequest = axios.create({
    baseURL: "https://dashboard.stripe.com",
    headers: {
        Authorization: "bearer " + "sk_test_51N1lVbSJGhSW9JJWpSMuXWxp1xRNhONGIsYGpaEqWNlK4vK9uMeVkyY9FyidwNF4jCPlVthvozTlxTO7Ewqa0icn005pfvdMkn",
    },
});
