function TitleComponent({title, onChangeTitle}: {title: string, onChangeTitle: React.Dispatch<React.SetStateAction<string>>}){
    return <div>
    <input
      value={title}
      onChange={(e) => onChangeTitle(e.target.value)}
      placeholder="Enter your Title here"
      className='border-2 p-2 rounded-md w-[300px]'
    />
  </div>
}
export default TitleComponent;