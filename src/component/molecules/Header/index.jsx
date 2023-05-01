export default function Header({ title }) {
  return (
    <div className="d-flex justify-content-between">
      <div>{title}</div>
      <div>Lihat Semua</div>
    </div>
  );
}
