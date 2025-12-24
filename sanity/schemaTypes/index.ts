import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { post } from './post'
import { aboutPage } from './aboutPage'
import { socialPage } from './socialPage'
import { contactPage } from './contactPage'
import { galleryPage } from './galleryPage'
import { libraryPage } from './libraryPage'
import { themeColors } from './themeColors'
import { themeFonts } from './themeFonts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, post, aboutPage, socialPage, contactPage, galleryPage, libraryPage, themeColors, themeFonts],
}