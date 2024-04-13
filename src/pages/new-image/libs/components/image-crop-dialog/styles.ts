import { createStyleSheet } from '@/libs/theme';
import { styled } from '@mui/material';
import ReactCrop from 'react-image-crop';

const styles = createStyleSheet({
  rootPaper: ({ shape }) => ({
    borderRadius: shape.borderRadius,
    maxWidth: '900px',
  }),
  dialogContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 3,
  },
  previewImg: ({ palette, shape }) => ({
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    backgroundColor: palette.common.black,
    borderRadius: shape.borderRadius,
  }),
  rightPanelRoot: { gap: 2 },
  rightPanel: {
    gap: 4,
    flex: 1,
  },
  previewRoot: {
    gap: 1,
  },
  settingsSectionRoot: {
    gap: 1,
  },
  settingIcon: {
    fontSize: '15px',
    color: ({ palette }) => palette.text.secondary,
  },
  settingTitleRoot: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
});

const StyledReactCrop = styled(ReactCrop)(({ theme: { shape } }) => ({
  alignSelf: 'self-start',
  borderRadius: shape.borderRadius * 3,
  overflow: 'hidden',
  maxHeight: 600,
}));

export { styles, StyledReactCrop };
