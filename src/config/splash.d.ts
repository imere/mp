export interface SplashConfig {
  show: boolean;

  duration: string | number;

  delay: string | number;

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