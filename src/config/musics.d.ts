interface MusicData {

  metadata: {
    cover: string;

    artist: string;

    album: string;
  };

  src: string;

  name: string;

  hash: Array<{
    method: 'md5';
    value: string;
  }>;
}

export type MusicsDataConfig = Array<MusicData>;