import React, { Component } from 'react';
import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Dialog from '../../components/Dialog';
import DeviceEdit from './Edit';
import DeviceForm from './Form';
import { CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
  centered: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [
        { name: 'uid', label: 'UID' },
        { name: 'vendor', label: 'Vendor' },
        { name: 'status', label: 'Status' },
      ],
      selectedRows: [],
      open: false,
      device: {
        uid: null,
        vendor: null,
        status: null,
      },
      loading: false,
    };
  }

  componentDidMount() {
    this.loadDatatable();
  }

  loadDatatable = () => {
    this.setState({ loading: true });
    Axios.get('/devices')
      .then((res) => {
        this.setState({ rows: res.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  handleDelete = () => {
    this.setState({ open: false });
    this.state.selected.map((row) => {
      return this.deleteDevice(this.state.rows[row.index]._id);
    });
  };

  deleteDevice = (id) => {
    Axios.delete(`/devices/${id}`)
      .then((res) => {
        this.loadDatatable();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  options = {
    serverSide: true,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'rowSelectionChange':
          this.setState({
            selected: tableState.selectedRows.data,
          });
          if (tableState.selectedRows.data.length === 1) {
            let data = this.state.rows[tableState.selectedRows.data[0].index];
            this.setState({
              device: data,
            });
          } else
            this.setState({
              device: {
                _id: null,
              },
            });
          break;
        case 'rowDelete':
          this.setState({ open: true });
          //this.handleDelete();
          break;
        default:
          break;
      }
    },
    filter: true,
    selectableRows: 'multiple',
    filterType: 'dropdown',
    responsive: 'vertical',
    rowsPerPage: 10,
    selectableRowsOnClick: true,
  };

  render() {
    var boton = this.state.device._id ? (
      <DeviceEdit
        loadDatatable={this.loadDatatable}
        device={this.state.device}
      />
    ) : (
      <DeviceForm
        loadDatatable={this.loadDatatable}
        device={this.state.device}
      />
    );

    const { classes } = this.props;

    if (this.state.loading) {
      return (
        <div className={classes.centered}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div>
        {boton}
        <br />
        <MUIDataTable
          title={'Devices list'}
          data={this.state.rows}
          columns={this.state.columns}
          options={this.options}
        />
        <Dialog
          open={this.state.open}
          dialogTitle={'Delete selected Devices'}
          dialogText={'Warning! This action cant be disband. Are you sure?'}
          handleClose={this.handleClose}
          handleConfirm={this.handleDelete}
        />
      </div>
    );
  }
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Devices);
