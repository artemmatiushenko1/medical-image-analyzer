import { httpClient } from '@/libs/packages/http';
import { DiagnosticsApi } from './diagnostics.api';

const diagnosticsApi = new DiagnosticsApi(httpClient);

export {
  type Diagnostic,
  type CreateDiagnosticRequest,
  type Model,
  type CreateModelRequest,
  type ModelVersion,
  type CreateModelVersionRequest,
  type ChangeModelStatusRequest,
  type ChangeModelVersionStatusRequest,
} from './types';
export {
  createModelSchema,
  createModelVersionSchema,
  createDiagnosticSchema,
} from './validation-schemas';
export { diagnosticsApi };
export { ModelStatus, ModelVersionStatus } from './enums';
export { ModelExtended } from './model-extended';
