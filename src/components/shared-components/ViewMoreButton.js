import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { WAITING_FOR_CONFIRM } from '../../configs/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
    },
  },
}));

export default function PaginationControlled({
  page,
  setPage,
  count,
  limit,
  purchaseRequest,
  id,
}) {
  const classes = useStyles();

  const numberOfRecords = Math.ceil(count / limit);

  const handleChange = (event, value) => {
    setPage(value);
    purchaseRequest(id, {
      page: value,
      limit: limit,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography className="mr-4">Page: {page}</Typography>
      <Pagination
        count={numberOfRecords}
        page={page}
        onChange={handleChange}
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
