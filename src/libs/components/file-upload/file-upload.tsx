import { DropArea } from '@/libs/components';
import { UploadFileRounded } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { SelectedFileCard } from './selected-file-card';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { ValueOf } from '@/libs/types';
import { MimeType } from '@/libs/enums';

type FileUploadProps<T extends FieldValues> = UseControllerProps<T> & {
  allowedMimeTypes: ValueOf<typeof MimeType>[];
  maxFileSizeMb: number;
};

const FileUpload = <T extends FieldValues>(props: FileUploadProps<T>) => {
  const { allowedMimeTypes = [], maxFileSizeMb, ...controlProps } = props;

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(controlProps);

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="subtitle2">Choose file</Typography>
        <DropArea
          value={value}
          error={Boolean(error)}
          supportedFormats={allowedMimeTypes}
          icon={UploadFileRounded}
          onUpload={onChange}
          maxFileSizeMb={maxFileSizeMb}
          helperText={error?.message}
        />
      </Stack>
      {value && (
        <Stack spacing={1}>
          <Typography variant="subtitle2">Selected file</Typography>
          <SelectedFileCard
            sizeBytes={value.size}
            name={value.name}
            onRemoveFile={() => onChange(undefined)}
          />
        </Stack>
      )}
    </>
  );
};

export { FileUpload };