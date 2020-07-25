import React, { Component } from 'react';

import {
  Button,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import axios from 'axios';

class GatewayEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.gateway._id,
      serial: props.gateway.serial,
      name: props.gateway.name,
      ipv4: props.gateway.ipv4,
      description: props.gateway.description,
      devices: props.gateway.devices,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { _id, serial, name, ipv4, description, devices } = this.state;
    const gateway = {
      serial: serial,
      name: name,
      ipv4: ipv4,
      description: description,
      devices: devices,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .put(`/gateways/${_id}`, gateway, config)
      .then((result) => {
        this.props.loadGateways();
        this.setState({ open: false });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    var devicesList = this.state.devices.map(function (device) {
      return (
        <ListItem button>
          <ListItemText primary={device.uid} />
          <ListItemText primary={device.vendor} />
          <ListItemText primary={device.status} />
        </ListItem>
      );
    });
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
          m={2}
        >
          Edit Gateway
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Edit gateway</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='_id'
              name='_id'
              label='ID'
              type='text'
              fullWidth
              value={this.state._id}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='serial'
              name='serial'
              label='Serial'
              type='text'
              fullWidth
              value={this.state.serial}
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='name'
              name='name'
              label='Name'
              type='text'
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='ipv4'
              name='ipv4'
              label='IPv4'
              type='text'
              fullWidth
              value={this.state.ipv4}
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='description'
              name='description'
              label='Description'
              type='text'
              fullWidth
              multiline
              rows={3}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <List
              component='nav'
              aria-label='devices list'
              subheader={
                <ListSubheader component='div' id='devices-list-subheader'>
                  Linked Devices
                </ListSubheader>
              }
            >
              <ListItem button>
                <ListItemText fontWeight='fontWeightBold' primary='UID' />
                <ListItemText fontWeight='fontWeightBold' primary='Vendor' />
                <ListItemText fontWeight='fontWeightBold' primary='Status' />
              </ListItem>
              {devicesList}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant={'outlined'}
              color='primary'
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant={'contained'}
              color='primary'
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default GatewayEdit;
