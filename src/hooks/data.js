import { useState, useEffect } from "react";

export const useGetData = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData(url);
    }, [url])

    const getData = async (url) => {
        try {
            const response = await fetch(url);
            const info = await response.json();
            setData(info);
            console.log(info);
        } catch (error) {
            console.log(error);
        }
    }

    return { data };
}


