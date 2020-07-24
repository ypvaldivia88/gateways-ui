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
} from '@material-ui/core';
import axios from 'axios';

class DeviceNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      vendor: '',
      status: false,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { value, name } = e.target;
    if (name === 'status') value = e.target.checked;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { uid, vendor, status } = this.state;
    const device = {
      uid: uid,
      vendor: vendor,
      status: status ? 'online' : 'offline',
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post('/devices', device, config)
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
          New Device
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>New device</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='uid'
              name='uid'
              label='UID'
              type='text'
              fullWidth
              value={this.state.uid}
              onChange={this.handleChange}
            />
            <TextField
              margin='dense'
              id='vendor'
              name='vendor'
              label='Identifier'
              type='text'
              fullWidth
              value={this.state.vendor}
              onChange={this.handleChange}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.status}
                  onChange={this.handleChange}
                  id='status'
                  name='status'
                />
              }
              label='Is online?'
              labelPlacement='end'
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

export default DeviceNew;
