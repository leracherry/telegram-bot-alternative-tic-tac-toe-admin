import { FC, useEffect, useState } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useTranslation } from 'react-i18next';
const Sidebar: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [path, setPath] = useState<string>('');
  useEffect(() => {
    const pathname = window.location.pathname;
    setPath(pathname);
  }, []);
  return (
    <Box
      sx={{
        mt: 10,
        width: '100%',
        maxWidth: 360,
        minHeight: '87vh',
        bgcolor: 'background.paper',
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            sx={{
              backgroundColor: path === '/' ? 'rgba(25, 118, 210, 0.3)' : '',
            }}
            disablePadding
          >
            <ListItemButton
              sx={{ justifyContent: 'flex-start' }}
              onClick={() => {
                navigate('/');
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText primary={t('Menu.Games')} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              backgroundColor:
                path === '/archives' ? 'rgba(25, 118, 210, 0.3)' : '',
            }}
            disablePadding
          >
            <ListItemButton onClick={() => navigate('/users')}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={t('Menu.Users')} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};
export default Sidebar;
