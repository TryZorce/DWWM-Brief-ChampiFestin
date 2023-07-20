import axios from 'axios';

interface Request {
    method: string,
    url: string,
    data: string|{}
}

const makeRequest = async (req: Request) => {
    if(req.method.toLowerCase() === "get"){
        return await axios.get(req.url, {
            data: req.data
        }).then((response) => response.data['hydra:member']);
    }
    return await axios.post(req.url, req.data).then((response) => response.data['hydra:member']);
}

export default makeRequest;
