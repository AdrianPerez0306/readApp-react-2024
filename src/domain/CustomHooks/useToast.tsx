import { ReactNode, useState } from "react"
import { Toast, ToastType } from "../../componentes/Toaster/Toast"



export const useToast = () =>{
    const [toastList, setToasts] = useState<ToastParams[]>([])

    const showToast = (message : string, type :ToastType) => {
        setToasts([...toastList, {message:message, type:type}])
        setTimeout(()=>{
            setToasts(l=>l.slice(1))
        }, 2700)
    }

    const toast = (
        <>
        {toastList.map((toastParams) =>{
            return <Toast type={`${toastParams.type}`} message={`${toastParams.message}`}/>
        })}
        </>
    )


    return [toast, showToast]
}

export type ToastParams = {
    message:ReactNode,
    type:ToastType
}