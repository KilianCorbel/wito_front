import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
    
});

class TableGestionCoursProfesseur extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        order : React.useState('asc'),
        orderBy : React.useState('calories'),
        selected: React.useState([]),
        page: React.useState(0),
        dense : React.useState(false),
        rowsPerPage : React.useState(5),
        emptyRows : '',

         rows : [

          this.createData('AOS', '18/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('COOL', '18/10/2019',"IBGBI 111", "8h30", "11h45"),
          this.createData('DLL', '12/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('ARSI', '11/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('DROIT', '22/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('AOS', '18/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('GESO', '16/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('AOS', '18/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('AOS', '18/10/2019',"IBGBI 113", "8h30", "11h45"),
          this.createData('AOS', '18/10/2019',"IBGBI 113", "8h30", "11h45"),
        ],
        
        }
    }

    componentDidMount() {
      let currentComponent = this;

      this.setState({emptyRows : (this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.rows.length - this.state.page * this.state.rowsPerPage))});

    }

    handleSubmit(event) {
      event.preventDefault();

    }

    handleClickOpen = () => {
     
    };


  
    handleRequestSort = (event, property) => {
      const isDesc = this.state.orderBy === property && this.state.order === 'desc';
      var ord =isDesc ? 'asc' : 'desc';
      this.setState({order : ord, orderBy : property});
    };
  
    handleSelectAllClick = event => {
      if (event.target.checked) {
        const newSelecteds = this.state.rows.map(n => n.name);
        this.setState({selected : newSelecteds});
        return;
      }
      this.setState({selected : []});
    };
  
    handleClick = (event, name) => {
      const selectedIndex = this.state.selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(this.state.selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(this.state.selected.slice(1));
      } else if (selectedIndex === this.state.selected.length - 1) {
        newSelected = newSelected.concat(this.state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          this.state.selected.slice(0, selectedIndex),
          this.state.selected.slice(selectedIndex + 1),
        );
      }
  
      this.setState({selected : newSelected});
    };
  
    handleChangePage = (event, newPage) => {
      this.setState({page : newPage});
    };
  
    handleChangeRowsPerPage = event => {
      this.setState({rowsPerPage : parseInt(event.target.value, 10)});
      this.setState({page : 0});
    };

    isSelected = name => this.state.selected.indexOf(name) !== -1;


   createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
}

    render(){
      const {classes} = this.props;
      return(
        <div className={classes.root}>
        <Button
             variant="contained"
             color="primary"
             size="large"
             className={classes.button}
             onClick={this.handleClickOpen}
             startIcon={<AddIcon />}
           >
             Cours
           </Button>
       <Paper className={classes.paper}>
         <EnhancedTableToolbar numSelected={this.state.selected.length} />
         <div className={classes.tableWrapper}>
           <Table
             className={classes.table}
             aria-labelledby="tableTitle"
             size={this.state.dense ? 'small' : 'medium'}
             aria-label="enhanced table"
           >
             <EnhancedTableHead
               classes={classes}
               numSelected={this.state.selected.length}
               order={this.state.order}
               orderBy={this.state.orderBy}
               onSelectAllClick={handleSelectAllClick}
               onRequestSort={handleRequestSort}
               rowCount={this.state.rows.length}
             />
             <TableBody>
                     <TableRow
                       hover
                       onClick={event => handleClick(event, this.state.row.name)}
                       role="checkbox"
                       aria-checked={isItemSelected}
                       tabIndex={-1}
                       key={this.state.row.name}
                       selected={isItemSelected}
                     >
                       <TableCell padding="checkbox">
                         <Checkbox
                           checked={isItemSelected}
                           inputProps={{ 'aria-labelledby': labelId }}
                         />
                       </TableCell>
                       <TableCell component="th" id={labelId} scope="row" padding="none">
                         {this.state.row.name}
                       </TableCell>
                       <TableCell align="right">{this.state.row.calories}</TableCell>
                       <TableCell align="right">{this.state.row.fat}</TableCell>
                       <TableCell align="right">{this.state.row.carbs}</TableCell>
                       <TableCell align="right">{this.state.row.protein}</TableCell>
                     </TableRow>
                  
                 
               {this.state.emptyRows > 0 && (
                 <TableRow style={{ height: (this.state.dense ? 33 : 53) * this.state.emptyRows }}>
                   <TableCell colSpan={6} />
                 </TableRow>
               )}
             </TableBody>
           </Table>
         </div>
         <TablePagination
           rowsPerPageOptions={[5, 10, 25]}
           component="div"
           count={this.state.rows.length}
           rowsPerPage={this.state.rowsPerPage}
           page={this.state.page}
           backIconButtonProps={{
             'aria-label': 'previous page',
           }}
           nextIconButtonProps={{
             'aria-label': 'next page',
           }}
           onChangePage={handleChangePage}
           onChangeRowsPerPage={handleChangeRowsPerPage}
         />
       </Paper>
 
     </div>
    );
  }
}

TableGestionCoursProfesseur.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableGestionCoursProfesseur)