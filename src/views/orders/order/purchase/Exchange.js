import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/ExchangePaging';
import { WAITING_FOR_CONFIRM } from '../../../../configs/Constants';
import {
  countWantPurchase,
  wantChangePurchase,
} from '../../../../redux/actions/Exchange';
import NoOrderScreen from '../NoOrderScreen';
import ExchangeItem from './ExchangeItem';
import Loader from '../../../../components/shared-components/Spinner';

const WaitingConfirm = (props) => {
  const {
    wantChangePurchase,
    wantPurchase,
    countWantPurchase,
    wantPurchaseCount,
    loading,
  } = props;

  const own = JSON.parse(localStorage.getItem('userInfo'));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    wantChangePurchase(own && own.id, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countWantPurchase(own && own.id);
  }, []);

  return loading ? (
    <Loader />
  ) : wantPurchase && wantPurchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {wantPurchase &&
            wantPurchase.map((item) => (
              <ExchangeItem key={item.idOrderDetail} item={item} status={1} />
            ))}
        </ListGroup>
        <Paging
          count={wantPurchaseCount && wantPurchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={wantChangePurchase}
          own={own}
          type={WAITING_FOR_CONFIRM}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order, exchange }) => {
  return {
    wantPurchase: exchange.wantPurchase,
    wantPurchaseCount: exchange.wantPurchaseCount,
    loading: exchange.loading,
  };
};

const mapDispatchToProps = {
  wantChangePurchase,
  countWantPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
