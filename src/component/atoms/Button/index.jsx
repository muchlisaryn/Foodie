import "./styles.scss";

export default function Button({ type, children, onClick, className }) {
  if (type === "avatar") {
    return (
      <button className="btn-custom" onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`btn px-4 btn-orange ${className}`}>
      {children}
    </button>
  );
}
