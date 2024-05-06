import { CropRounded, DeleteOutlineRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { styles } from './styles';
import { useState } from 'react';
import { bytesToMb, readFileAsBase64 } from '@/libs/helpers';
import { Trans, useTranslation } from 'react-i18next';
import { DropArea } from '../drop-area';
import { ImageCropDialog } from '../image-crop-dialog';
import { toast } from 'react-toastify';
import {
  MAX_IMAGE_SIZE_MB,
  MIN_IMAGE_DIMENSIONS_PX,
} from '@/pages/new-study/libs/constants';
import { validateImageDimensions } from './helpers';
import { FAKE_IMAGE_UPLOADING_DURATION_MS } from './constants';
import { useNewStudyStore } from '@/pages/new-study/new-study.store';

const ImageUpload = () => {
  const { t } = useTranslation('NewStudy');

  const uploadedImageSrc = useNewStudyStore((state) => state.uploadedImageSrc);
  const croppedImageSrc = useNewStudyStore((state) => state.croppedImageSrc);

  const setUploadedImageSrc = useNewStudyStore(
    (state) => state.setUploadedImageSrc,
  );
  const setCroppedImageSrc = useNewStudyStore(
    (state) => state.setCroppedImageSrc,
  );
  const resetCrop = useNewStudyStore((state) => state.resetCrop);

  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageCropDialogOpen, setImageCropDialogOpen] = useState(false);

  const currentImage = croppedImageSrc || uploadedImageSrc;

  const handleFileUpload = async (file: File) => {
    setIsImageUploading(true);

    if (bytesToMb(file.size) > MAX_IMAGE_SIZE_MB) {
      setIsImageUploading(false);

      return toast.error(
        `File is too large. Maximum file size is ${MAX_IMAGE_SIZE_MB}MB.`,
      );
    }

    const imageSrc = await readFileAsBase64(file);
    if (!imageSrc) return;

    const areImageDimensionsValid = await validateImageDimensions(imageSrc);

    if (!areImageDimensionsValid) {
      setIsImageUploading(false);

      return toast.error(
        `An image size should be at least ${MIN_IMAGE_DIMENSIONS_PX}px x ${MIN_IMAGE_DIMENSIONS_PX}px.`,
      );
    }

    setTimeout(() => {
      setUploadedImageSrc(imageSrc);
      setIsImageUploading(false);
    }, FAKE_IMAGE_UPLOADING_DURATION_MS);
  };

  const handleDeleteButtonClick = () => {
    resetCrop();
    setUploadedImageSrc(null);
    setCroppedImageSrc(null);
  };

  const handleCropButtonClick = () => {
    setImageCropDialogOpen(true);
  };

  const handleImageCropDialogClose = () => {
    setImageCropDialogOpen(false);
  };

  const handleCrop = (imgUrl: string) => {
    setCroppedImageSrc(imgUrl);
    setImageCropDialogOpen(false);
  };

  return (
    <Stack sx={styles.root}>
      <Box sx={{ position: 'relative' }}>
        {isImageUploading ? (
          <Skeleton animation="wave" sx={{ transform: 'none' }}>
            <DropArea
              onUpload={handleFileUpload}
              previewImageSrc={uploadedImageSrc}
            />
          </Skeleton>
        ) : (
          <DropArea
            onUpload={handleFileUpload}
            previewImageSrc={currentImage}
          />
        )}
        {currentImage && (
          <Tooltip title="Crop image">
            <IconButton
              sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                color: 'white',
                background: ({ palette }) => alpha(palette.neutral.main, 0.5),
                ':hover': {
                  background: ({ palette }) => alpha(palette.neutral.main, 0.9),
                },
              }}
              onClick={handleCropButtonClick}
            >
              <CropRounded />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {!uploadedImageSrc && !isImageUploading && (
        <Box sx={styles.imageUploadHints}>
          <Typography variant="caption">
            {t('ImageUpload.SupportedFormats')}: jpeg, png
          </Typography>
          <Typography variant="caption">
            <Trans
              t={t}
              i18nKey="ImageUpload.MaximunSizeMB"
              values={{ value: MAX_IMAGE_SIZE_MB }}
            />
          </Typography>
        </Box>
      )}
      {uploadedImageSrc && (
        <Box display="flex" justifyContent="end">
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
      {uploadedImageSrc && (
        <ImageCropDialog
          onCrop={handleCrop}
          imgSrc={uploadedImageSrc}
          open={imageCropDialogOpen}
          onClose={handleImageCropDialogClose}
        />
      )}
    </Stack>
  );
};

export { ImageUpload };
