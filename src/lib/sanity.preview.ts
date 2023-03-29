import {definePreview} from 'next-sanity/preview'
import { dataset } from "./sanity.varibles";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`)
}


export const usePreview = definePreview({projectId, dataset, onPublicAccessOnly})