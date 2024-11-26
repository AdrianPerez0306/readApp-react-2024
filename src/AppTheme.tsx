import { blue, blueGrey, brown, deepOrange, deepPurple, green, grey, indigo, purple, red } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";


export const appTheme = (mode: boolean) => {
  return createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      ...(mode ? {
        primary: { main: blueGrey[700] },
        secondary: { main: blueGrey[700] },
        cardColor: { main: indigo[700] },
        details: { main: purple[200] },
        success: { main: green[200] },
        background: {
          default: blueGrey[900]
        }
      } : {
        primary: { main: deepOrange[300] },
        secondary: { main: deepOrange[600] },
        cardColor: { main: deepOrange[100] },
        details: { main: purple[200] },
        success: { main: green[500] },
        background: {
          default: deepOrange[50]
        }
      })
    },
  });
}

