export interface PotterCharacter {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  birthdate: string;
  interpretedBy?: string;
  children?: unknown;
  image?: string;
}

export function characterKey(character: PotterCharacter): string {
  return `${character.fullName}|${character.nickname}|${character.birthdate}`;
}
