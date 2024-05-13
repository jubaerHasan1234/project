import classEs from "./style/Video.module.css";
export default function Video({ title, id, noq }) {
  return (
    <div className={classEs.video}>
      <img src={`http://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt={title} />
      <p>{title}</p>
      <div className={classEs.qmeta}>
        <p>{noq} Questions</p>
        <p>Total point: {noq * 5}</p>
      </div>
    </div>
  );
}
