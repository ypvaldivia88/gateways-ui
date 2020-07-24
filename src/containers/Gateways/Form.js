import React, { Component } from 'react';

import {
  Button,
  Switch,
  FormControlLabel,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  TextareaAutosize,
} from '@material-ui/core';
import axios from 'axios';

class GatewayNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serial: '',
      name: '',
      ipv4: '',
      description: '',
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
    const { serial, name, ipv4, description } = this.state;
    const gateway = {
      serial: serial,
      name: name,
      ipv4: ipv4,
      description: description,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post('/gateways', gateway, config)
      .then((result) => {
        this.props.loadDatatable();
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
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
          m={2}
        >
          New Gateway
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New gateway</DialogTitle>
          <DialogContent>
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
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default GatewayNew;
