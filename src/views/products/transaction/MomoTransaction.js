import { makeStyles } from '@material-ui/core/styles';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addMoney } from '../../../redux/actions/Cart';
import { ADD_MONEY_SUCCESS } from '../../../redux/constants/Cart';
import { useLocalStorage, openInNewTab } from '../../../utils/utilities';

const LoadingButton = ({ loading, title, handleAddMoney }) => {
  return (
    <div>
      <Button
        className="btn btn-primary btn-block mt-4"
        type="submit"
        disabled={loading}
        style={{ margin: 'auto' }}
        size="lg"
        onClick={() => handleAddMoney()}
      >
        <span
          className={loading ? 'spinner-border spinner-border-sm' : ''}
          role="status"
          aria-hidden="true"
        ></span>
        {loading ? 'Loading...' : title}
      </Button>
    </div>
  );
};

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

const MomoTransaction = (props) => {
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
          height: '80vh',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundImage:
            'url(' + `${window.location.origin}/images/momo.jpg` + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="w-50"
          style={{
            background: '#fff',
            padding: 30,
            margin: 'auto',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            textAlign: 'center',
            borderRadius: 5,
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '0.5px solid grey',
              justifyContent: 'center',
            }}
          >
            <Image
              src={`${window.location.origin}/images/momo_icon.png`}
              fluid
              rounded
              style={{ width: 100, height: 100 }}
            />
            <span className="d-flex" style={{ flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold' }}>MOMO</span>
              <span>Thời gian xử lý: Ngay lập tức</span>
              <span>Phí: Miễn phí</span>
            </span>
          </span>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <CurrencyTextField
              label="Số Tiền Nạp"
              currencySymbol="VNĐ"
              outputFormat="string"
              className="mt-4 w-100"
              minimumValue="0"
              digitGroupSeparator=","
              decimalPlaces="0"
              placeholder="Giá *"
              required
              variant="outlined"
              onChange={(event, value) => setMoney(Number(value))}
            />
            <LoadingButton
              title="Nạp tiền"
              handleAddMoney={handleAddMoney}
              loading={loading}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MomoTransaction);
