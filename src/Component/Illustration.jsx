import classEs from "./style/Illustration.module.css";
export default function Illustration({ ...rest }) {
  return (
    <div className={classEs.illustration}>
      <img {...rest} />
    </div>
  );
}
