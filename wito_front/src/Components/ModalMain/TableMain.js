import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs,fin) {
  return { name, calories, fat, carbs, fin };
}

const rows = [
  createData('AOS', '11/09/2019', 118, '16h30', '18h00'),
  createData('AOS', '18/10/2019', 5, '13h00','8h30' ),
  createData('GESO', '12/10/2019', 116, '8h30','11h45'),
  createData('DLL', '18/09/2019', 113, '13h00', '16h15'),
  createData('ARSI', '15/10/2019', 'petit amphi', '8h30','11h45'),
];

export default function TableMain() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><b>Nom du cours</b></TableCell>
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b>Salle</b></TableCell>
              <TableCell align="center"><b>Heure de début de cours</b></TableCell>
              <TableCell align="center"><b>Heure de fin de cours</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.fin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
