export type Media = {
  id: string;
  filename: string;
  sizeBytes: number | null;
  type: MediaType;
  belongsInFolderId: string | null;
  createdAt: Date;
  lastModifiedAt: Date;
  thumbnail: string | null;
}

export enum MediaType {
  FOLDER = 'Folder',
  FILE = 'File',
}