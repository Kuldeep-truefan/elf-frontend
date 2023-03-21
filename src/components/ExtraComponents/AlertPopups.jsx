import { toast } from 'react-toastify';


export const triggerError = (errMsg='Something went wrong')=> toast.error(errMsg, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    })

export  const triggerSuccess = (successMsg='Successfully done')=> toast.success(successMsg, {
    position: "bottom-left",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    })