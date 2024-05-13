import classEs from "./style/TextInput.module.css";
export default function TextInput({ icon, ...rest }) {
  return (
    <div className={classEs.textInput}>
      <input {...rest} />
      <span className="material-icons-outlined"> {icon} </span>
    </div>
  );
}
