import prisma from "../db-client";
import { supabase } from "../supabase-client";

const alignUsersWithSupabase = async () => {
  const supabaseUsers = await supabase.auth.admin.listUsers();
  const supabaseUsersEmails = supabaseUsers.data.users.map(user => user.email);
  const appDBUsers = await prisma.user.findMany();
  const usersToBeDeleted = appDBUsers.filter(
    appDBUser => !supabaseUsersEmails.includes(appDBUser.email)
  );

  const deletedUsers = await prisma.user.deleteMany({
    where: {
      id: {
        in: usersToBeDeleted.map(user => user.id),
      },
    },
  });

  return deletedUsers;
};

const syncUserWithDB = async (id: string, email: string) => {
  let response = null;

  const isUserAlreadySynced = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isUserAlreadySynced) {
    const user = await prisma.user.create({
      data: {
        id,
        email,
      },
    });

    response = user;
  }
  return response;
};

export const userModel = {
  alignUsersWithSupabase,
  syncUserWithDB,
};
