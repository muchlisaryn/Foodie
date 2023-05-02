import "./styles.scss";

export default function Button({ type, children, onClick, className }) {
  if (type === "avatar") {
    return (
      <button className="btn-custom" onClick={onClick}>
        {children}
      </button>
    );
  }

  if (type === "button-primary") {
    return (
      <button onClick={onClick} className={`btn btn-orange ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}
