import { useDispatch, useSelector } from "react-redux";
import { ContainerUser, Input, Select } from "../../../../component";
import { useEffect } from "react";
import {
  fetchKabupaten,
  fetchProvinsi,
} from "../../../../features/DaerahSlice";
import { useState } from "react";

export default function AddAlamat() {
  const dataProvince = useSelector((state) => state.daerah.province);
  const dataKabupaten = useSelector((state) => state.daerah.kabupaten);
  const [provinsi, setProvinsi] = useState([]);

  console.log("data ==>", dataKabupaten);

  const dispatch = useDispatch();

  const onProvince = async (e) => {
    setProvinsi(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchProvinsi());

    if (provinsi.length > 0) {
      dispatch(fetchKabupaten({ id: provinsi }));
    }
  }, [dispatch]);

  return (
    <ContainerUser>
      <div>
        <div>Tambah Alamat</div>
        <div className="mt-2">
          <div className="d-flex">
            <div>nama</div>
            <Input type="text" />
          </div>
          <div className="d-flex">
            <div>Nomor Telephone</div>
            <Input type="text" />
          </div>
          <div className="d-flex">
            <div>Provinsi</div>
            <Select
              type="select id"
              defaultValue="Pilih Province"
              data={dataProvince}
              onChange={onProvince}
            />
          </div>
          <div className="d-flex">
            <div>Kabupaten</div>
            <Select
              type="select id"
              defaultValue="Pilih Kabupaten"
              data={dataKabupaten}
              disabled={provinsi?.length ? false : true}
            />
          </div>
          <div className="d-flex">
            <div>Kelurahan</div>
            <Input type="text" />
          </div>
          <div className="d-flex">
            <div>Kecamatan</div>
            <Input type="text" />
          </div>
          <div className="d-flex">
            <div>Kabupaten</div>
            <Input type="text" />
          </div>

          <div className="d-flex">
            <div>detail</div>
            <Input type="textarea" />
          </div>
        </div>
      </div>
    </ContainerUser>
  );
}
