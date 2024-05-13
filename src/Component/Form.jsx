import classEs from "./style/From.module.css";

export default function Form({ children, className, ...rest }) {
  return (
    <form className={`${className} ${classEs.form}`} action="#" {...rest}>
      {children}
    </form>
  );
}
