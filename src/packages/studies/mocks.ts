import { StudyStatus } from './enums';
import { Study } from './types';

const MOCK_STUDIES: Study[] = [
  {
    id: '3465',
    diagnostic: 'Детекція аномалій в легенях',
    status: StudyStatus.COMPLETED,
    imageSrc:
      'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg',
    date: '23 May 2024',
    confidence: 0.856,
  },
  {
    id: '3466',
    diagnostic: 'Класифікація COVID-аномалій',
    status: StudyStatus.PENDING,
    imageSrc:
      'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2020/05/x-ray-image-2b_full.jpg?itok=2FO93vqG',
    date: '24 May 2024',
  },
  {
    id: '3467',
    diagnostic: 'Класифікація аномалій шкіри (хвороба Лайма)',
    status: StudyStatus.COMPLETED,
    imageSrc:
      'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/05/shutterstock_537518422_header-1024x575.jpg?w=1155&h=1528',
    date: '25 May 2024',
    confidence: 0.1,
  },
  {
    id: '3468',
    diagnostic: 'Класифікація аномалій шкіри (меланома)',
    status: StudyStatus.COMPLETED,
    imageSrc:
      'https://media.post.rvohealth.io/wp-content/uploads/2024/03/superficial-spreading-melanoma-body1.jpg',
    date: '25 May 2024',
    confidence: 0.4,
  },
];

export { MOCK_STUDIES };
