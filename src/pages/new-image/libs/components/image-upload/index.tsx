import { CropRounded, DeleteOutlineRounded } from '@mui/icons-material';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { readFileAsBase64 } from '@/libs/helpers';
import { Trans, useTranslation } from 'react-i18next';
import { DropArea } from '../drop-area';
import { ImageCropDialog } from '../image-crop-dialog';

const FAKE_IMAGE_UPLOADING_DURATION_MS = 1000;

const ImageUpload = () => {
  const { t } = useTranslation('NewImage');

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageCropDialogOpen, setImageCropDialogOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsImageUploading(true);
    const src = await readFileAsBase64(file);

    setTimeout(() => {
      setIsImageUploading(false);

      if (src) {
        setPreviewImg(src);
      }
    }, FAKE_IMAGE_UPLOADING_DURATION_MS);
  };

  const handleDeleteButtonClick = () => {
    setPreviewImg(null);
  };

  const handleCropButtonClick = () => {
    setImageCropDialogOpen(true);
  };

  const handleImageCropDialogClose = () => {
    setImageCropDialogOpen(false);
  };

  return (
    <Stack sx={styles.root}>
      {isImageUploading ? (
        <Skeleton animation="wave" sx={{ transform: 'none' }}>
          <DropArea onUpload={handleFileUpload} previewImageSrc={previewImg} />
        </Skeleton>
      ) : (
        <DropArea onUpload={handleFileUpload} previewImageSrc={previewImg} />
      )}

      {!previewImg && !isImageUploading && (
        <Box sx={styles.hints}>
          <Typography variant="caption">
            {t('ImageUpload.SupportedFormats')}: jpeg, png
          </Typography>
          <Typography variant="caption">
            <Trans
              t={t}
              i18nKey="ImageUpload.MaximunSizeMB"
              values={{ value: 25 }}
            />
          </Typography>
        </Box>
      )}

      {previewImg && (
        <Box display="flex" justifyContent="space-between">
          <Button
            startIcon={<CropRounded />}
            variant="outlined"
            onClick={handleCropButtonClick}
          >
            Crop
          </Button>
          <Button
            color="error"
            variant="text"
            startIcon={<DeleteOutlineRounded />}
            onClick={handleDeleteButtonClick}
          >
            Delete image
          </Button>
        </Box>
      )}
      {previewImg && (
        <ImageCropDialog
          imgSrc={previewImg}
          open={imageCropDialogOpen}
          onClose={handleImageCropDialogClose}
        />
      )}
    </Stack>
  );
};

export { ImageUpload };
