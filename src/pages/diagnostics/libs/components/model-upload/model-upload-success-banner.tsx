import { SuccessCheckmark } from '@/libs/components';
import { Button, Stack, Typography } from '@mui/material';

const ModelUploadSuccessBanner = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={3}
      sx={{
        position: 'absolute',
        inset: 0,
        height: '100%',
        background: ({ palette }) => palette.background.paper,
      }}
    >
      <SuccessCheckmark />
      <Stack>
        <Typography variant="h6" fontSize={16} textAlign="center" gutterBottom>
          New model was successfully uploaded!
        </Typography>
        <Typography variant="caption" textAlign="center">
          You can now manage it through <br />
          diagnostic details view.
        </Typography>
      </Stack>
      <Button size="small" variant="outlined">
        Ok
      </Button>
    </Stack>
  );
};

export { ModelUploadSuccessBanner };
