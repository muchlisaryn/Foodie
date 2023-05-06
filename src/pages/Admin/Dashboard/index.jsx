import { useDispatch } from "react-redux";
import ContainerAdmin from "../../../component/container/ContainerAdmin";
import { useEffect } from "react";
import { fetchTag } from "../../../features/TagSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTag());
  });

  return <ContainerAdmin></ContainerAdmin>;
}
