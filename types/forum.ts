import { ObjectId } from "mongodb";

export interface Answer {
  _id: ObjectId;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export interface Question {
  _id: ObjectId;
  title: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
  answers: Answer[];
}
