import { useEffect } from "react";
import {
  Button,
  Input,
  LabelPages,
  Select,
  Sidebar,
  Switcher,
} from "../../../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../../features/CategorySlice";
import { useState } from "react";
import { fetchTag } from "../../../../features/TagSlice";
import "./style.scss";
import { addProduct } from "../../../../features/ProductSlice";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export default function AddProduct() {
  const token = localStorage.getItem("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((data) => data.category.categories);
  const dataTags = useSelector((data) => data.tag.tag);
  const loading = useSelector((state) => state.product.pending);

  const [btnDisable, setBtnDisable] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [photo, setPhoto] = useState("");
  const [discount, setDiscount] = useState("");

  //request data tag and category to server
  useEffect(() => {
    dispatch(fetchTag());
    dispatch(fetchCategory());
  }, [dispatch]);

  //onChange field tags
  const selectTags = (e) => {
    if (e.target.value !== tag.find((item) => item === e.target.value)) {
      setTag([...tag, e.target.value]);
    }
  };

  //delete tags
  const deleteTag = (select) => {
    setTag(
      tag
        .splice(0, tag.indexOf(select))
        .concat(tag.slice(tag.indexOf(select) + 1))
    );
  };

  //onChange upload photo Product
  const handleChangePhoto = (e) => {
    if (
      e?.target?.files[0].type === "image/jpg" ||
      e?.target?.files[0].type === "image/png" ||
      e?.target?.files[0].type === "image/jpeg"
    ) {
      const size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

      if (size > 2) {
        alert("please select image size less than 3 MB");
      } else {
        setPhoto(e.target.files[0]);
      }
    } else {
      alert("Please input Image format PNG / JPG / JPEG");
    }
  };

  //create efffect for disabled button
  useEffect(() => {
    if (
      name === "" ||
      categories === "" ||
      tag === [] ||
      description === "" ||
      price === undefined
    ) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [name, categories, tag, description, price, stock, btnDisable]);

  //send new data product to server
  const submitProduct = async () => {
    if (name > 40) {
      alert("please input name product max 40 character");
    } else {
      try {
        const createProduct = await dispatch(
          addProduct({
            photo,
            name,
            description,
            price,
            category: categories,
            tags: tag,
            discount,
            token,
          })
        );
        const result = unwrapResult(createProduct);
        if (result) {
          navigate("/admin/kelola-product");
          Swal.fire("Success!", "Berhasil Menambahkan Product", "success");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal Menambahkan Product",
        });
      }
    }
  };

  //component label
  const Label = ({ label, required }) => {
    return (
      <>
        <div className="label">
          {label}
          {required && <span className="ms-2 required">(Wajib)</span>}
        </div>
        <div className="me-2">:</div>
      </>
    );
  };

  return (
    <Sidebar>
      <LabelPages type="back" label="Tambah Product" to={-1} />
      <div className="p-3 border rounded">
        <div className="mb-3 fw-bold">Informasi Product</div>
        <div className="form-input d-flex mb-2">
          <Label label="Nama Product" required />
          <div className="w-100">
            <div>
              <Input
                type="text"
                className="form-control-sm "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="desc">*Nama product maksimal 40 character</div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Kategori" required />
          <div className="w-100">
            <div>
              <Select
                data={data}
                className="form-select-sm"
                onChange={(e) => setCategories(e.target.value)}
                defaultValue="Pilih Category"
              />
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Tag" />
          <div className="w-100">
            <div>
              <Select
                data={dataTags}
                label="Select Role"
                className="form-select-sm"
                onChange={selectTags}
                defaultValue="Pilih Tag"
              />
              <div className="d-flex">
                {tag?.map((item, index) => (
                  <div className="tag p-1 px-2 me-2 mt-1 d-flex " key={++index}>
                    <div>{item}</div>
                    <div className="tag-close" onClick={() => deleteTag(item)}>
                      x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 p-3 border rounded">
        <div className="mb-3 fw-bold">Detail Product</div>
        <div className="form-input d-flex mb-2">
          <Label label="Photo Product" />
          <div className="w-100">
            <div>
              <Input
                type="file"
                className="form-select-sm"
                accept="image/*"
                onChange={handleChangePhoto}
              />
            </div>
            <div className="desc">
              Please input Image format PNG / JPG / JPEG
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Description" required />
          <div className="w-100">
            <div>
              <Input
                type="textarea"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="desc">
              Description Product Maksimal 100 Character
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 p-3 border rounded">
        <div className="mb-3 fw-bold">Detail Product</div>
        <div className="form-input d-flex mb-2">
          <Label label="Harga" required />
          <div className="w-100">
            <div>
              <Input
                type="number"
                className="form-select-sm"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Discount" />
          <div className="w-25">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Discount"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
              <span className="input-group-text" id="basic-addon2">
                %
              </span>
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Status" />
          <div className="w-100">
            <div>
              <Switcher checked="true" label="Aktif" disabled="true" />
            </div>
            <div className="desc">
              Jika status Aktif, Produk dapat dicari pembeli
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <div>
          <Button type="btn-add" disabled={btnDisable} onClick={submitProduct}>
            {loading ? "Loading..." : " Tambah Product"}
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
