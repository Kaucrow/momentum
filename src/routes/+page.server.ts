import { getDatabase } from '$lib/db/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
  createTask: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const description = data.get('description') as string;
    const due = data.get('due') as string;

    if (!name || !description || !due) {
      return fail(400, { error: 'Please input all values.' });
    }

    try {
      const db = getDatabase();
      if (!db) {
        return fail(500, { error: 'Database is not ready.' });
      }

      await db.tasks.create({
        data: {
          name,
          description,
          due: new Date(due)
        }
      });

      return { success: true };
    } catch (error) {
      return fail(500, { error: 'Failed to create task.' });
    }
  }
};