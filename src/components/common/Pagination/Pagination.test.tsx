import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const currentPage = 1;
const totalPage = 10;
const handlePageClick = jest.fn();

describe('Pagination 테스트', () => {
  beforeEach(() => {
    render(<Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageClick} />);
  });

  it('전체 목록과 보여지는 아이템 수에 맞게 버튼이 생성됬는지 확인합니다.', () => {
    const list = screen.getAllByRole('page');
    if (totalPage >= 6) {
      expect(list.length).toBe(6);
    } else {
      expect(list.length).toBe(totalPage);
    }
  });

  it('페이지 2 버튼을 클릭하면 2번 버튼에 className에 selected가 생깁니다.', () => {
    const button = screen.getByRole('button', { name: '2' });
    fireEvent.click(button);
    expect(button).toHaveClass('selected');
  });

  it('right arrow 버튼을 클릭하면 페이지가 증가한다.', () => {
    const button = screen.getByRole('button', { name: '>' });
    const pageOneButton = screen.getByRole('button', { name: '1' });
    const pageTwoButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(button);
    expect(pageOneButton).not.toHaveClass('selected');
    expect(pageTwoButton).toHaveClass('selected');
  });

  it('left arrow 버튼을 클릭하면 page값이 하나 줄어든다.', () => {
    // 현재 페이지를 2로 세팅 후 테스트 하기
    const button = screen.getByRole('button', { name: '>' });
    const leftArrowButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(button);
    fireEvent.click(leftArrowButton);
    const pageButton = screen.getByRole('button', { name: '1' });
    expect(pageButton).toHaveClass('selected');
  });

  it('현재 페이지가 1이면 left arrow 버튼을 누르지 못한다.', () => {
    const pageButton = screen.getByRole('button', { name: '1' });
    expect(pageButton).toHaveClass('selected');
    const leftArrowButton = screen.getByRole('button', { name: '<' });
    expect(leftArrowButton).toBeDisabled();
  });

  it('현재 페이지가 마지막페이지면 right arrow 버튼을 누르지 못한다.', () => {
    const pageButton = screen.getByRole('button', { name: '10' });
    fireEvent.click(pageButton);
    expect(pageButton).toHaveClass('selected');
    const rightArrowButton = screen.getByRole('button', { name: '>' });
    expect(rightArrowButton).toBeDisabled();
  });

  it('totalPage가 6 이상이면 ... 글자가 보인다.', () => {
    const spanText = screen.getByTestId('span-none-page');
    if (totalPage >= 6) {
      expect(spanText).toBeVisible();
    }
  });
});
