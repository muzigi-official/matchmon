import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinkList from './LinkList';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

import * as S from './Main.style';
import { Typography } from '@mui/material';

export default function LeftDrawer(props: Props) {
  const theme = useTheme();
  const { open, setOpen } = props;

  console.log(theme);

  const list = () => (
    <Box sx={{ width: 250 }} role='presentation'>
      <LinkList onClick={() => setOpen(false)} />
    </Box>
  );

  return (
    <>
      {open ? (
        <S.Drawer variant='permanent' open={open} onClose={() => setOpen(false)} color='primary'>
          <S.DrawerHeader>
            <Box sx={{ display: 'flex' }}>
              <img src='logo.png' alt='home-logo-image' loading='lazy' width={30} height={30} />
              <Typography sx={{ marginLeft: '6px' }} variant='h5'>
                Matchmon
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} color='inherit' aria-label='close drawer'>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </S.DrawerHeader>
          <Divider />
          {list()}
        </S.Drawer>
      ) : (
        <></>
      )}
    </>
  );
}
