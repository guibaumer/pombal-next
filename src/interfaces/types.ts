export type Message = {
  message: string;
};

export type Errors = {
  errors: string[];
};

export type Error = {
  error: string;
};

export type Response = Message & Errors;

export type ReqData = {
  anilha: string;
  photo: File | undefined;
  anilhaFather: string;
  anilhaMother: string;
  sex: string;
  description: string;
};

export type PigeonType = {
  anilha: string;
  photoUrl: string;
};

export type Pigeon = {
  id: string;
  anilha: string;
  foto_path: string;
  created_at: string;
  father_anilha: string;
  mother_anilha: string;
  sex: string;
  description: string;
};

export type PigeonArray = Pigeon[];

export type GetAllResponse = {
  entries: PigeonType[];
  error: string;
};
