const formatRupiah = (data) => {
  const angka = parseInt(data);
  let number_string = angka?.toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return "Rp. " + rupiah;
};

const token = () => {
  return localStorage.getItem("auth") || null;
};

export { formatRupiah, token };
