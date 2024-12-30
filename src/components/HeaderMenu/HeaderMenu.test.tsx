import { render, screen } from '@/src/test-utils';
import { HeaderMenu } from './HeaderMenu';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<HeaderMenu />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });
});
