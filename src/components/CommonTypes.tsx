export interface IPersonalDetails {
  nameValue: string;
  teamValue: string;
  joinedAtValue: string;
  avatarValue: string;
}

export interface TokenType {
  tokenValue: string;
  personalDetails: IPersonalDetails;
}

export interface TypeOfInfo {
  id: string;
  name: string;
  score: Number;
  durationInDays: Number;
  bugsCount: Number;
  madeDadeline: Number;
}

export interface TypeOfColumns {
  Header: string;
  accessor: string;
}
