import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSuggestList } from '../../../redux/actions/Mapping';
import Loader from '../../../components/shared-components/Spinner';
import NoMappingScreen from './NoMappingScreen';

const SuggestListScreen = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const { getSuggestList, suggestList, match, loading } = props;

  const { id } = match.params;

  useEffect(() => {
    getSuggestList(id, {
      page: page,
      limit: limit,
    });
  }, []);
  console.log('L: ', suggestList);
  return loading ? (
    <Loader />
  ) : suggestList && suggestList.length > 0 ? (
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
    ></Box>
  ) : (
    <NoMappingScreen />
  );
};

const mapStateToProps = ({ mapping }) => {
  return {
    suggestList: mapping.suggestList,
    loading: mapping.loading,
  };
};

const mapDispatchToProps = {
  getSuggestList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestListScreen);
