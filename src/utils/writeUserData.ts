import { getDatabase, ref, set } from 'firebase/database';

export const writeUserData = (
  userId: string,
  photoURL: string | null,
  todos: { id: number; text: string; isCompleted: boolean }[] | null
) => {
  const db = getDatabase();
  const reference = ref(db, userId);
  set(reference, {
    photoURL: photoURL,
    todos: todos,
  });
};
