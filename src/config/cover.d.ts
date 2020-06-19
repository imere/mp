import { ObjectFit, ObjectPosition } from 'src/style';

export interface CoverConfig {
  show: boolean;

  src: string;

  backgroundColor: string;

  geometry: {
    width: string;
    height: string;
  };

  objectPosition: ObjectPosition;

  objectFit: ObjectFit;
}