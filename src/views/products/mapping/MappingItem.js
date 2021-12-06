import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatText';
import {
  getSuggestItemBackground,
  getSuggestItemStatus,
} from '../../../utils/status';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const MappingItem = ({ item }) => {
  const classes = useStyles();
  const defaultImage =
    'https://cdn.tgdd.vn/Products/Images/42/228744/iphone-12-pro-max-512gb-191020-021035-200x200.jpg';

  return (
    <Row
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        margin: 'auto',
        padding: 15,
        width: 450,
      }}
    >
      <span className="w-100 d-flex align-items-center">
        <Avatar
          alt="Remy Sharp"
          src={`${item && item.avatar}`}
          className={classes.small}
        />
        <span style={{ fontWeight: 'bold', color: '#001f3f' }} className="ml-2">
          {item && item.fullName}
        </span>
        <Chip
          size="small"
          label={`${getSuggestItemStatus(item && item.status)}`}
          style={{
            padding: '15px 5px',
            background: getSuggestItemBackground(item && item.status),
            color: '#fff',
            fontWeight: 'bold',
          }}
          className="ml-auto"
        />
      </span>
      <Row className="mt-3">
        <Col md={4}>
          <Image
            src={
              item && item.imageProduct && item.imageProduct[0]
                ? item.imageProduct[0].address
                : defaultImage
            }
            fluid
            rounded
            style={{ height: 75 }}
          />
        </Col>
        <Col md={4}>
          <Link to={`/product/${item && item.idProduct}`}>
            {item && item.name}
          </Link>
        </Col>
        <Col md={4}>{formatMoney(item && item.price)}</Col>
      </Row>
    </Row>
  );
};

export default MappingItem;
