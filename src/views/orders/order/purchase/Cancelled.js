import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/Paging';
import { CANCELLED } from '../../../../configs/Constants';
import { cancelled, countCancelled } from '../../../../redux/actions/Order';
import NoOrderScreen from '../NoOrderScreen';
import PurchaseItem from './PurchaseItem';
import Loader from '../../../../components/shared-components/Spinner';

const Cancelled = (props) => {
  const { cancelled, purchase, countCancelled, purchaseCount, loading } = props;

  const own = JSON.parse(localStorage.getItem('userInfo'));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    cancelled(own && own.id, CANCELLED, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countCancelled(own && own.id, CANCELLED);
  }, []);

  return loading ? (
    <Loader />
  ) : purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <PurchaseItem key={item.idOrderDetail} item={item} status={5} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={cancelled}
          own={own}
          type={CANCELLED}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    purchase: order && order.cancelled,
    purchaseCount: order && order.countCancelled,
    loading: order && order.loading,
  };
};

const mapDispatchToProps = {
  cancelled,
  countCancelled,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cancelled);
