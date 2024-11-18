interface Props {
  type: string;
  id: string;
}

function PageSingleEntity(props: Props) {
  return (
    <div>
      <div>{props.type}</div>
      <div>ID: {props.id}</div>
    </div>
  );
}

export default PageSingleEntity;
