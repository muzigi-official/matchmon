import { COLOR_SET } from '@/constant/DefaultSetting';
import { ListItem, Emblem, EmptyEmblem } from './ListItem.styles';

interface IListItemProps {
  id: number | undefined;
  emblem: string | undefined;
  name: string;
  colorIndex: number;
  selected?: boolean;
  onClickTeam?: () => void;
}

const ListTeamItem = ({ id, emblem, name, colorIndex, selected, onClickTeam }: IListItemProps) => {
  return (
    <ListItem key={id} color={COLOR_SET[colorIndex % COLOR_SET.length]} selected={selected} onClick={onClickTeam}>
      <span>
        {emblem ? <Emblem src={emblem} alt={name} /> : <EmptyEmblem src='/empty_emblem.png' alt='No Emblem' />}
      </span>
      <span>{name}</span>
    </ListItem>
  );
};

export default ListTeamItem;
