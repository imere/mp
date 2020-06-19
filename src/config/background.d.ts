export interface BackgroundConfig {
  show: boolean;

  image: string;

  color: string;

  geometry: {
    width: string;
    height: string;
  };

  position: {
    x: string;
    y: string;
  };

  size: string;

  repeat: string;
}