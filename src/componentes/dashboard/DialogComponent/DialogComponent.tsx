import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"


export const DialogComponent = ({state ,msg ,deleteFun, modifyState} : {state:boolean, msg:string, deleteFun : () => Promise<void>, modifyState : React.Dispatch<React.SetStateAction<boolean>>}) =>{
    

      const cerrarDialogo = () => {
        modifyState(false)

      }

      const realizarAccion = () =>{
        deleteFun()
        cerrarDialogo()
      }

    return <Dialog open={state} onClose={cerrarDialogo}>
    <DialogTitle>{msg}</DialogTitle>
    <DialogActions>
      <Button onClick={cerrarDialogo} autoFocus>Close</Button>
      <Button onClick={realizarAccion} variant="contained" color="error">Accept</Button>
    </DialogActions>
  </Dialog>
}