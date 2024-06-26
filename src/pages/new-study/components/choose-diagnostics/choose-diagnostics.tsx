import { Box, Stack } from '@mui/material';
import { DiagnosticCard } from './diagnostic-card';
import { styles } from './styles';
import { useNewStudyStore } from '@/pages/new-study/store';
import { MAX_SELECTED_DIAGNOSTICS } from '../../libs/constants';
import { Diagnostic } from '@/packages/diagnostics';

type ChooseDiagnosticsProps = {
  diagnostics: Diagnostic[];
};

const ChooseDiagnostics = (props: ChooseDiagnosticsProps) => {
  const { diagnostics: availableDiagnostics } = props;
  const selectedDiagnosticIds = useNewStudyStore(
    (state) => state.selectedDianosticIds,
  );
  const updateSelectedDiagnostictIds = useNewStudyStore(
    (state) => state.updateSelectedDiagnostictIds,
  );

  const handleDiagnosticCardClick = (id: string) => {
    if (
      selectedDiagnosticIds.length >= MAX_SELECTED_DIAGNOSTICS &&
      !selectedDiagnosticIds.includes(id)
    ) {
      return;
    }

    updateSelectedDiagnostictIds(id);
  };

  return (
    <Box sx={styles.root}>
      <Stack sx={styles.left}>
        <Box sx={styles.diagnosticsList}>
          {availableDiagnostics.map((item) => (
            <DiagnosticCard
              disabled={
                selectedDiagnosticIds.length >= MAX_SELECTED_DIAGNOSTICS &&
                !selectedDiagnosticIds.includes(item.id)
              }
              description={item.description}
              key={item.id}
              title={item.name}
              selected={selectedDiagnosticIds.indexOf(item.id) !== -1}
              onClick={() => handleDiagnosticCardClick(item.id)}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export { ChooseDiagnostics };
