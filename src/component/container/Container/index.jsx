import Navbar from "../../molecules/Navbar";

export default function Container({ children }) {
  return (
    <>
      <Navbar />
      <div className="container-md">{children}</div>
    </>
  );
}
