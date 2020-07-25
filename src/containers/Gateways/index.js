import React, { Component } from 'react';
import Axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Dialog from '../../components/Dialog';
import GatewayEdit from './Edit';
import GatewayForm from './Form';
import { CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
  centered: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

class Gateways extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [
        { name: 'serial', label: 'Serial' },
        { name: 'name', label: 'Name' },
        { name: 'ipv4', label: 'IPv4' },
        { name: 'description', label: 'Description' },
      ],
      selectedRows: [],
      open: false,
      gateway: {
        serial: null,
        name: null,
        ipv4: null,
        description: null,
      },
      loading: false,
    };
  }

  componentDidMount() {
    this.loadGateways();
  }

  loadGateways = () => {
    this.setState({ loading: true });
    Axios.get('/gateways')
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
      return this.deleteGateway(this.state.rows[row.index]._id);
    });
  };

  deleteGateway = (id) => {
    Axios.delete(`/gateways/${id}`)
      .then((res) => {
        alert(res.data.message);
        this.loadGateways();
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
              gateway: data,
            });
          } else
            this.setState({
              gateway: {
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
    var boton = this.state.gateway._id ? (
      <GatewayEdit
        loadGateways={this.loadGateways}
        gateway={this.state.gateway}
      />
    ) : (
      <GatewayForm
        loadGateways={this.loadGateways}
        gateway={this.state.gateway}
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
          title={'Gateways list'}
          data={this.state.rows}
          columns={this.state.columns}
          options={this.options}
        />
        <Dialog
          open={this.state.open}
          dialogTitle={'Delete selected Gateways'}
          dialogText={'Warning! This action cant be disband. Are you sure?'}
          handleClose={this.handleClose}
          handleConfirm={this.handleDelete}
        />
      </div>
    );
  }
}

Gateways.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gateways);
