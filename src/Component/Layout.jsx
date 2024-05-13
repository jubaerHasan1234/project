import Nav from "./Nav";
import classEs from "./style/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={classEs.main}>
        <div className={classEs.container}>{children}</div>
      </main>
    </>
  );
}
