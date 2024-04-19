import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectorInput from './SelectorInput';

const options = ['사과', '배', '귤'];

describe('드랍다운 테스트', () => {
  it('과일(options 내용)이 안보여야됨', () => {
    render(<SelectorInput inputName='fruits' options={options} />);
    expect(screen.queryByText('사과')).not.toBeVisible();
  });

  it('드랍다운을 누르면 과일(options)이 보임', () => {
    render(<SelectorInput inputName='fruits' options={options} />);

    const selectorInput = screen.getByTestId('custom-select-box');
    fireEvent.click(selectorInput);

    expect(screen.queryByText('사과')).toBeVisible();
  });

  it('과일을 선택하면 목록이 닫힘', () => {
    render(<SelectorInput inputName='fruits' options={options} />);
    const selectorInput = screen.getByTestId('custom-select-box');
    fireEvent.click(selectorInput);

    const appleSelectable = screen.getByText('사과');
    expect(appleSelectable).toBeVisible();

    fireEvent.click(appleSelectable);

    expect(appleSelectable).not.toBeVisible();
  });

  it('과일을 선택하면 선택한 값 보여주기', () => {
    render(<SelectorInput inputName='fruits' options={options} />);
    const selectorInput = screen.getByTestId('custom-select-box');
    fireEvent.click(selectorInput);

    const appleSelectable = screen.getByText('사과');
    expect(appleSelectable).toBeVisible();

    fireEvent.click(appleSelectable);

    expect(screen.queryAllByText('사과')[0]).toBeVisible();
  });
});
