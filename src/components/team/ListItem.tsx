import { COLOR_SET } from '@/constant/DefaultSetting';
import { ListItem, Emblem, EmptyEmblem } from './ListItem.styles';

interface IListItemProps {
  id: number | undefined;
  emblem: string | undefined;
  name: string;
  colorIndex: number;
  disabled?: boolean;
  selected?: boolean;
  onClickTeam?: () => void;
}

const ListTeamItem = ({ id, emblem, name, colorIndex, disabled, selected, onClickTeam }: IListItemProps) => {
  return (
    <ListItem
      key={id}
      color={COLOR_SET[colorIndex % COLOR_SET.length]}
      selected={selected}
      disabled={disabled && !selected}
      onClick={!disabled || selected ? onClickTeam : undefined}
    >
      <span>
        {emblem ? <Emblem src={emblem} alt={name} /> : <EmptyEmblem src='/empty_emblem.png' alt='No Emblem' />}
      </span>
      <span>{name}</span>
    </ListItem>
  );
};

export default ListTeamItem;
