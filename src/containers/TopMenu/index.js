import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Dashboard, AddToHomeScreen, OpenInBrowser } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            GatewaysApp
          </Typography>
          <ButtonLink to='/' text='Home' icon={<Dashboard />} color='inherit' />
          <ButtonLink
            to='/gateways'
            text='Gateways'
            icon={<OpenInBrowser />}
            color='inherit'
          />
          <ButtonLink
            to='/devices'
            text='Devices'
            icon={<AddToHomeScreen />}
            color='inherit'
          />
          {/* <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

function ButtonLink(props) {
  const { icon, text, to, variant, color } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <>
      <Button
        variant={variant}
        color={color}
        startIcon={icon}
        component={renderLink}
      >
        {text}
      </Button>
    </>
  );
}

ButtonLink.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string.isRequired,
};
