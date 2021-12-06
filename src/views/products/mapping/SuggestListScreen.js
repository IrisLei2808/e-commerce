import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/shared-components/Spinner';
import { getSuggestList } from '../../../redux/actions/Mapping';
import NoMappingScreen from './NoMappingScreen';
import TwoMappingScreen from './TwoMappingScreen';
import ThreeMappingScreen from './ThreeMappingScreen';
import { useLocalStorage } from '../../../utils/utilities';

const SuggestListScreen = (props) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const { getSuggestList, suggestList, match, loading } = props;
  const [userInfo, setUserInfo] = useLocalStorage('userInfo');

  const { id } = match.params;

  useEffect(() => {
    getSuggestList(id, {
      page: page,
      limit: limit,
    });
  }, []);

  return loading ? (
    <Loader />
  ) : suggestList && suggestList.length > 0 ? (
    suggestList.map((item, index) =>
      item.peopleInCircle === 2 ? (
        <TwoMappingScreen
          index={index}
          item={item}
          item1={
            item.listProductInCircle &&
            item.listProductInCircle.find(
              (product) => product.own === userInfo.id
            )
          }
          item2={
            item.listProductInCircle &&
            item.listProductInCircle.find(
              (product) => product.own !== userInfo.id
            )
          }
        />
      ) : (
        <ThreeMappingScreen
          index={index}
          item={item}
          item1={
            item.listProductInCircle &&
            item.listProductInCircle.find(
              (product) => product.own === userInfo.id
            )
          }
          item2={
            item.listProductInCircle &&
            item.listProductInCircle.find(
              (product) =>
                product.own !== userInfo.id &&
                product.fromRequestID ===
                  item.listProductInCircle.find(
                    (product) => product.own === userInfo.id
                  ).toRequestID
            )
          }
          item3={
            item.listProductInCircle &&
            item.listProductInCircle.find(
              (product) =>
                product.own !== userInfo.id &&
                product.fromRequestID ===
                  item.listProductInCircle.find(
                    (product) => product.own !== userInfo.id
                  ).toRequestID
            )
          }
        />
      )
    )
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
