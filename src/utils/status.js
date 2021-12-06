export const getMappingListStatus = (status) => {
  if (status == 2) {
    return 'Đang chờ xử lý';
  } else {
    return 'Đang chờ xử lý';
  }
};

export const getSuggestItemStatus = (status) => {
  if (status == 1) {
    return 'Chờ xác nhận';
  } else if (status == 2) {
    return 'Đã xác nhận';
  }
};

export const getSuggestItemBackground = (status) => {
  if (status == 1) {
    return '#2ECC40';
  } else if (status == 2) {
    return '#e24908';
  }
};
