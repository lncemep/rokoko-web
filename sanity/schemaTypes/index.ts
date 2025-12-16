import { type SchemaTypeDefinition } from 'sanity'
import { homePage } from './homePage'
import { post } from './post'
import { aboutPage } from './aboutPage'
import { socialPage } from './socialPage'
import { contactPage } from './contactPage' // 1. IMPORT

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, post, aboutPage, socialPage, contactPage], // 2. DODAJ DO LISTY
}