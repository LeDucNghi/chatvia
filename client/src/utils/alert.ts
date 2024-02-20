import Swal from "sweetalert2";
import { toast } from "react-toastify";

export interface Alert {
  type: "error" | "success" | "info" | "warning";
  content: string;
  position:
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "top-center"
    | "top-left";

  theme?: "colored" | "dark" | "light";
  autoClose?: number;
}

export interface SweetAlert {
  title: string;
  showDenyButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  denyButtonText?: string;

  isConfirmedText?: string;
  isDeniedText?: string;

  isConfirmedFunc?: () => any;
  isDeniedFunc?: () => any;
}

export const alert = (params: Alert) => {
  return toast(params.content, {
    position: params.position,
    autoClose: params.autoClose ? params.autoClose : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: params.theme ? params.theme : "dark",
    type: params.type,
  });
};

export const sweetalert = (params: SweetAlert) => {
  return Swal.fire({
    title: params.title,
    showDenyButton: params.showDenyButton ? params.showDenyButton : false,
    showCancelButton: params.showCancelButton ? params.showCancelButton : false,
    confirmButtonText: params.confirmButtonText,
    denyButtonText: params.denyButtonText,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire(params.isConfirmedText, "", "success");
      params.isConfirmedFunc!();
    } else if (result.isDenied) {
      Swal.fire(params.isDeniedText, "", "error");
      params.isDeniedFunc!();
    }
  });
};
