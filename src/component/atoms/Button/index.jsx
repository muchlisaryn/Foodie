import "./styles.scss";

export default function Button({ type, children, onClick, className }) {
  if (type === "custom") {
    <button className="d-flex" onClick={onClick}>
      {children}
    </button>;
  }

  return (
    <button onClick={onClick} className={`btn px-4 btn-orange ${className}`}>
      {children}
    </button>
  );
}
