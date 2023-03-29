import {createClient} from 'next-sanity'
import { dataset, apiVersion } from "./saniry.varibles";
var projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const client = createClient({projectId, dataset, apiVersion, useCdn: true})