import sanityClient from '@sanity/client'
import {createClient} from 'next-sanity'
import { projectId, dataset, apiVersion } from "./sanity.varibles";


// export const client = createClient({projectId, dataset, apiVersion, useCdn: true})

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // or leave blank for unauthenticated usage
    useCdn: true, // `true` or `false` if you want to ensure fresh data
})

