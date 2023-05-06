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

  const selectTags = (e) => {
    setTag([...tag, e.target.value]);
  };

  console.log(categories);

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

  const submitProduct = () => {};

  const deleteTag = (select) => {
    setTag(tag.filter((item) => item !== select));
  };

  useEffect(() => {
    dispatch(fetchTag(`${process.env.REACT_APP_URL_API}/tag`));
    dispatch(fetchCategory());
  }, [dispatch]);

  const Box = ({ children, label, className }) => {
    return (
      <div className={`p-3 border rounded ${className}`}>
        <div className="mb-3 fw-bold">{label}</div>
        <div>{children}</div>
      </div>
    );
  };

  const Form = ({ children, label, description, className }) => {
    return (
      <div className={`form-input d-flex ${className}`}>
        <div className="label">{label}</div>
        <div className="me-2">:</div>
        <div className="w-100">
          <div>{children}</div>
          <div className="desc">{description}</div>
        </div>
      </div>
    );
  };

  return (
    <ContainerAdmin>
      <LabelPages
        type="back"
        label="Tambah Product"
        to="/admin/kelola-product"
      />

      <Box label="Informasi Product">
        <Form
          label="Nama Product"
          description="*Nama product maksimal 40 character"
          className="mb-2"
        >
          <Input type="text" className="form-control-sm " />
        </Form>
        <Form label="Kategori" className="mb-2">
          <Select
            data={data}
            label="Select Role"
            className="form-select-sm"
            onChange={(e) => setCategories(e.target.value)}
          />
        </Form>
        <Form label="Tags">
          <Select
            data={tags}
            label="Select Role"
            className="form-select-sm"
            onChange={selectTags}
          />
          <div className="d-flex">
            {tag?.map((item) => (
              <div className="tag p-1 px-2 me-2 mt-1 d-flex ">
                <div>{item}</div>
                <div className="tag-close" onClick={() => deleteTag(item)}>
                  x
                </div>
              </div>
            ))}
          </div>
        </Form>
      </Box>

      <Box label="Detail Product" className="mt-2">
        <Form label="Photo Product" className="mb-2">
          <Input type="file" className="form-select-sm" accept="image/*" />
        </Form>
        <Form
          label="Description"
          description="*Description Product Maksimal 100 Character"
        >
          <Input type="textarea" rows="5" />
        </Form>
      </Box>

      <Box label="Pengelolaan Product" className="mt-2">
        <Form label="Harga" className="mb-2">
          {" "}
          <Input type="number" className="form-select-sm" />
        </Form>
        <Form
          label="Status Product"
          description="Jika status Aktif, Produk dapat dicari pembeli"
        >
          <Switcher checked="true" label="Aktif" disabled="true" />
        </Form>
        <Form label="Stock" className="mt-2">
          <Input type="number" className="form-select-sm" />
        </Form>
      </Box>
      <div className="d-flex justify-content-end mt-2">
        <Button type="button-primary">Tambah Product</Button>
      </div>
    </ContainerAdmin>
  );
}
