import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Navbar,
  Input,
  LabelPages,
  Select,
  Widgets,
} from "../../../../component";
import { useEffect } from "react";
import {
  detailKabupaten,
  detailKecamatan,
  detailKelurahan,
  detailProvinsi,
  fetchKabupaten,
  fetchKecamatan,
  fetchKelurahan,
  fetchProvinsi,
} from "../../../../features/DaerahSlice";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../../../../features/AddressSlice";

export default function AddAlamat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");

  const dataProvince = useSelector((state) => state.daerah.province);
  const dataKabupaten = useSelector((state) => state.daerah.kabupaten);
  const dataKecamatan = useSelector((state) => state.daerah.kecamatan);
  const dataKelurahan = useSelector((state) => state.daerah.kelurahan);

  const [nama, setNama] = useState("");
  const [noTelephone, setNoTelephone] = useState();
  const [provinsi, setProvinsi] = useState();
  const [kabupaten, setKabupaten] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [kelurahan, setKelurahan] = useState();
  const [detail, setDetail] = useState("");

  console.log("kelurahan", kelurahan);

  const onProvince = async (e) => {
    const getProvince = await dispatch(detailProvinsi({ id: e.target.value }));
    const resultProvince = await unwrapResult(getProvince);
    console.log(resultProvince);
    if (resultProvince) {
      setProvinsi(resultProvince.nama);
    }
    dispatch(fetchKabupaten({ id: e.target.value }));
  };

  const onCity = async (e) => {
    const getCity = await dispatch(detailKabupaten({ id: e.target.value }));
    const resultCity = await unwrapResult(getCity);
    if (resultCity) {
      setKabupaten(resultCity.nama);
    }
    dispatch(fetchKecamatan({ id: e.target.value }));
  };

  const onKecamatan = async (e) => {
    const getKecamatan = await dispatch(
      detailKecamatan({ id: e.target.value })
    );
    const resultKecamatan = await unwrapResult(getKecamatan);

    if (resultKecamatan) {
      setKecamatan(resultKecamatan.nama);
    }
    dispatch(fetchKelurahan({ id: resultKecamatan.id }));
  };

  const onKelurahan = async (e) => {
    const getKelurahan = await dispatch(
      detailKelurahan({ id: e.target.value })
    );
    const resultKelurahan = await unwrapResult(getKelurahan);
    if (resultKelurahan) {
      setKelurahan(resultKelurahan.nama);
    }
  };

  const sendAddress = async () => {
    const addressAction = await dispatch(
      addAddress({
        name: nama,
        no_telephone: noTelephone,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
        detail,
        token,
      })
    );
    const result = await unwrapResult(addressAction);
    if (result) {
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(fetchProvinsi());
  }, [dispatch]);

  return (
    <Navbar>
      <Widgets>
        <div className="add-address">
          <LabelPages type="back" label="Tambah Alamat" to={-1} />
          <div className="mt-2">
            <div className="d-flex mb-2 ">
              <div className="label">Nama</div>
              <Input
                type="text"
                className="form-control-sm"
                onChange={(e) => setNama(e.target.value)}
                value={nama}
              />
            </div>
            <div className="d-flex mb-2">
              <div className="label">Nomor Telephone</div>
              <Input
                type="number"
                className="form-control-sm"
                onChange={(e) => setNoTelephone(e.target.value)}
                value={noTelephone}
              />
            </div>
            <div className="d-flex mb-2">
              <div className="label">Provinsi</div>
              <Select
                type="select id"
                defaultValue="Pilih Provinsi"
                data={dataProvince}
                onChange={onProvince}
              />
            </div>
            <div className="d-flex mb-2">
              <div className="label">Kota</div>
              <Select
                type="select id"
                defaultValue="Pilih Kota"
                data={dataKabupaten}
                disabled={provinsi?.length ? false : true}
                onChange={onCity}
              />
            </div>
            <div className="d-flex mb-2">
              <div className="label">Kecamatan</div>
              <Select
                type="select id"
                defaultValue="Pilih Kecamatan"
                data={dataKecamatan}
                disabled={kabupaten?.length ? false : true}
                onChange={onKecamatan}
              />
            </div>
            <div className="d-flex mb-2">
              <div className="label">Kelurahan</div>
              <Select
                type="select id"
                defaultValue="Pilih Kelurahan"
                data={dataKelurahan}
                disabled={kecamatan?.length ? false : true}
                onChange={onKelurahan}
              />
            </div>
            <div className="d-flex">
              <div className="label">Detail</div>
              <Input
                type="textarea"
                onChange={(e) => setDetail(e.target.value)}
                value={detail}
              />
            </div>
          </div>
          <div className=" mt-3">
            <Button type="btn-add" onClick={sendAddress}>
              Tambah Alamat
            </Button>
          </div>
        </div>
      </Widgets>
    </Navbar>
  );
}
