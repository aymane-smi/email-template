"use client"
import { deleteTemplate, downloadTemplate } from "@/api/EmailAPI";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Bounce, toast } from "react-toastify";


export function Template({template, setTemplates, selected, setSelected, position}:{
   template: any, 
   setTemplates:React.Dispatch<React.SetStateAction<any>>,
   selected: string|number,
   setSelected: React.Dispatch<React.SetStateAction<string|number>>,
   position: number
}){
   const handleRemove = async()=>{
      setTemplates((templates: any[])=>{
         if(template._id === undefined)
            return templates.filter((_, i)=> i !== position)
            return templates.filter((element)=> element._id !== template._id)
      })
      if(template._id !== undefined){
         await deleteTemplate(template._id);
         toast.info("template removed", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: true,
            transition: Bounce
         });
      }
   }

   const handleSelect = ()=>{
      const select = template._id || position;
      setSelected(select)
   }

   const isSelected = ()=>{
      if(selected === template._id || selected === position)
         return true;
      return false;
   }

   const handleDownload = (e:any)=>{
      if(template._id === undefined)
         e.preventDefault();
   }
   return  <div className={`flex flex-col justify-center items-center border-2 rounded-md gap-3 py-3 ${isSelected() && "bg-blue-100"}`} onClick={handleSelect}>
      <span className="font-semibold">{template.title}</span>
      <div className="flex justify-center items-center w-full gap-3">
         <a href={`http://localhost:3000/api/email-template/download/${template._id}`} onClick={handleDownload}>
            <IoMdDownload className="p-2 bg-yellow-400 rounded-md" color="white" size={30}/>
         </a>
         
         <FaRegTrashAlt className="p-2 bg-red-400 rounded-md" color="white" size={30} onClick={handleRemove}/>
      </div>
   </div>
}