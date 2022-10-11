import React from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Row from '../components/Row';
import { RowData } from '../typings';
import fetchMovieData from '../util/fetchMovieData';
import type { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

interface Props {
  data: RowData[];
  randomNumb: number;
}

const Home = ({ data, randomNumb }: Props) => {
  const [headerBlack, setHeaderBlack] = React.useState(true);
  const [myListData] = React.useState<RowData>({
    results: [],
  });

  const { data: session } = useSession();
  // console.log(data);
  // console.log(session);

  return (
    <div className="relative text-[#e5e5e5]">
      <Head>
        <title>Home - Netphlix</title>
        <meta name="Netphlix" content="Home - Netphlix" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header headerBlack={headerBlack} />
      <Banner
        movieInfo={data[0].results[randomNumb]}
        setHeaderBlack={setHeaderBlack}
      />
      <div className="absolute z-40 w-full overflow-hidden top-[40vw] left-0 pb-20">
        {myListData.results.length !== 0 ? (
          <Row
            key="savedMovies"
            rowData={myListData}
            rowIndex={12}
            setHeaderBlack={setHeaderBlack}
          />
        ) : (
          ''
        )}
        {data.map((rowData, index) => (
          <Row
            key={index}
            rowData={rowData}
            rowIndex={index}
            setHeaderBlack={setHeaderBlack}
          />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/Login',
      },
    };
  }

  const data = await fetchMovieData();
  const randomNumb = Math.floor(Math.random() * 19);

  return {
    props: {
      data: data,
      randomNumb: randomNumb,
    },
  };
}

export default Home;
