import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Image, ListGroup, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MappingDialog from '../../../components/layout-components/MappingDialog';
import SuccessModal from '../../../components/shared-components/SuccessModal';
import {
  getSuggestList,
  resetMappingType,
} from '../../../redux/actions/Mapping';
import {
  CANCEL_JOIN_EXCHANGE_SUCCESS,
  JOIN_EXCHANGE_SUCCESS,
} from '../../../redux/constants/Mapping';
import MappingItem from './MappingItem';

const TwoMappingScreen = ({
  index,
  item,
  item1,
  item2,
  type,
  resetMappingType,
  getSuggestList,
  id,
  joinResult,
  cancelResult,
}) => {
  let history = useHistory();

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const goToDetail = () => {
    history.push('/mapping');
  };

  const goToPurchase = () => {
    history.push('/purchase');
  };

  useEffect(() => {
    switch (type) {
      case JOIN_EXCHANGE_SUCCESS:
        handleClickOpenModal();
        setMessage(joinResult);
        setTitle('Tham gia trao đổi');
        break;
      case CANCEL_JOIN_EXCHANGE_SUCCESS:
        handleClickOpenModal();
        setMessage(cancelResult);
        setTitle('Từ chối tham gia trao đổi');
        break;
      default:
        break;
    }
    resetMappingType();
  }, [type]);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
        borderRadius: 5,
        padding: '20px 0px',
        justifyContent: 'space-around',
      }}
    >
      <ListGroup variant="flush">
        <span style={{ margin: 'auto', fontWeight: 'bold' }}>
          <a onClick={() => handleClickOpen()} className="suggest">
            <i class="fas fa-eye mr-2"></i>Gợi ý trao đổi {index + 1}
          </a>
        </span>
        <ListGroup.Item>
          <Row style={{ margin: '0px 0px' }}>
            <MappingItem item={item1} />
            <Image
              src={`${window.location.origin}/images/exchange.png`}
              style={{ height: 55, margin: 'auto' }}
              className="arrowImage"
            />
            <MappingItem item={item2} />
          </Row>
        </ListGroup.Item>
      </ListGroup>
      <MappingDialog
        open={open}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        index={index}
        item={item}
        item1={item1}
        item2={item2}
      />
      <SuccessModal
        show={openModal}
        goToDetail={goToDetail}
        handleClose={handleCloseModal}
        message={message && message}
        goToPurchase={goToPurchase}
        title={title}
      />
    </Box>
  );
};

const mapStateToProps = ({ mapping }) => {
  return {
    loading: mapping.loading,
    type: mapping.type,
    joinResult: mapping.joinResult,
    cancelResult: mapping.cancelResult,
  };
};

const mapDispatchToProps = {
  resetMappingType,
  getSuggestList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwoMappingScreen);
