import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/Paging';
import { WAITING_FOR_CONFIRM } from '../../../../configs/Constants';
import {
  wantChangePurchase,
  countWantPurchase,
} from '../../../../redux/actions/Exchange';
import NoOrderScreen from '../NoOrderScreen';
import ExchangeItem from './ExchangeItem';

const WaitingConfirm = (props) => {
  const {
    wantChangePurchase,
    wantPurchase,
    countWantPurchase,
    wantPurchaseCount,
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

  return wantPurchase && wantPurchase.length > 0 ? (
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
    purchase: order && order.purchase,
    purchaseCount: order && order.purchaseCount,
    wantPurchase: exchange.wantPurchase,
    wantPurchaseCount: exchange.wantPurchaseCount,
  };
};

const mapDispatchToProps = {
  wantChangePurchase,
  countWantPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingConfirm);
