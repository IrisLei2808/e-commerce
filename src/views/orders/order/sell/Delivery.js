import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/Paging';
import { DELIVERY } from '../../../../configs/Constants';
import {
  sellCountDelivery,
  sellDelivery,
} from '../../../../redux/actions/Order';
import NoOrderScreen from '../NoOrderScreen';
import DeliveryItem from './DeliveryItem';
import Loader from '../../../../components/shared-components/Spinner';

const Delivery = (props) => {
  const { sellDelivery, sellCountDelivery, delivery, deliveryCount, loading } =
    props;

  const own = JSON.parse(localStorage.getItem('userInfo'));
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellDelivery(own && own.id, DELIVERY, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    sellCountDelivery(own && own.id, DELIVERY);
  }, []);

  return loading ? (
    <Loader />
  ) : delivery && delivery.length > 0 ? (
    <>
      <Row>
        <Col>
          <ListGroup variant="flush">
            {delivery &&
              delivery.map((item) => (
                <DeliveryItem key={item.idOrderDetail} item={item} status={3} />
              ))}
          </ListGroup>
          <Paging
            count={deliveryCount && deliveryCount}
            page={page}
            setPage={setPage}
            limit={limit}
            purchaseRequest={sellDelivery}
            own={own}
            type={DELIVERY}
          />
        </Col>
      </Row>
    </>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ order }) => {
  return {
    delivery: order && order.sellDelivery,
    deliveryCount: order && order.sellDeliveryCount,
    loading: order && order.loading,
  };
};

const mapDispatchToProps = {
  sellDelivery,
  sellCountDelivery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
