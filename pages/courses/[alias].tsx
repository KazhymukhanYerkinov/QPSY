import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";
import { firstLevelMenu } from "../../helpers/helpers";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ProductModel } from "../../interfaces/product.interface";
import { withLayout } from "../../layout/Layout";

const firstCategory = 0;

function Course({ products }: CourseProps): JSX.Element {
  return (
    <>
      { products && products.length }
    </>
  );
}

export default withLayout(Course);


export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOAMIN + '/api/top-page/find', {
      firstCategory: m.id
    });
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)));
  }
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);

  if (!firstCategoryItem) {
    return {
      notFound: true
    };
  }

  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOAMIN + '/api/top-page/find', {
    firstCategory
  });
  const { data: page } = await axios.get<TopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias' + params.alias);
  const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
    category: page.category,
    limit: 10,
  });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id,
      page,
      products,
    }
  };
};


interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  page: TopPageModel;
  products: ProductModel[];
}