export default function ContainerProduct({ children }) {
  return (
    <div className="row mt-3 row-cols-3 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 ">
      {children}
    </div>
  );
}
