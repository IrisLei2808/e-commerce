import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/ExchangePaging';
import { WAITING_FOR_CONFIRM } from '../../../../configs/Constants';
import {
  countWantSell,
  wantChangeSell,
} from '../../../../redux/actions/Exchange';
import NoOrderScreen from '../NoOrderScreen';
import ExchangeItem from './ExchangeItem';
import Loader from '../../../../components/shared-components/Spinner';

const WaitingConfirm = (props) => {
  const {
    wantChangeSell,
    wantPurchase,
    countWantSell,
    wantPurchaseCount,
    loading,
  } = props;

  const own = JSON.parse(localStorage.getItem('userInfo'));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    wantChangeSell(own && own.id, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countWantSell(own && own.id);
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
          purchaseRequest={wantChangeSell}
          own={own}
          type={WAITING_FOR_CONFIRM}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ exchange }) => {
  return {
    wantPurchase: exchange.wantSell,
    wantPurchaseCount: exchange.wantSellCount,
    loading: exchange && exchange.loading,
  };
};

const mapDispatchToProps = {
  wantChangeSell,
  countWantSell,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
