"use client";
import React, { useState, useRef, FC, useEffect } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw, ContentBlock, ContentState, convertFromHTML } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageComponent from './ImageComponent';
import ButtonComponent from './ButtonComponent';
import BackgroundColorPicker from './BackgroundComponent';
import dynamic from 'next/dynamic';
import { FaCode } from 'react-icons/fa';
import TitleComponent from './TitleComponent';
import { addTemplate, getTemplateById, sendEmail, updateTemplate } from '@/api/EmailAPI';
import { Bounce, toast } from 'react-toastify';

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
});

interface ButtonData {
  url: string;
  text: string;
  color: string;
  backgroundColor: string;
}

interface EmailTemplateProps {
  selected: string | number,
  setTemplates: React.Dispatch<React.SetStateAction<any>>,
}

const EmailTemplate: FC<EmailTemplateProps> = ({ selected, setTemplates}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [codeToggle, setCodeToggle] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const templateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getById = async () => {
      const result = (await getTemplateById(selected as string)).data;
      setTitle(result.title);
      // const contentBlock = htmlToDraft( || "");
      const contentBlock = convertFromHTML(result.template)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
      const initialEditorState = EditorState.createWithContent(contentState);
      setEditorState(initialEditorState);
    }
    if (typeof selected === "string")
      getById();
    else{
      setTitle("");
      setEditorState(EditorState.createEmpty());
    }
  }, [selected]);

  const handleSave = async () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const html = draftToHtml(rawContent, undefined, true, (entity) => {
      switch (entity.type) {
        case 'IMAGE':
          return `<img src='${entity.data.src}' alt="User uploaded" style='max-width: 100%;' />`;
        case 'BUTTON':
          return `<a href='${entity.data.url}' style='color: ${entity.data.color}; background-color: ${entity.data.backgroundColor}; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 4px;'>${entity.data.text}</a>`;
        default:
          return null;
      }
    });
  
    const markedHtml = html.replace(/<img/g, "<img data-entity-type='IMAGE'").replace(/<a/g, "<a data-entity-type='BUTTON'");
    const fullHtml = `<div style='background-color: ${backgroundColor}; padding: 20px; border: 1px solid #ccc;'>
        ${markedHtml}
      </div>`;
    if(typeof(selected) !== "string"){
      const result = await addTemplate({
      title,
      template: fullHtml
      });
      setTemplates((templates:any)=>[...templates, result.data]);
      toast.success("template add", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        transition: Bounce
      });
    }else{
      const result = await updateTemplate(selected, {
        title,
        template: fullHtml
        });
        setTemplates((templates:any)=>templates.map((template:any)=>{
          if(template._id === selected)
            return result.data
          return template;
        }));
        toast.success("template updated", {
          position: "top-right",
          autoClose: 2000,
          pauseOnHover: true,
          transition: Bounce
        });
    }
  };

  const handleSend = async()=>{
    if (typeof selected === "string"){
      const email = prompt("add reciver email");
      await sendEmail({
        id: selected,
        to: email
      });
      toast.success("email sent",{
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        transition: Bounce
     });
    }
  }
  
  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const addImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
  };

  const addButton = (button: ButtonData) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('BUTTON', 'IMMUTABLE', button);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
  };

  const getTemplateHTML = () => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const html = draftToHtml(rawContent, undefined, true, (entity) => {
      switch (entity.type) {
        case 'IMAGE':
          return `<img src='${entity.data.src}' alt='User uploaded" style="height: 100px; width: 100px;' />`;
        case 'BUTTON':
          return `<a href='${entity.data.url}' style='color: ${entity.data.color}; background-color: ${entity.data.backgroundColor}; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 4px;'>${entity.data.text}</a>`;
        default:
          return null;
      }
    });
    const fullHtml = `
      <div style='background-color: ${backgroundColor}; padding: 20px; border: 1px solid #ccc;'>
        ${html}
      </div>
    `;
    setCode(fullHtml);
    setCodeToggle(!codeToggle);
  };

  const mediaBlockRenderer = (block: ContentBlock) => {
    if (block.getType() === 'atomic' || block.getType() === 'unstyled') {
      const entityKey = block.getEntityAt(0);
      console.log(block);
      if (entityKey) {
        const contentState = editorState.getCurrentContent();
        const entity = contentState.getEntity(entityKey);
        const type = entity.getType();
        console.log(type);
        if (type === 'IMAGE') {
          return {
            component: Image,
            editable: false,
          };
        }

        if (type === 'BUTTON') {
          return {
            component: Button,
            editable: false,
          };
        }
      }
    }
    return null;
  };

  const Image = (props: { contentState: ContentState, block: ContentBlock }) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <img src={src} alt="User uploaded" style={{ maxWidth: '100%' }} />;
  };

  const Button = (props: { contentState: ContentState, block: ContentBlock }) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { url, text, color, backgroundColor } = entity.getData();
    return (
      <a href={url} style={{ color, backgroundColor, padding: '10px 20px', textDecoration: 'none', display: 'inline-block', borderRadius: '4px' }}>
        {text}
      </a>
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col gap-3'>
        <TitleComponent title={title} onChangeTitle={setTitle} />
        <ImageComponent onImageAdd={addImage} />
        <ButtonComponent onButtonAdd={addButton} />
        <BackgroundColorPicker onBackgroundColorChange={setBackgroundColor} />
        <div className='flex gap-2'>
          <button onClick={getTemplateHTML} className='flex w-fit items-center gap-2 p-2 bg-blue-600 rounded-md font-semibold text-white'>
            Show template code <FaCode size={15} />
          </button>
          <button className='flex w-fit items-center gap-2 p-2 bg-blue-600 rounded-md font-semibold text-white' onClick={handleSend}>
            send Email
          </button>
        </div>
      </div>
      {codeToggle && <code className='w-[300px] h-[200px] overflow-scroll border p-2 rounded-md mt-3 bg-gray-200'>
        {code}
      </code>}
      <div
        ref={templateRef}
        style={{
          backgroundColor: backgroundColor,
          padding: '20px',
          border: '1px solid #ccc',
          marginTop: '20px',
        }}
        className='rounded-md'
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          blockRendererFn={mediaBlockRenderer}
        />
      </div>
      <button className="p-2 rounded-md font-semibold bg-green-400 w-fit text-white" onClick={handleSave}>
        {typeof(selected) !== "string" ? "save" : "update"}
      </button>
    </div>
  );
};

export default EmailTemplate;
