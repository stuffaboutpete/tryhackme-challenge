import { ReactNode } from 'react';
import { useLoaderData } from 'react-router-dom';

interface Props {
  render: (id: string) => ReactNode;
}

function WithId(props: Props) {
  const id = useLoaderData() as string;
  return props.render(id);
}

export default WithId;
