import Swal from "sweetalert2";

export const Toast = ({ timer, position, icon, title }) => {
  const Toas = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toas.fire({
    icon,
    title,
  });
};
