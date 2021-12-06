import { Box } from '@material-ui/core';
import React from 'react';
import { ListGroup, Row, Image } from 'react-bootstrap';
import MappingItem from './MappingItem';
import { Link } from 'react-router-dom';
import MappingDialog from '../../../components/layout-components/MappingDialog';

const TwoMappingScreen = ({ index, item, item1, item2 }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    </Box>
  );
};

export default TwoMappingScreen;
