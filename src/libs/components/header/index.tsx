import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarFilledIcon from '@mui/icons-material/ViewSidebar';
import { styles } from './styles';
import { useUiStore } from '@/stores/ui.store';
import { useState } from 'react';
import { ProfileMenu } from '../profile-menu';
import { useMatch, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums';
import { ExpandMoreRounded, NotificationsRounded } from '@mui/icons-material';

const Header = () => {
  const toggleSidebarCollapsed = useUiStore(
    (state) => state.toggleSidebarCollapsed,
  );
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);

  const navigate = useNavigate();
  const newStudyPageMath = useMatch(AppRoute.NEW_STUDY);
  const [profileMenuAnchor, setprofileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(profileMenuAnchor);
  const isNewStudyPage = Boolean(newStudyPageMath);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setprofileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setprofileMenuAnchor(null);
  };

  const handleNewStudyClick = () => {
    navigate(AppRoute.NEW_STUDY);
    toggleSidebarCollapsed();
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      color="transparent"
      sx={styles.appBar}
    >
      <Box sx={styles.innerContainer}>
        <IconButton onClick={toggleSidebarCollapsed}>
          {sidebarCollapsed ? (
            <ViewSidebarFilledIcon
              sx={
                [
                  styles.collapseSidebarIcon,
                  styles.collapseSidebarIconActive,
                ] as SxProps<Theme>
              }
            />
          ) : (
            <ViewSidebarOutlinedIcon
              sx={
                [
                  styles.collapseSidebarIcon,
                  styles.collapseSidebarIconInactive,
                ] as SxProps<Theme>
              }
            />
          )}
        </IconButton>
        <Stack direction="row" gap={2} alignItems="center">
          {!isNewStudyPage && (
            <Button
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={handleNewStudyClick}
            >
              New Study
            </Button>
          )}
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <Badge badgeContent={12} color="error">
              <NotificationsRounded />
            </Badge>
          </IconButton>
          <ListItemButton disableRipple onClick={handleProfileClick}>
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                alt="Artem Matiushenko"
                src="https://avatars.githubusercontent.com/u/71723893?s=400&u=bc39da803e24ca2b1b228eb5943ab67abefe59c9&v=4"
              />
              <ExpandMoreRounded color="primary" />
            </Stack>
          </ListItemButton>
          <ProfileMenu
            open={profileMenuOpen}
            anchorEl={profileMenuAnchor}
            onClose={handleProfileMenuClose}
          />
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
