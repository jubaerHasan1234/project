import classEs from "./style/Button.module.css";
export default function Button({ className, children, style, ...rest }) {
  return (
    <button
      className={`${classEs.button} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
