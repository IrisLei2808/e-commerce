import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/Paging';
import { REFUND } from '../../../../configs/Constants';
import {
  getRefundRequest,
  countRefundRequest,
} from '../../../../redux/actions/Order';
import NoOrderScreen from '../NoOrderScreen';
import PurchaseItem from './PurchaseItem';
import Loader from '../../../../components/shared-components/Spinner';
import { useLocalStorage } from '../../../../utils/utilities';

const Return = (props) => {
  const {
    getRefundRequest,
    purchase,
    countRefundRequest,
    purchaseCount,
    loading,
  } = props;

  const [user, setUser] = useLocalStorage('userInfo');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRefundRequest(user.id, REFUND, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countRefundRequest(user.id, REFUND);
  }, []);

  return loading ? (
    <Loader />
  ) : purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={6} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={getRefundRequest}
          own={user}
          type={REFUND}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    purchase: order && order.refundList,
    purchaseCount: order && order.countRefund,
    loading: order && order.loading,
  };
};

const mapDispatchToProps = {
  getRefundRequest,
  countRefundRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Return);
