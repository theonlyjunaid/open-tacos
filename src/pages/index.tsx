import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import SeoTags from '../components/SeoTags'
import StatsCounter, { StatsCounterProps } from '../components/StatsCounter'

import { gql } from '@apollo/client'
import { graphqlClient } from '../js/graphql/Client'
import { GetStaticProps } from 'next'
import { IndexResponseType } from '../js/types'
import FeatureCard from '../components/ui/FeatureCard'
import HomeHero from '../components/ui/HomeHero'

interface HomePageType {
  exploreData: IndexResponseType
  stats: StatsCounterProps
}
const Home: NextPage<HomePageType> = ({ exploreData, stats }) => {
  const { areas } = exploreData
  return (
    <>
      <Head>
        <title>Climbing Route Catalog</title>
        <meta name='description' content='Open license climbing route catalog' />
        <link rel='icon' href='/favicon.ico' />
        <SeoTags
          keywords={['openbeta', 'rock climbing', 'climbing api']}
          description='Climbing route catalog'
          title='Home'
        />
      </Head>

      <Layout
        layoutClz='layout-wide'
        hero={
          <HomeHero>
            <section className='pr-8'>
              <h1 className='text-white'>Rock climbing wiki</h1>
              <StatsCounter {...stats} />
            </section>
          </HomeHero>
        }
      >
        <h2 className='mb-4 text-3xl'>Explore</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 md:gap-x-3 gap-y-3'>
          {areas.map(area => <FeatureCard key={area.id} area={area} />)}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let query = gql`query UsaAreas( $filter: Filter) {
    areas(filter: $filter, sort: { totalClimbs: -1 }) {
      id
      area_name
      pathTokens
      totalClimbs
      density
      aggregate {
        byType {
          label
          count
        }
        byGrade {
          label
          count
        }
      }
      metadata {
        lat
        lng        
      }
    }
  }`

  const rs = await graphqlClient.query<IndexResponseType>({
    query,
    variables: {
      filter: {
        field_compare: [{
          field: 'totalClimbs',
          num: 200,
          comparison: 'gt'
        }, {
          field: 'density',
          num: 0.005,
          comparison: 'gt'
        }]
      }
    }
  })

  query = gql`query Stats {
    stats {
        totalClimbs
        totalCrags
    }
  }`
  const rsStats = await graphqlClient.query<StatsCounterProps>({ query })

  // Pass post data to the page via props
  return { props: { exploreData: rs.data, ...rsStats.data } }
}

export default Home