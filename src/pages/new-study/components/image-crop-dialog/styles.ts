import { createStyleSheet } from '@/libs/theme';

const IMAGE_PREVIEW_ASPECT_RATIO = 16 / 9;

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
  cropPreviewRoot: ({ palette, shape }) => ({
    width: '300px',
    height: `${300 / IMAGE_PREVIEW_ASPECT_RATIO}px`,
    objectFit: 'contain',
    backgroundColor: palette.grey[200],
    borderRadius: shape.borderRadius,
    aspectRatio: IMAGE_PREVIEW_ASPECT_RATIO,
    border: `1px solid ${palette.divider}`,
    padding: 1,
    textAlign: 'center',
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

export { styles };
