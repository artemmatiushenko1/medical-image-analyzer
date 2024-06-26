import { alpha } from '@mui/material';
import { createStyleSheet } from '@/libs/theme';

const cardStyles = createStyleSheet({
  root: {
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    outline: ({ palette }) => `1px solid ${palette.divider}`,
    transition: 'transform 0.2s ease',
    aspectRatio: 3 / 2,
    maxWidth: '270px',
    width: '100%',
    '.info-icon': {
      opacity: 0,
    },
    ':hover': {
      transform: 'scale(0.99)',
      '.info-icon': {
        opacity: 1,
      },
    },
    backgroundColor: ({ palette }) => alpha(palette.primary.light, 0.8),
  },
  selected: {
    outline: ({ palette }) => `2px solid ${palette.success.main}`,
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.8,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    padding: 2,
  },
  selectedIconWrapperAbsolute: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
  },
  selectedIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    color: '#fff',
    background: ({ palette }) => palette.success.main,
    borderRadius: '2px',
  },
  selectedIcon: {
    width: '19px',
    height: '19px',
  },
  infoOverlay: {
    position: 'absolute',
    padding: '15px',
    inset: 0,
    backgroundImage:
      'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
    display: 'flex',
    alignItems: 'end',
  },
  title: {
    color: 'white',
    fontSize: '14px',
  },
});

const styles = createStyleSheet({
  root: {
    gap: 9,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    pt: 3,
  },
  diagnosticsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
    overflow: 'scroll',
    padding: '2px',
    overscrollBehavior: 'contain',
  },
  left: {
    flex: 1,
    gap: 2,
  },
  right: {
    flex: 1,
    overflow: 'auto',
  },
});

const selectedDiagnosticAccordion = createStyleSheet({
  root: {
    borderRadius: ({ shape }) => shape.borderRadius,
    '::before': {
      display: 'none',
    },
    '.delete-icon': {
      opacity: 0,
      transition: 'opacity 0.1s ease',
    },
    '&:hover': {
      '.delete-icon': {
        opacity: 1,
      },
    },
  },
  selectWrapper: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: '15px',
    ml: 1,
    color: ({ palette }) => palette.neutral.main,
  },
});

export { styles, cardStyles, selectedDiagnosticAccordion };
