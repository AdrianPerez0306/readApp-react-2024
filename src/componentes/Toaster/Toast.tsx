import { ReactNode } from 'react';
import './Toast.css'

let toastCounter = 0
export const Toast = ({ message, type }: { message: ReactNode; type: ToastType }) => {

    const aumentarId = () => {
        toastCounter+=1
        return toastCounter.toString()
    }
    return (
        <div className={`toast ${type} show`} id="toast" itemID={aumentarId()}>
            <span>{message}</span>
        </div>
    )

}

export type ToastType = 'success' | 'error' | 'info' | 'warning'