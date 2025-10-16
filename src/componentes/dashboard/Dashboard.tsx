import {  useState } from 'react'
import './Dashboard.css'
import { dashboardService } from '../../service/dashboardService'
import { DashboardCard } from './DashboardCard/DashboardCard'
import { Alert, Snackbar } from '@mui/material'
import { useOnInit } from '../../domain/CustomHooks/useOnInit'
import { DialogComponent } from './DialogComponent/DialogComponent'


export const Dashboard = () => {
  
  const dashboardItemsMap = new Map<string, DashboardItem>([
    ["recomendations", new DashboardItem("Recomendations",0, "recomendations.svg", "recomendations")],
    ["books", new DashboardItem("Total number of books", 0, "book.svg", "books")],
    ["centers", new DashboardItem("Active Read Centers", 0, "center.svg")],
    ["users", new DashboardItem("Active Users", 0, "user-circle.svg")]
    ])

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success')
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmDialogUsers, setConfirmDialogUsers] = useState(false)
  const [confirmDialogCenters, setConfirmDialogCenters] = useState(false)
  const [dashboardMap, useDashboardMap] = useState<Map<string, DashboardItem>>({...dashboardItemsMap})


  const fetchData = async () => {
    try {
      //const totalOld = totalObjects(dashboardMap)
      const total = await dashboardService.getDashboardData();
      dashboardItemsMap!.get("recomendations")!.setData(total.totalRecomendaciones)
      dashboardItemsMap!.get("books")!.setData(total.totalLibros)
      dashboardItemsMap!.get("centers")!.setData(total.totalCentros)
      dashboardItemsMap!.get("users")!.setData(total.totalUsuarios)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDashboardMap(dashboardItemsMap)
    } catch (error) {
      snackbarRespone(`${error}`, "error")
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const snackbarRespone = (message : string, status: "error" | "success" | "info") => {
    setSnackbarSeverity(status)
    setOpenSnackbar(true)
    setErrorMessage(message)
  }

  const deleteUsers = async () => {
    try {
      const updatedElements = await dashboardService.deleteUsers()
      await fetchData()
      checkUpdated(updatedElements)
    } catch (error: unknown) {
      snackbarRespone(`${error}`, "error")
    }
  }

  const deleteCenters = async () => {
    try {
      const updatedElements = await dashboardService.deleteCenters()
      await fetchData()
      checkUpdated(updatedElements)
    } catch (error: unknown) {
      snackbarRespone(`${error}`, "error")
    }
  }


  const checkUpdated = (updatedElements:number) => {
    if (!(updatedElements > 0)) {
      snackbarRespone("All inactive elemnts have benn already deleted", "info")
    } else {
      snackbarRespone("Operation succesfully executed", "success")
    }
  }



  const changeDialogState = (dialogType : React.Dispatch<React.SetStateAction<boolean>>) => () => {
    dialogType(true)
  }



  useOnInit(fetchData);
  
  return <>
    <h1 className='titulo'>Indicators</h1>
    <section className="indicadores">
      {Array.from(dashboardMap).map(([, value]) => {
        return <DashboardCard title={value.title} data={value.data} svg={value.svg} test={value.testId}></DashboardCard>
      })}
    </section>
    <h2 className="titulo">Actions</h2>
    <section className="acciones">
      <button data-testid="delete-users" className="btn-admin" onClick={changeDialogState(setConfirmDialogUsers)}>Delete inactive users</button>
      {confirmDialogUsers && <DialogComponent state={confirmDialogUsers} modifyState={setConfirmDialogUsers} msg={"Are you soure you want to delete all inactive users?"} deleteFun={deleteUsers}></DialogComponent>}
      <button data-testid="delete-centers" className="btn-admin" onClick={changeDialogState(setConfirmDialogCenters)}>Delete inactive centers</button>
      {confirmDialogCenters && <DialogComponent state={confirmDialogCenters} modifyState={setConfirmDialogCenters} msg={"Are you soure you want to delete all inactive centers?"} deleteFun={deleteCenters}></DialogComponent>}
      
    </section>
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {errorMessage}
                </Alert>
    </Snackbar>
  </>
}

class DashboardItem{
  constructor(
    public title : string,
    public data : number,
    public svg : string,
    public testId : string = ""
  ){}

  setData(number:number){
    this.data = number
  }
}