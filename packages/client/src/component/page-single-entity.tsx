interface Props {
  name: string;
}

function PageSingleEntity(props: Props) {
  return (
    <div>{props.name}</div>
  );
}

export default PageSingleEntity;
