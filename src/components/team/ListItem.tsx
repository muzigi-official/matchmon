import { COLOR_SET } from '@/constant/DefaultSetting';
import { ListItem, Emblem, EmptyEmblem } from './ListItem.styles';

interface IListItemProps {
  id: number;
  emblem: string | undefined;
  name: string;
  onClickTeam?: () => void;
}

const ListTeamItem = ({ id, emblem, name, onClickTeam }: IListItemProps) => {
  return (
    <ListItem key={id} color={COLOR_SET[id % COLOR_SET.length]} onClick={onClickTeam}>
      <span>
        {emblem ? <Emblem src={emblem} alt={name} /> : <EmptyEmblem src='/empty_emblem.png' alt='No Emblem' />}
      </span>
      <span>{name}</span>
    </ListItem>
  );
};

export default ListTeamItem;
