import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Image,
  Font,
} from '@react-pdf/renderer';
import logoImg from '@/assets/logo.png';
import { Study } from '@/packages/studies';
import { heather } from '@/libs/theme/colors';
import { shape } from '@/libs/theme/shape';
import RobotoRegular from '@/assets/fonts/Roboto-Regular.ttf';
import RobotoMedium from '@/assets/fonts/Roboto-Medium.ttf';
import { User } from '@/packages/users';
import { useConfidenceDescriptors } from '../hooks';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { useTranslation } from 'react-i18next';
import { formatVersionString } from '@/libs/helpers';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoMedium, fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  logo: {
    width: '125px',
  },
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    gap: '20px',
    fontWeight: 400,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  generationTimestamp: {
    color: heather[500],
    fontSize: '11px',
  },
  subtitle: {
    fontSize: '11px',
    color: heather[500],
    fontWeight: 400,
  },
  section: {
    gap: '10px',
  },
  image: {
    borderRadius: shape.borderRadius,
    width: '50%',
  },
  row: {
    flexDirection: 'row',
    color: heather[900],
  },
  rowBorder: {
    borderBottom: `1px solid ${heather[900]}`,
  },
  rowLabelWrapper: {
    borderRight: `1px solid ${heather[900]}`,
    padding: 10,
  },
  rowLabel: {
    fontWeight: 600,
  },
  rowValue: {
    padding: 10,
  },
  studyTitle: {
    color: heather[800],
  },
  table: {
    border: `1px solid ${heather[900]}`,
    fontSize: '11px',
    borderRadius: shape.borderRadius,
    overflow: 'hidden',
  },
  confidence: {
    fontWeight: 600,
  },
  noteWrapper: {
    marginTop: '20px',
  },
  noteText: {
    fontWeight: 400,
    fontSize: '11px',
    color: heather[400],
  },
  noteBold: {
    color: heather[700],
  },
});

type StudyReportDocumentProps = {
  study: Study;
  issuer: User;
};

type TableRowProps = {
  label: string;
  value: string | React.ReactNode;
  labelColWidth: string;
  last?: boolean;
  backgroundColor?: string;
};

const TableRow = (props: TableRowProps) => {
  const { label, value, labelColWidth, last = false, backgroundColor } = props;

  return (
    <View
      style={[{ backgroundColor }, styles.row, !last ? styles.rowBorder : {}]}
    >
      <View style={[{ width: labelColWidth }, styles.rowLabelWrapper]}>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
};

const StudyReportDocument = (props: StudyReportDocumentProps) => {
  const { study, issuer } = props;

  const { t } = useTranslation('Studies');

  const { text: confidenceText, color: confidenceColor } =
    useConfidenceDescriptors(study.confidence ?? 0);

  const labelColWidth = '32%';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image source={logoImg} style={styles.logo} />
          <Text style={styles.generationTimestamp}>
            {dayjs(study.createdAt).format(DateFormat.YEAR_MONTH_DAY_DASHES)}
          </Text>
        </View>
        <Text style={styles.studyTitle}>
          {t('StudyReport.Study')} #{study.id}
        </Text>
        {study.description && (
          <Text style={{ fontSize: '11px', color: heather[900] }}>
            {study.description}
          </Text>
        )}
        <View style={styles.section}>
          <Text style={styles.subtitle}>{t('StudyReport.Image')}</Text>
          <Image style={styles.image} source={study.image.src}></Image>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>{t('StudyReport.Summary')}</Text>
          <View style={styles.table}>
            <TableRow
              labelColWidth={labelColWidth}
              label={t('StudyReport.DiagnosticType')}
              value={study.type.name}
            />
            <TableRow
              labelColWidth={labelColWidth}
              label={t('StudyReport.AiModel')}
              value={`${study.model.name} - ${
                study.model.currentVersion?.version
                  ? formatVersionString(study.model.currentVersion?.version)
                  : ''
              }`}
            />
            <TableRow
              labelColWidth={labelColWidth}
              label={t('StudyReport.CompletedAt')}
              value={study.createdAt}
            />
            <TableRow
              labelColWidth={labelColWidth}
              label={t('StudyReport.Requester')}
              value={`${issuer.name}; ${issuer.email}`}
            />
            <TableRow
              last
              labelColWidth={labelColWidth}
              label={t('StudyReport.DiseaseAvailabilityConfidence')}
              backgroundColor={confidenceColor.light}
              value={
                <Text style={styles.confidence}>
                  {(study.confidence ?? 0 * 100).toFixed(2)}% (
                  {confidenceText.title})
                </Text>
              }
            />
          </View>
          <View style={styles.noteWrapper}>
            <Text style={styles.noteText}>
              <Text style={styles.noteBold}>{t('StudyReport.Note')}:</Text>
              {'  '}
              {confidenceText.description}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export { StudyReportDocument };
