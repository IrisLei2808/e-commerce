import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import Paging from '../../../../components/shared-components/RefundPaging';
import { REFUND } from '../../../../configs/Constants';
import {
  sellRefundRequest,
  countSellRefund,
} from '../../../../redux/actions/Mapping';
import NoOrderScreen from '../NoOrderScreen';
import RefundItem from './RefundItem';
import Loader from '../../../../components/shared-components/Spinner';
import { useLocalStorage } from '../../../../utils/utilities';

const Return = (props) => {
  const {
    sellRefundRequest,
    purchase,
    countSellRefund,
    purchaseCount,
    loading,
  } = props;

  const [user, setUser] = useLocalStorage('userInfo');
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    sellRefundRequest(user.id, {
      page: page,
      limit: limit,
    });
  }, []);

  useEffect(() => {
    countSellRefund(user.id);
  }, []);

  return loading ? (
    <Loader />
  ) : purchase && purchase.length > 0 ? (
    <Row>
      <Col>
        <ListGroup variant="flush">
          {purchase &&
            purchase.map((item) => (
              <RefundItem key={item.idOrderDetail} item={item} status={6} />
            ))}
        </ListGroup>
        <Paging
          count={purchaseCount && purchaseCount}
          page={page}
          setPage={setPage}
          limit={limit}
          purchaseRequest={sellRefundRequest}
          own={user}
          type={REFUND}
        />
      </Col>
    </Row>
  ) : (
    <NoOrderScreen />
  );
};

const mapStateToProps = ({ mapping }) => {
  return {
    purchase: mapping && mapping.sellRefundList,
    purchaseCount: mapping && mapping.countSellRefund,
    loading: mapping && mapping.loading,
  };
};

const mapDispatchToProps = {
  sellRefundRequest,
  countSellRefund,
};

export default connect(mapStateToProps, mapDispatchToProps)(Return);
