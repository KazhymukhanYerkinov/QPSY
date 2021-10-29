import React from 'react';
import axios from 'axios';
import { Button, Htag, P, Rating, Tag } from '../components';
import { MenuItem } from '../interfaces/menu.interface';

import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';


function Home({ menu, firstCategory }: HomeProps): JSX.Element {

  const [ rating, setRating ] = React.useState(4);

  return (
    <React.Fragment>
      <Htag tag = 'h1'> Текст </Htag>
      <Button appearance = 'primary' arrow = 'right'> Кнопка </Button>
      <Button appearance = 'ghost' arrow = 'down'> Кнопка </Button>
      <P size = 'l'> Large </P>
      <P size = 'm'> Medium </P>
      <P size = 's'> Small </P>
      <Tag size = 's'> small </Tag>
      <Tag size = 's' color = 'red'> hh.kz </Tag>
      <Tag size = 's' color = 'red' href = 'dasdasdas'> hh.kz </Tag>
      <Rating isEditable rating = {rating} setRating = { setRating } />
    </React.Fragment>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}


