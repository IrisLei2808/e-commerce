import { makeStyles } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addMoney } from '../../../redux/actions/Cart';
import { ADD_MONEY_SUCCESS } from '../../../redux/constants/Cart';
import { useLocalStorage, openInNewTab } from '../../../utils/utilities';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  label: {
    textTransform: 'none',
  },
}));

const TransactionSuccess = (props) => {
  let history = useHistory();

  const { addMoney, type, loading, url } = props;

  const [user, setUser] = useLocalStorage('userInfo');
  const [money, setMoney] = useState('');

  const handleAddMoney = () => {
    addMoney(user.id, money);
  };

  const classes = useStyles();

  useEffect(() => {
    switch (type) {
      case ADD_MONEY_SUCCESS:
        openInNewTab(url && url);
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(to right, #de6262, #ffb88c)',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        }}
      >
        <h3 style={{ color: '#fff', fontSize: 23, margin: 0 }}>Nạp tiền</h3>
      </div>
      <div
        style={{
          background: '#fff',
          height: '30vh',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Image
            src={`${window.location.origin}/images/check-circle.gif`}
            fluid
            rounded
            style={{ width: 100, height: 100 }}
          />
          <span className="d-flex" style={{ flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: 25, marginLeft: 30 }}>
              Nạp tiền thành công
            </span>
          </span>
        </span>
        <div style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
          <Link
            title="Nạp tiền"
            to="/"
            style={{ fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  return {
    loading: cart && cart.transactionLoading,
    url: cart && cart.url,
    type: cart && cart.type,
  };
};

const mapDispatchToProps = {
  addMoney,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSuccess);
