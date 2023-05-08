import { useEffect } from "react";
import {
  Button,
  Input,
  LabelPages,
  Select,
  Switcher,
} from "../../../../component";
import ContainerAdmin from "../../../../component/container/ContainerAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../../features/CategorySlice";
import { useState } from "react";
import { fetchTag } from "../../../../features/TagSlice";
import "./style.scss";

export default function AddProduct() {
  const dispatch = useDispatch();
  const data = useSelector((data) => data.category.categories);
  const tags = useSelector((data) => data.tag.tag);
  const [btnDisable, setBtnDisable] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [tag, setTag] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [photo, setPhoto] = useState();

  const selectTags = (e) => {
    if (e.target.value !== tag.find((item) => item === e.target.value)) {
      setTag([...tag, e.target.value]);
    }
  };

  const deleteTag = (select) => {
    setTag(
      tag
        .splice(0, tag.indexOf(select))
        .concat(tag.slice(tag.indexOf(select) + 1))
    );
  };

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

  console.log(
    "name",
    name,
    "categories",
    categories,
    "tag",
    tag,
    "desc",
    description,
    "price",
    price,
    "stock",
    stock
  );

  useEffect(() => {
    if (
      name === "" ||
      categories === "" ||
      tag === [] ||
      description === "" ||
      price === 0 ||
      stock === 0
    ) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [name, categories, tag, description, price, stock, btnDisable]);

  const submitProduct = () => {
    if (name > 40) {
      alert("please input name product max 40 character");
    }
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const Label = ({ label }) => {
    return (
      <>
        <div className="label">{label}</div>
        <div className="me-2">:</div>
      </>
    );
  };

  return (
    <ContainerAdmin>
      <LabelPages
        type="back"
        label="Tambah Product"
        to="/admin/kelola-product"
      />

      <div className="p-3 border rounded">
        <div className="mb-3 fw-bold">Informasi Product</div>
        <div className="form-input d-flex mb-2">
          <Label label="Nama Product" />
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
          <Label label="Kategori" />
          <div className="w-100">
            <div>
              <Select
                data={data}
                label="Select Role"
                className="form-select-sm"
                onChange={(e) => setCategories(e.target.value)}
                value={categories}
              />
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Tag" />
          <div className="w-100">
            <div>
              <Select
                data={tags}
                label="Select Role"
                className="form-select-sm"
                onChange={selectTags}
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
          <Label label="Description" />
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
          <Label label="Harga" />
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
          <Label label="Description" />
          <div className="w-100">
            <div>
              <Switcher checked="true" label="Aktif" disabled="true" />
            </div>
            <div className="desc">
              Jika status Aktif, Produk dapat dicari pembeli
            </div>
          </div>
        </div>
        <div className="form-input d-flex mb-2">
          <Label label="Stock" />
          <div className="w-100">
            <div>
              <Input
                type="number"
                className="form-select-sm"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <Button type="btn-add" disabled={btnDisable} onClick={submitProduct}>
          Tambah Product
        </Button>
      </div>
    </ContainerAdmin>
  );
}
