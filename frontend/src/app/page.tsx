'use client'
import { getAllTemplate } from "@/api/EmailAPI";
import EmailTemplate from "@/components/EmailTemplate";
import { Template } from "@/components/Template";
import { useEffect, useState } from "react";

export default function Home() {
  const [templates, setTemplates] = useState([{}]);
  const [template, setTemplate] = useState({});
  const [selected, setSelected] = useState<string|number>(0);
  const addtemplate = ()=>{
    setTemplates(()=>{
      return [...templates, {}];
    })
  }
  useEffect(()=>{
    const loadTemplates = async()=>{
      setTemplates((await getAllTemplate()).data);
    }
    loadTemplates();
  },[]);
  useEffect(()=>{
    if(templates.length === 0)
      setTemplate([{}]);
  }, [templates]);
  return (
    <div className="flex border-8 border-green-200 h-screen rounded-md">
      <div className="basis-[200px] h-full border-r-2 p-2 shadow-md flex flex-col gap-2 overflow-y-scroll">
        {templates?.map((template, i)=>
          <Template template={template} 
                    setTemplates={setTemplates}
                    setSelected={setSelected}
                    selected={selected}
                    position={i}
                    key={i}
          />
        )}
        <button className="p-2 rounded-md font-semibold bg-blue-400 text-white text-[12px]" onClick={addtemplate}>new template</button>
      </div>
      <div className="basis-auto w-full h-full overflow-y-scroll flex flex-col gap-2 p-5">
        <EmailTemplate selected={selected} setTemplates={setTemplates}/>
      </div>
    </div>
  );
}

