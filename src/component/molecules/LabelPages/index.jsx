export default function LabelPages({ label, children }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <div className="fw-bold">{label}</div>
      {children ? <div>{children}</div> : <></>}
    </div>
  );
}
