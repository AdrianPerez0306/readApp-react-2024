import { blue, blueGrey, deepOrange, deepPurple, green, grey, purple, red } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";


export const appTheme = (mode: boolean) => {
  return createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      ...(mode ? {
        primary: { main: blueGrey[700] },
        secondary: { main: blueGrey[700] },
        success: { main: purple[200] },
        background: {
          default: blueGrey[900]
        }
      } : {
        primary: { main: deepOrange[400] },
        secondary: { main: deepOrange[300] },
        success: { main: deepOrange[500] },
        background: {
          default: deepOrange[50]
        }
      })
    },
  });
}

