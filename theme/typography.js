import { Platform } from 'react-native';

// У макеті вся типографіка побудована на Inter. Щоб не тягнути файли шрифту
// в навчальний проєкт, беремо системний шрифт платформи — він найближчий за метрикою.
const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

// Android не підтримує проміжні значення fontWeight для системного шрифту так само,
// як iOS, тому напівжирний підміняємо на sans-serif-medium.
const mediumFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'System',
});

export const typography = {
  display: { fontFamily, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  heading: { fontFamily, fontSize: 22, lineHeight: 28, fontWeight: '600' },
  subheading: { fontFamily: mediumFamily, fontSize: 17, lineHeight: 24, fontWeight: '600' },
  body: { fontFamily, fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontFamily: mediumFamily, fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontFamily, fontSize: 13, lineHeight: 18, fontWeight: '400' },
  label: { fontFamily: mediumFamily, fontSize: 11, lineHeight: 14, fontWeight: '600' },
};
