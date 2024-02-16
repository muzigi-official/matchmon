import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinkList from './LinkList';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

import * as S from './Main.style';

export default function LeftDrawer(props: Props) {
  const theme = useTheme();
  const { open, setOpen } = props;

  return (
    <>
      <S.Drawer variant='permanent' open={open} onClose={() => setOpen(false)} color='primary'>
        <S.DrawerHeader>
          <Box>
            <Link sx={{ display: 'flex', textDecoration: 'none' }} href='/main'>
              <img src='logo.png' alt='home-logo-image' loading='lazy' width={30} height={30} />
              <S.HomeLink sx={{ marginLeft: '18px', color: 'white' }} variant='h5'>
                Matchmon
              </S.HomeLink>
            </Link>
          </Box>
          <IconButton onClick={() => setOpen(false)} color='inherit' aria-label='close drawer'>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </S.DrawerHeader>
        <Divider />
        <LinkList open={open} onClick={() => setOpen(false)} />
      </S.Drawer>
    </>
  );
}
