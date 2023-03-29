import {definePreview} from 'next-sanity/preview'
import { projectId, dataset } from "./sanity.varibles";

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`, projectId)
}
export const usePreview = definePreview({projectId, dataset, onPublicAccessOnly})