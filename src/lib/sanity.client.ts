import {createClient} from 'next-sanity'
import { projectId, dataset, apiVersion } from "./saniry.varibles";


export const client = createClient({projectId, dataset, apiVersion, useCdn: true})