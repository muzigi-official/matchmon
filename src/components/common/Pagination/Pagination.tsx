import { useEffect, useState, useMemo } from 'react';
import { getPageList } from '@/util/pagination';
import Button from '@/components/common/Button';
import { Container, PaginationUl, PaginationLi, PaginationSpan } from './Pagination.styles';

type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPage, onPageChange }: Props) {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const pageNumberList = useMemo(() => {
    return getPageList(selectedPage, totalPage);
  }, [selectedPage, totalPage]);

  useEffect(() => {
    onPageChange(selectedPage);
  }, [selectedPage, totalPage]);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  const handleClick = (page: number) => {
    setSelectedPage(page);
  };

  const handleLeftArrowClick = () => {
    setSelectedPage(prevState => prevState - 1);
  };

  const handleRightArrowClick = () => {
    setSelectedPage(prevState => prevState + 1);
  };

  return (
    <>
      {totalPage !== 0 ? (
        <Container>
          <Button variant='text' disabled={selectedPage === 1} onClick={handleLeftArrowClick}>
            {' '}
            &lt;{' '}
          </Button>
          <PaginationUl>
            {pageNumberList.map((page, index) => {
              if (typeof page === 'number') {
                return (
                  <PaginationLi role='page' key={`page_${page}`}>
                    <Button variant='text' selected={selectedPage === page} onClick={() => handleClick(page)}>
                      {' '}
                      {page}{' '}
                    </Button>
                  </PaginationLi>
                );
              } else {
                return (
                  <PaginationLi key={`page_string_${index}`}>
                    <PaginationSpan data-testid='span-none-page'> {page} </PaginationSpan>
                  </PaginationLi>
                );
              }
            })}
          </PaginationUl>
          <Button variant='text' disabled={selectedPage === totalPage} onClick={handleRightArrowClick}>
            {' '}
            &gt;{' '}
          </Button>
        </Container>
      ) : null}
    </>
  );
}
