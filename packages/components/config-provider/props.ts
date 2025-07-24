import type { Language, TranslatePair } from '@ofa-ui/locale'

export interface ConfigProviderProps {
  locale?: Language
  extendsI18nMsg?: TranslatePair
}
