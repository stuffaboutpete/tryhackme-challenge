import { Entity } from '../model/entities/type/entity';

interface Props {
  type: string;
  id: string;
  entity?: Entity;
}

function PageSingleEntity(props: Props) {
  return (
    <div>
      <div>{props.type}</div>
      <div>ID: {props.id}</div>
      {!props.entity && <div>Loading...</div>}
      {props.entity && <pre>{JSON.stringify(props.entity, null, 4)}</pre>}
    </div>
  );
}

export default PageSingleEntity;
