import { onValue, ref } from 'firebase/database';
import { database } from '../firebase';
import { writeUserData } from './writeUserData';

interface getUserDataProps {
  id: string | null;
  setUserHandler?: (
    id: string,
    dataId: {
      photoURL: string | null;
    }
  ) => void;
  setTodosHandler?: (
    id: string,
    dataId: {
      todos: { id: number; text: string; isCompleted: boolean }[] | null;
    }
  ) => void;
  navigateHandler?: () => void;
  photoURL?: string | null;
  setUserEmpty?: (id: string, photoURL: string | null) => void;
  setTodosEmpty?: () => void;
}

export const getUserData = ({
  id,
  photoURL,
  setUserHandler,
  setTodosHandler,
  navigateHandler,
  setUserEmpty,
  setTodosEmpty,
}: getUserDataProps) => {
  onValue(ref(database), (snapshot) => {
    const data = snapshot.val();
    if (id) {
      if (data && data[`${id}`]) {
        if (setUserHandler) {
          setUserHandler(id, data[`${id}`]);
        }
        if (setTodosHandler) {
          setTodosHandler(id, data[`${id}`]);
        }
        if (navigateHandler) {
          navigateHandler();
        }
      } else {
        if (setUserEmpty) {
          setUserEmpty(id, photoURL ? photoURL : '');
        }
        if (setTodosEmpty) {
          setTodosEmpty();
        }
        writeUserData(id, photoURL ? photoURL : '', null);
        if (navigateHandler) {
          navigateHandler();
        }
      }
    }
  });
};
