import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  appBar: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: ({ palette }) => `1px solid ${palette.neutral.light}`,
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 0 10px',
    alignItems: 'center',
  },
  collapseSidebarIcon: {
    transform: 'scaleX(-1)',
    fill: ({ palette }) => palette.grey[400],
  },
  notificationIcon: {
    fill: ({ palette }) => palette.grey[400],
  },
});

export { styles };