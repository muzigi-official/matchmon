import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LinkList from './LinkList';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  anchor?: Anchor;
}

export default function LeftDrawer(props: Props) {
  const { open, setOpen, anchor = 'left' } = props;

  const list = (anchor: Anchor) => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role='presentation'>
      <LinkList onClick={() => setOpen(false)} />
    </Box>
  );

  return (
    <>
      {open ? (
        <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
          {list(anchor)}
        </Drawer>
      ) : (
        <></>
      )}
    </>
  );
}
