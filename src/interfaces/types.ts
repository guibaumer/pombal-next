export type Message = {
  message: string;
};

export type Errors = {
  errors: string[];
};

export type Response = Message & Errors;

export type ReqData = {
  anilha: string;
  photo: File;
  anilhaFather: string;
  anilhaMother: string;
};

export type PigeonType = {
  anilha: string;
  photoUrl: string;
};

export type Pigeon = {
  anilha: string;
  foto_path: string;
  created_at: string;
  father_anilha: string;
  mother_anilha: string;
};

export type PigeonArray = Pigeon[];

export type GetAllResponse = {
  entries: PigeonType[];
  error: string;
};
