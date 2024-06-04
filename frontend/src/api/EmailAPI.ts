import { CreateEmailDto } from "@/DTO/CreateEmailDto";
import { SendEmailDTO } from "@/DTO/SendEmailDTO";
import { UpdateEmailDto } from "@/DTO/UpdateEmailDTO";
import axios from "axios";

const API = "http://localhost:3000/api/email-template";

export const addTemplate = (createDTO: CreateEmailDto)=>{
    return axios.post(API, createDTO, {
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export const getAllTemplate = ()=>{
    return axios.get(API);
}

export const updateTemplate = (id: string, updateDTO: UpdateEmailDto)=>{
    return axios.put(`${API}/${id}`, updateDTO, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getTemplateById = (id: string)=>{
    return axios.get(`${API}/${id}`);
}

export const deleteTemplate = (id: string)=>{
    return axios.delete(`${API}/${id}`);
}

export const sendEmail = (emailDTO: SendEmailDTO)=>{
    return axios.post(`${API}/send`, emailDTO, {
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export const downloadTemplate = (id: string)=>{
    return axios.get(`${API}/${id}`);
}