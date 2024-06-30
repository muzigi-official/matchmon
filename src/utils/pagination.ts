export const getPageList = (currentPage: number, totalPage: number) => {
  const num = totalPage - currentPage;
  let offset = 2;
  if (num === 0) {
    offset = 4;
  } else if (num === 1) {
    offset = 3;
  }
  const startNumber = Math.max(currentPage - offset, 1);
  const endNumber = Math.min(startNumber + 4, totalPage);
  const length = endNumber - startNumber + 1;
  const list: (number | string)[] = Array.from({ length }, (_, index) => index + startNumber);

  if (startNumber > 2) {
    list.unshift(1, '...');
  }

  if (startNumber === 2) {
    list.unshift(1);
  }

  if (endNumber < totalPage) {
    list.push('...', totalPage);
  }

  return list;
};
